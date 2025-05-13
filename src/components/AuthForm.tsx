
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

interface AuthFormProps {
  type: 'login' | 'register';
  onToggleType: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onToggleType }) => {
  return (
    <Card className="w-full max-w-md p-8 bg-card border-border shadow-xl card-3d">
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-crypto-purple to-crypto-blue bg-clip-text text-transparent">
        {type === 'login' ? 'ورود به حساب کاربری' : 'ایجاد حساب جدید'}
      </h2>
      
      {type === 'login' ? (
        <LoginForm onToggleType={onToggleType} />
      ) : (
        <RegisterForm onToggleType={onToggleType} />
      )}
    </Card>
  );
};

export default AuthForm;
