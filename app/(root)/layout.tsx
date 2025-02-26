"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root-container">
      <div className="mx-auto">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        <div className="-mt-24">{children}</div>
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
