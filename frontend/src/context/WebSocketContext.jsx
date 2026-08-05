
import React from "react";

import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAuth } from './AuthContext';

const WebSocketContext = createContext(null);

export function WebSocketProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const clientRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const connect = useCallback(() => {
    if (!isAuthenticated || !user) return;

    const token = localStorage.getItem('token');
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
    const socket = new SockJS(`${API_BASE_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: () => {},
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      setConnected(true);

      // Subscribe to global questions
      client.subscribe('/topic/questions', (message) => {
        const question = JSON.parse(message.body);
        window.dispatchEvent(new CustomEvent('newQuestion', { detail: question }));
      });

      // Subscribe to personal notifications
      client.subscribe(`/user/${user.id}/queue/notifications`, (message) => {
        const notification = JSON.parse(message.body);
        setNotifications((prev) => [notification, ...prev]);
        window.dispatchEvent(new CustomEvent('notification', { detail: notification }));
      });
    };

    client.onDisconnect = () => {
      setConnected(false);
    };

    client.onStompError = () => {
      setConnected(false);
    };

    client.activate();
    clientRef.current = client;
  }, [isAuthenticated, user]);

  const disconnect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.deactivate();
      clientRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    setConnected(false);
  }, []);

  const subscribeToQuestion = useCallback((questionId, callbacks) => {
    if (!clientRef.current || !clientRef.current.connected) return;

    const subscriptions = [];

    if (callbacks.onNewAnswer) {
      const sub = clientRef.current.subscribe(`/topic/question/${questionId}/answers`, (message) => {
        callbacks.onNewAnswer(JSON.parse(message.body));
      });
      subscriptions.push(sub);
    }

    if (callbacks.onVoteUpdate) {
      const sub = clientRef.current.subscribe(`/topic/question/${questionId}/votes`, (message) => {
        callbacks.onVoteUpdate(JSON.parse(message.body));
      });
      subscriptions.push(sub);
    }

    if (callbacks.onSolved) {
      const sub = clientRef.current.subscribe(`/topic/question/${questionId}/solved`, (message) => {
        callbacks.onSolved(JSON.parse(message.body));
      });
      subscriptions.push(sub);
    }

    return () => {
      subscriptions.forEach((sub) => sub.unsubscribe());
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      connect();
    } else {
      disconnect();
    }
    return () => disconnect();
  }, [isAuthenticated, connect, disconnect]);

  const clearNotifications = () => setNotifications([]);

  return (
    <WebSocketContext.Provider value={{ connected, notifications, subscribeToQuestion, clearNotifications }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
}
