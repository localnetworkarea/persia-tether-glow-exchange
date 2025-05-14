
import React, { useState, useEffect } from 'react';
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import AuthForm from "@/components/AuthForm";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const AuthPage = () => {
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  
  const toggleAuthType = () => {
    setAuthType(authType === 'login' ? 'register' : 'login');
  };

  useEffect(() => {
    document.title = authType === 'login' ? 'ورود | تتر اکسچنج' : 'ثبت نام | تتر اکسچنج';
  }, [authType]);
  
  // Create particles for background effect
  const particles = Array.from({ length: 10 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full bg-primary/10 blur-md"
      initial={{
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5,
      }}
      animate={{
        x: [
          Math.random() * window.innerWidth,
          Math.random() * window.innerWidth,
          Math.random() * window.innerWidth,
        ],
        y: [
          Math.random() * window.innerHeight,
          Math.random() * window.innerHeight,
          Math.random() * window.innerHeight,
        ],
      }}
      transition={{
        duration: Math.random() * 20 + 20,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        width: `${Math.random() * 150 + 50}px`,
        height: `${Math.random() * 150 + 50}px`,
      }}
    />
  ));
  
  return (
    <div className="min-h-screen flex flex-col perspective-container">
      <Background />
      <Navbar />
      
      {/* Background particles */}
      <div className="fixed inset-0 overflow-hidden -z-10 opacity-50">
        {particles}
      </div>
      
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <AuthForm type={authType} onToggleType={toggleAuthType} />
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              با ورود و ثبت‌نام در سایت، 
              <span className="text-primary mx-1">شرایط و قوانین</span> 
              استفاده از سرویس‌های سایت را می‌پذیرید.
            </p>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuthPage;
