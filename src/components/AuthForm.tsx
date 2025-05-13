
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { loginUser, registerUser } from "@/lib/supabase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface AuthFormProps {
  type: 'login' | 'register';
  onToggleType: () => void;
}

// Define the form schema
const loginSchema = z.object({
  email: z.string().email("لطفا یک ایمیل معتبر وارد کنید"),
  password: z.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
});

const registerSchema = z.object({
  fullName: z.string().min(2, "نام کامل باید حداقل 2 کاراکتر باشد"),
  email: z.string().email("لطفا یک ایمیل معتبر وارد کنید"),
  password: z.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
  confirmPassword: z.string().min(6, "تأیید رمز عبور باید حداقل 6 کاراکتر باشد"),
}).refine(data => data.password === data.confirmPassword, {
  message: "رمز عبور و تأیید آن مطابقت ندارند",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const AuthForm: React.FC<AuthFormProps> = ({ type, onToggleType }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const handleLoginSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    
    try {
      await loginUser(values.email, values.password);
      toast({
        title: "با موفقیت وارد شدید!",
        variant: "default"
      });
      navigate('/');
    } catch (error) {
      toast({
        title: error instanceof Error ? error.message : 'خطایی رخ داد',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegisterSubmit = async (values: RegisterFormValues) => {
    setLoading(true);
    
    try {
      await registerUser(values.email, values.password, values.fullName);
      toast({
        title: "ثبت نام شما با موفقیت انجام شد!",
        variant: "default"
      });
      navigate('/');
    } catch (error) {
      toast({
        title: error instanceof Error ? error.message : 'خطایی رخ داد',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md p-8 bg-card border-border shadow-xl card-3d">
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-crypto-purple to-crypto-blue bg-clip-text text-transparent">
        {type === 'login' ? 'ورود به حساب کاربری' : 'ایجاد حساب جدید'}
      </h2>
      
      {type === 'login' ? (
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4">
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-2 text-sm">ایمیل</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      required
                      className="w-full"
                      placeholder="ایمیل خود را وارد کنید"
                      dir="rtl"
                    />
                  </FormControl>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
            
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-2 text-sm">رمز عبور</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      required
                      className="w-full"
                      placeholder="رمز عبور خود را وارد کنید"
                      dir="rtl"
                    />
                  </FormControl>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              className="w-full animated-gradient-button text-white py-2 px-4 rounded-md shadow-lg shadow-purple-500/20"
              disabled={loading}
            >
              {loading ? 'در حال ورود...' : 'ورود به حساب'}
            </Button>
          </form>
        </Form>
      ) : (
        <Form {...registerForm}>
          <form onSubmit={registerForm.handleSubmit(handleRegisterSubmit)} className="space-y-4">
            <FormField
              control={registerForm.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-2 text-sm">نام کامل</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      required
                      className="w-full"
                      placeholder="نام و نام خانوادگی خود را وارد کنید"
                      dir="rtl"
                    />
                  </FormControl>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
            
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-2 text-sm">ایمیل</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      required
                      className="w-full"
                      placeholder="ایمیل خود را وارد کنید"
                      dir="rtl"
                    />
                  </FormControl>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
            
            <FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-2 text-sm">رمز عبور</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      required
                      className="w-full"
                      placeholder="رمز عبور خود را وارد کنید"
                      dir="rtl"
                    />
                  </FormControl>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
            
            <FormField
              control={registerForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-2 text-sm">تأیید رمز عبور</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      required
                      className="w-full"
                      placeholder="رمز عبور را مجددا وارد کنید"
                      dir="rtl"
                    />
                  </FormControl>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              className="w-full animated-gradient-button text-white py-2 px-4 rounded-md shadow-lg shadow-purple-500/20"
              disabled={loading}
            >
              {loading ? 'در حال ثبت نام...' : 'ثبت نام'}
            </Button>
          </form>
        </Form>
      )}
      
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
