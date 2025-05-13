
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { registerUser } from "@/lib/supabase";
import { registerSchema, RegisterFormValues } from "@/lib/validation-schemas";
import { motion } from "framer-motion";
import { UserPlus } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface RegisterFormProps {
  onToggleType: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleType }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const handleSubmit = async (values: RegisterFormValues) => {
    setLoading(true);
    
    try {
      await registerUser(values.email, values.password, values.fullName);
      toast({
        title: "ثبت نام شما با موفقیت انجام شد!",
        variant: "default"
      });
      navigate('/');
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: error instanceof Error ? error.message : 'خطایی رخ داد',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block mb-2 text-sm font-medium">نام کامل</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    required
                    className="w-full bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary"
                    placeholder="نام و نام خانوادگی خود را وارد کنید"
                    dir="rtl"
                  />
                </FormControl>
                <FormMessage className="text-right" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block mb-2 text-sm font-medium">ایمیل</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    required
                    className="w-full bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary"
                    placeholder="ایمیل خود را وارد کنید"
                    dir="rtl"
                  />
                </FormControl>
                <FormMessage className="text-right" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block mb-2 text-sm font-medium">رمز عبور</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    required
                    className="w-full bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary"
                    placeholder="رمز عبور خود را وارد کنید"
                    dir="rtl"
                  />
                </FormControl>
                <FormMessage className="text-right" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block mb-2 text-sm font-medium">تأیید رمز عبور</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    required
                    className="w-full bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary"
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
            className="w-full animated-gradient-button text-white py-2 px-4 rounded-md shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
            disabled={loading}
          >
            {loading ? 'در حال ثبت نام...' : (
              <span className="flex items-center justify-center gap-2">
                <UserPlus className="h-4 w-4" />
                ثبت نام
              </span>
            )}
          </Button>
        </form>
      </Form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          قبلاً ثبت نام کرده‌اید؟{' '}
          <button
            type="button"
            onClick={onToggleType}
            className="text-primary hover:underline focus:outline-none font-medium"
          >
            وارد شوید
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default RegisterForm;
