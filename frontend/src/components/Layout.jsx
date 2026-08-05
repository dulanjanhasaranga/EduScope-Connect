import { Outlet } from "react-router-dom";
import ToastContainer, { showToast } from "../components/ToastContainer";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import React from "react";


export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

