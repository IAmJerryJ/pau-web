import React from "react";
import Navbar from "@/components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root-container">
      <div className="mx-auto">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        <div className="pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
