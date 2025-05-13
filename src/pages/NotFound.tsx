
import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-crypto-purple to-crypto-blue bg-clip-text text-transparent">404</h1>
          <p className="text-2xl text-foreground mb-8">صفحه مورد نظر یافت نشد</p>
          <Button 
            className="animated-gradient-button text-white px-6 py-2 rounded-full"
            onClick={() => navigate('/')}
          >
            بازگشت به صفحه اصلی
          </Button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
