
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AuthFormProps {
  type: 'login' | 'register';
  onToggleType: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onToggleType }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (type === 'register' && password !== confirmPassword) {
        throw new Error('رمز عبور و تأیید آن مطابقت ندارند');
      }
      
      // Usually we'd call an API here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      if (type === 'login') {
        toast.success('با موفقیت وارد شدید!');
      } else {
        toast.success('ثبت نام شما با موفقیت انجام شد!');
      }
      
      navigate('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'خطایی رخ داد');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md p-8 bg-card border-border shadow-xl card-3d">
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-crypto-purple to-crypto-blue bg-clip-text text-transparent">
        {type === 'login' ? 'ورود به حساب کاربری' : 'ایجاد حساب جدید'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'register' && (
          <div>
            <label htmlFor="name" className="block mb-2 text-sm">نام کامل</label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
              placeholder="نام و نام خانوادگی خود را وارد کنید"
              dir="rtl"
            />
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block mb-2 text-sm">ایمیل</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
            placeholder="ایمیل خود را وارد کنید"
            dir="rtl"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block mb-2 text-sm">رمز عبور</label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
            placeholder="رمز عبور خود را وارد کنید"
            dir="rtl"
          />
        </div>
        
        {type === 'register' && (
          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-sm">تأیید رمز عبور</label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full"
              placeholder="رمز عبور را مجددا وارد کنید"
              dir="rtl"
            />
          </div>
        )}
        
        <Button
          type="submit"
          className="w-full animated-gradient-button text-white py-2 px-4 rounded-md shadow-lg shadow-purple-500/20"
          disabled={loading}
        >
          {loading ? 
            (type === 'login' ? 'در حال ورود...' : 'در حال ثبت نام...') : 
            (type === 'login' ? 'ورود به حساب' : 'ثبت نام')}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {type === 'login' ? 'حساب کاربری ندارید؟ ' : 'قبلاً ثبت نام کرده‌اید؟ '}
          <button
            type="button"
            onClick={onToggleType}
            className="text-primary hover:underline focus:outline-none"
          >
            {type === 'login' ? 'ثبت نام کنید' : 'وارد شوید'}
          </button>
        </p>
      </div>
    </Card>
  );
};

export default AuthForm;
