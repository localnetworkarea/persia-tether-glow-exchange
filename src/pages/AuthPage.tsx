
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar />
      
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
