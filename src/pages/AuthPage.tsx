
import React, { useState } from 'react';
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import AuthForm from "@/components/AuthForm";
import Footer from "@/components/Footer";

const AuthPage = () => {
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  
  const toggleAuthType = () => {
    setAuthType(authType === 'login' ? 'register' : 'login');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <AuthForm type={authType} onToggleType={toggleAuthType} />
      </main>
      
      <Footer />
    </div>
  );
};

export default AuthPage;
