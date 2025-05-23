
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { loginUser } from "@/lib/supabase";
import { loginSchema, LoginFormValues } from "@/lib/validation-schemas";
import { motion } from "framer-motion";
import { LogIn } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface LoginFormProps {
  onToggleType: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleType }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const handleSubmit = async (values: LoginFormValues) => {
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
          
          <Button
            type="submit"
            className="w-full animated-gradient-button text-white py-2 px-4 rounded-md shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
            disabled={loading}
          >
            {loading ? 'در حال ورود...' : (
              <span className="flex items-center justify-center gap-2">
                <LogIn className="h-4 w-4" />
                ورود به حساب
              </span>
            )}
          </Button>
        </form>
      </Form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          حساب کاربری ندارید؟{' '}
          <button
            type="button"
            onClick={onToggleType}
            className="text-primary hover:underline focus:outline-none font-medium"
          >
            ثبت نام کنید
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginForm;
