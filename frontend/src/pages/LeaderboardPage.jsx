import { Trophy, Medal } from "lucide-react";
import { User, Filter, Crown, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/LoadingSpinner";

import React from "react";

import { useState, useEffect, useMemo } from 'react';
import { Award, Star, Flame, TrendingUp, HelpCircle, Target, Shield } from 'lucide-react';
import api from '../utils/api';
import { showToast } from '../components/ToastContainer';
import { useAuth } from '../context/AuthContext';

const RANK_TIERS = [
  { name: 'Legend', minScore: 1000, color: 'text-primary-700', glowColor: 'shadow-primary-500/20', gradient: 'from-primary-600 to-primary-500', bgGlass: 'bg-primary-50 border-primary-200', badge: '🥇', ring: 'ring-primary-200' },
  { name: 'Expert', minScore: 500, color: 'text-primary-600', glowColor: 'shadow-primary-400/10', gradient: 'from-primary-500 to-primary-400', bgGlass: 'bg-primary-50/50 border-primary-100', badge: '🥈', ring: 'ring-primary-100' },
  { name: 'Mentor', minScore: 200, color: 'text-slate-700', glowColor: 'shadow-slate-300/20', gradient: 'from-slate-600 to-slate-500', bgGlass: 'bg-slate-100 border-slate-200', badge: '🏅', ring: 'ring-slate-200' },
  { name: 'Contributor', minScore: 50, color: 'text-slate-600', glowColor: 'shadow-slate-200/20', gradient: 'from-slate-500 to-slate-400', bgGlass: 'bg-slate-50 border-slate-200', badge: '🎖️', ring: 'ring-slate-100' },
  { name: 'Newcomer', minScore: 0, color: 'text-slate-400', glowColor: 'shadow-slate-100/20', gradient: 'from-slate-400 to-slate-300', bgGlass: 'bg-white border-slate-100', badge: '🌱', ring: 'ring-slate-50' },
];

function getRankTier(score) {
  return RANK_TIERS.find((t) => score >= t.minScore) || RANK_TIERS[RANK_TIERS.length - 1];
}

function getProgressToNext(score) {
  const currentTierIdx = RANK_TIERS.findIndex((t) => score >= t.minScore);
  if (currentTierIdx === 0) return { percent: 100, nextTier: null, pointsNeeded: 0 };
  const nextTier = RANK_TIERS[currentTierIdx - 1];
  const currentTier = RANK_TIERS[currentTierIdx];
  const range = nextTier.minScore - currentTier.minScore;
  const progress = score - currentTier.minScore;
  return {
    percent: Math.min(100, Math.round((progress / range) * 100)),
    nextTier,
    pointsNeeded: nextTier.minScore - score,
  };
}

// Animated counter component
function AnimatedNumber({ value, duration = 1.2 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value, duration]);
  return <span>{display.toLocaleString()}</span>;
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('all');
  const { user: currentUser, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get('/users/leaderboard');
        setUsers(res.data);
      } catch (err) {
        showToast('Failed to fetch leaderboard', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const currentUserRank = useMemo(() => {
    if (!isAuthenticated) return null;
    const idx = users.findIndex((u) => u.id === currentUser?.id);
    return idx >= 0 ? idx + 1 : null;
  }, [users, isAuthenticated, currentUser]);

  const currentUserProgress = useMemo(() => {
    if (!currentUser) return null;
    return getProgressToNext(currentUser.reputationScore || 0);
  }, [currentUser]);

  if (loading) return <LoadingSpinner size="lg" className="py-12" />;

  const topThree = users.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  const podiumOrder = topThree.length >= 3 ? [topThree[1], topThree[0], topThree[2]] : topThree;
  const podiumConfig = [
    { height: 'h-28', avatarSize: 'w-16 h-16', textSize: 'text-base', scoreSize: 'text-xl', delay: 0.3, label: '2nd', medalColor: 'text-slate-300', borderColor: 'border-slate-300', bgColor: 'bg-slate-400/10' },
    { height: 'h-36', avatarSize: 'w-20 h-20', textSize: 'text-lg', scoreSize: 'text-2xl', delay: 0.1, label: '1st', medalColor: 'text-amber-400', borderColor: 'border-amber-400', bgColor: 'bg-amber-400/10', isChampion: true },
    { height: 'h-20', avatarSize: 'w-14 h-14', textSize: 'text-sm', scoreSize: 'text-lg', delay: 0.5, label: '3rd', medalColor: 'text-amber-600', borderColor: 'border-amber-700', bgColor: 'bg-amber-600/10' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* ─── Dark Hero Header ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a0f1e] via-[#111833] to-[#0d1529] p-8 md:p-12 border border-white/5"
      >
        {/* Decorative orbs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-violet-500/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-amber-500/5 rounded-full blur-[60px] pointer-events-none" />

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/30 mb-5"
          >
            <Trophy className="h-8 w-8 text-white" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
            Community Leaderboard
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            Celebrating the top minds who power our learning community.
          </p>

          {/* Time Filter Pills */}
          <div className="flex justify-center gap-2 mt-6">
            {[
              { key: 'all', label: 'All Time' },
              { key: 'month', label: 'This Month' },
              { key: 'week', label: 'This Week' },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setTimeFilter(f.key)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  timeFilter === f.key
                    ? 'bg-white/10 text-white border border-white/20 shadow-lg shadow-white/5'
                    : 'text-slate-500 hover:text-slate-300 border border-transparent hover:border-white/10'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Podium ─── */}
        {topThree.length >= 3 && (
          <div className="relative z-10 mt-10 flex items-end justify-center gap-3 md:gap-6 max-w-lg mx-auto">
            {podiumOrder.map((user, i) => {
              const config = podiumConfig[i];
              const tier = getRankTier(user.reputationScore);
              return (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: config.delay, type: 'spring', stiffness: 80 }}
                  className="flex-1 flex flex-col items-center"
                >
                  {/* Avatar */}
                  <div className="relative mb-3">
                    {config.isChampion && (
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                        className="absolute -top-5 left-1/2 -translate-x-1/2"
                      >
                        <Crown className="h-6 w-6 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                      </motion.div>
                    )}
                    <div className={`${config.avatarSize} rounded-full border-2 ${config.borderColor} flex items-center justify-center ${config.bgColor} backdrop-blur-sm`}>
                      <User className={`${config.isChampion ? 'h-10 w-10' : i === 0 ? 'h-8 w-8' : 'h-6 w-6'} ${config.medalColor}`} />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#111833] border ${config.borderColor} flex items-center justify-center`}>
                      <span className="text-[10px] font-bold text-white">{config.isChampion ? '1' : i === 0 ? '2' : '3'}</span>
                    </div>
                  </div>

                  {/* Name & Score */}
                  <h4 className={`font-bold text-white ${config.textSize} truncate max-w-[100px] text-center`}>{user.username}</h4>
                  <p className={`${config.scoreSize} font-extrabold bg-gradient-to-r ${tier.gradient} bg-clip-text text-transparent mt-0.5`}>
                    {user.reputationScore}
                  </p>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-0.5">{tier.badge} {tier.name}</span>

                  {/* Podium Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    transition={{ delay: config.delay + 0.3, duration: 0.5 }}
                    className={`w-full ${config.height} mt-3 rounded-t-xl bg-gradient-to-t from-white/[0.03] to-white/[0.08] border border-white/10 border-b-0 backdrop-blur-sm`}
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* ─── Your Position Card ─── */}
      {isAuthenticated && currentUserRank > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-900/90 to-primary-800/90 border border-primary-500/20 p-6"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-500/20 rounded-full blur-[60px] pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary-500/20 border border-primary-400/30 flex items-center justify-center backdrop-blur-sm">
                <User className="h-7 w-7 text-primary-300" />
              </div>
              <div>
                <p className="text-xs text-primary-300 font-medium uppercase tracking-wider">Your Position</p>
                <p className="text-3xl font-extrabold text-white">
                  #{currentUserRank}
                  <span className="text-sm font-normal text-primary-400 ml-2">of {users.length}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              {/* Progress to next tier */}
              {currentUserProgress && currentUserProgress.nextTier && (
                <div className="text-center">
                  <p className="text-[10px] text-primary-400 uppercase tracking-wider font-semibold mb-1.5">Next: {currentUserProgress.nextTier.badge} {currentUserProgress.nextTier.name}</p>
                  <div className="w-36 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${currentUserProgress.percent}%` }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      className={`h-full rounded-full bg-gradient-to-r ${currentUserProgress.nextTier.gradient}`}
                    />
                  </div>
                  <p className="text-[10px] text-primary-400 mt-1">{currentUserProgress.pointsNeeded} pts to go</p>
                </div>
              )}

              <div className="text-right">
                <span className="text-2xl">{getRankTier(currentUser?.reputationScore || 0).badge}</span>
                <p className={`font-bold text-sm ${getRankTier(currentUser?.reputationScore || 0).color}`}>
                  {getRankTier(currentUser?.reputationScore || 0).name}
                </p>
                <p className="text-xs text-primary-300">{currentUser?.reputationScore || 0} pts</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Stats Bar ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: TrendingUp, color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20', label: 'Total Members', value: users.length },
          { icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20', label: 'Highest Score', value: users[0]?.reputationScore || 0 },
          { icon: Star, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', label: 'Avg Score', value: users.length > 0 ? Math.round(users.reduce((s, u) => s + u.reputationScore, 0) / users.length) : 0 },
          { icon: Shield, color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20', label: 'Contributors+', value: users.filter((u) => u.reputationScore >= 50).length },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border p-4 text-center ${stat.bg} backdrop-blur-sm`}
          >
            <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-2`} />
            <p className="text-2xl font-bold text-gray-900">
              <AnimatedNumber value={stat.value} />
            </p>
            <p className="text-xs text-gray-500 font-medium mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* ─── Tier Legend ─── */}
      <div className="flex flex-wrap justify-center gap-2">
        {RANK_TIERS.map((tier) => (
          <div key={tier.name} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${tier.bgGlass} backdrop-blur-sm`}>
            <span>{tier.badge}</span>
            <span className={tier.color}>{tier.name}</span>
            <span className="text-gray-400">({tier.minScore}+)</span>
          </div>
        ))}
      </div>

      {/* ─── Full Rankings ─── */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-primary-600" />
          Full Rankings
        </h2>
        <motion.div
          className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50/80 border-b border-gray-200 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">User</div>
            <div className="col-span-2 text-center">Tier</div>
            <div className="col-span-2 text-center">Joined</div>
            <div className="col-span-2 text-right">Score</div>
          </div>

          <div className="divide-y divide-gray-100/80">
            {users.map((user, index) => {
              const tier = getRankTier(user.reputationScore);
              const isCurrentUser = isAuthenticated && user.id === currentUser?.id;

              return (
                <motion.div
                  key={user.id}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.015)' }}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-all duration-200 ${
                    isCurrentUser ? 'bg-primary-50/50 border-l-4 border-l-primary-500' : ''
                  } ${index < 3 ? 'bg-gradient-to-r from-amber-50/30 to-transparent' : ''}`}
                >
                  {/* Rank */}
                  <div className="col-span-2 sm:col-span-1 flex justify-center">
                    {index === 0 ? (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center shadow-sm shadow-primary-500/30">
                        <Trophy className="h-4 w-4 text-white" />
                      </div>
                    ) : index === 1 ? (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-300 flex items-center justify-center shadow-sm">
                        <Medal className="h-4 w-4 text-white" />
                      </div>
                    ) : index === 2 ? (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-500 to-slate-400 flex items-center justify-center shadow-sm">
                        <Medal className="h-4 w-4 text-white" />
                      </div>
                    ) : (
                      <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="col-span-6 sm:col-span-5 flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border overflow-hidden ${
                      index === 0 ? 'bg-primary-50 border-primary-200' :
                      index < 3 ? 'bg-slate-50 border-slate-200' :
                      'bg-gray-50 border-gray-200'
                    }`}>
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt={user.username} className="w-full h-full object-cover" />
                      ) : (
                        <User className={`h-5 w-5 ${
                          index === 0 ? 'text-primary-700' :
                          index < 3 ? 'text-slate-500' :
                          'text-gray-400'
                        }`} />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate text-sm">
                        {user.username}
                        {isCurrentUser && <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-primary-100 text-primary-700 rounded-md font-semibold">YOU</span>}
                      </h3>
                      <p className="text-xs text-gray-400 hidden sm:block truncate">
                        {user.bio ? user.bio.substring(0, 45) + (user.bio.length > 45 ? '…' : '') : 'Community member'}
                      </p>
                    </div>
                  </div>

                  {/* Tier Badge */}
                  <div className="col-span-4 sm:col-span-2 flex justify-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border ${tier.bgGlass} backdrop-blur-sm`}>
                      <span>{tier.badge}</span>
                      <span className={tier.color}>{tier.name}</span>
                    </span>
                  </div>

                  {/* Joined */}
                  <div className="hidden sm:flex col-span-2 justify-center">
                    <span className="text-xs text-gray-400 font-medium">
                      {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="hidden sm:flex col-span-2 justify-end items-center gap-1.5">
                    <div className="text-right">
                      <span className={`text-base font-bold ${
                        index === 0 ? 'text-primary-700' :
                        index < 3 ? 'text-slate-700' :
                        'text-gray-700'
                      }`}>
                        {user.reputationScore.toLocaleString()}
                      </span>
                      <p className="text-[10px] text-gray-400">points</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {users.length === 0 && (
              <div className="p-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700">No rankings yet</h3>
                <p className="text-sm text-gray-400 mt-1">Be the first to earn reputation by answering questions!</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ─── How to Earn Reputation ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl bg-white border border-gray-200 p-8 shadow-sm"
      >
        <div className="relative z-10">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Zap className="h-5 w-5 text-gray-400" />
            How to Climb the Ranks
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Target, color: 'text-gray-600', bg: 'bg-gray-50 border-gray-100', title: 'Quality Matters', desc: 'Legend status at 1000+' },
              { icon: Award, color: 'text-gray-600', bg: 'bg-gray-50 border-gray-100', title: 'Answer Accepted', desc: '+15 reputation bonus' },
              { icon: TrendingUp, color: 'text-gray-600', bg: 'bg-gray-50 border-gray-100', title: 'Receive Upvotes', desc: '+10 per upvote received' },
              { icon: HelpCircle, color: 'text-gray-600', bg: 'bg-gray-50 border-gray-100', title: 'Avoid Downvotes', desc: '-2 per downvote received' },
            ].map((item) => (
              <div key={item.title} className={`flex items-start gap-3 p-4 rounded-xl border ${item.bg}`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-white shadow-sm border border-gray-100`}>
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ─── Progression Roadmap (Path Layout) ─── */}
      <div className="mt-16 mb-12">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
            <Target className="h-6 w-6 text-primary-600" />
            The Progression Path
          </h3>
          <p className="text-gray-500 mt-2 max-w-lg mx-auto">See what capabilities you unlock as you earn reputation and climb the ranks.</p>
        </div>
        
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical Track Line */}
          <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-1 bg-gray-100 rounded-full -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {/* Legend Node */}
            <div className="relative flex flex-col sm:flex-row items-center sm:justify-between w-full">
              <div className="hidden sm:block w-[45%] text-right pr-8">
                <h4 className="text-lg font-bold text-primary-700">Legend Status</h4>
                <p className="text-sm font-bold text-gray-900 mt-1">1,000+ Points</p>
              </div>
              <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20 z-10">
                <Crown className="h-5 w-5 text-primary-600" />
              </div>
              <div className="w-full sm:w-[45%] pl-16 sm:pl-8 mt-2 sm:mt-0">
                <div className="sm:hidden mb-2">
                  <h4 className="text-lg font-bold text-primary-700">Legend Status <span className="text-gray-900 text-sm ml-2">(1,000+ pts)</span></h4>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-sm text-gray-600 font-medium">The ultimate community leaders. You gain full moderation capabilities, the ability to edit tags, and direct communication with admins.</p>
                </div>
              </div>
            </div>

            {/* Expert Node */}
            <div className="relative flex flex-col sm:flex-row items-center sm:justify-between w-full">
              <div className="w-full sm:w-[45%] pl-16 sm:pl-0 sm:pr-8 mt-2 sm:mt-0 order-2 sm:order-1 text-left sm:text-right">
                <div className="sm:hidden mb-2">
                  <h4 className="text-lg font-bold text-primary-600">Expert Status <span className="text-gray-900 text-sm ml-2">(500+ pts)</span></h4>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-sm text-gray-600 font-medium">Recognized authorities. You can vote to close duplicate questions, review newly proposed tags, and access the private Expert Lounge.</p>
                </div>
              </div>
              <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/10 z-10 order-1 sm:order-2">
                <Award className="h-5 w-5 text-primary-500" />
              </div>
              <div className="hidden sm:block w-[45%] pl-8 order-3">
                <h4 className="text-lg font-bold text-primary-600">Expert Status</h4>
                <p className="text-sm font-bold text-gray-900 mt-1">500+ Points</p>
              </div>
            </div>

            {/* Mentor Node */}
            <div className="relative flex flex-col sm:flex-row items-center sm:justify-between w-full">
              <div className="hidden sm:block w-[45%] text-right pr-8">
                <h4 className="text-lg font-bold text-slate-700">Mentor Status</h4>
                <p className="text-sm font-bold text-gray-900 mt-1">200+ Points</p>
              </div>
              <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-slate-400 flex items-center justify-center shadow-lg shadow-slate-400/10 z-10">
                <Star className="h-5 w-5 text-slate-500" />
              </div>
              <div className="w-full sm:w-[45%] pl-16 sm:pl-8 mt-2 sm:mt-0">
                <div className="sm:hidden mb-2">
                  <h4 className="text-lg font-bold text-slate-700">Mentor Status <span className="text-gray-900 text-sm ml-2">(200+ pts)</span></h4>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-sm text-gray-600 font-medium">Trusted guides. You can edit other users' posts to improve formatting, vote to reopen questions, and see detailed vote breakdowns.</p>
                </div>
              </div>
            </div>

            {/* Contributor Node */}
            <div className="relative flex flex-col sm:flex-row items-center sm:justify-between w-full">
              <div className="w-full sm:w-[45%] pl-16 sm:pl-0 sm:pr-8 mt-2 sm:mt-0 order-2 sm:order-1 text-left sm:text-right">
                <div className="sm:hidden mb-2">
                  <h4 className="text-lg font-bold text-slate-600">Contributor Status <span className="text-gray-900 text-sm ml-2">(50+ pts)</span></h4>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-sm text-gray-600 font-medium">Established members. You can leave comments on any post, cast downvotes, and completely bypass new-user anti-spam restrictions.</p>
                </div>
              </div>
              <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-slate-300 flex items-center justify-center shadow-lg shadow-slate-300/10 z-10 order-1 sm:order-2">
                <Shield className="h-5 w-5 text-slate-400" />
              </div>
              <div className="hidden sm:block w-[45%] pl-8 order-3">
                <h4 className="text-lg font-bold text-slate-600">Contributor Status</h4>
                <p className="text-sm font-bold text-gray-900 mt-1">50+ Points</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
