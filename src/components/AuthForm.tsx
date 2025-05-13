
import React from 'react';
import { Card } from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

interface AuthFormProps {
  type: 'login' | 'register';
  onToggleType: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onToggleType }) => {
  return (
    <Card className="w-full max-w-md p-8 bg-card border-border shadow-xl card-3d transform transition-all hover:translate-y-[-5px] hover:shadow-2xl">
      <div className="relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-crypto-purple/10 to-crypto-blue/10 rounded-lg blur-xl opacity-30 -z-10"></div>
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-crypto-purple to-crypto-blue bg-clip-text text-transparent">
          {type === 'login' ? 'ورود به حساب کاربری' : 'ایجاد حساب جدید'}
        </h2>
        
        {type === 'login' ? (
          <LoginForm onToggleType={onToggleType} />
        ) : (
          <RegisterForm onToggleType={onToggleType} />
        )}
      </div>
    </Card>
  );
};

export default AuthForm;
