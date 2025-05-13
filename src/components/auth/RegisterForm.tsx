
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { registerUser } from "@/lib/supabase";
import { registerSchema, RegisterFormValues } from "@/lib/validation-schemas";
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
      toast({
        title: error instanceof Error ? error.message : 'خطایی رخ داد',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
      
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          قبلاً ثبت نام کرده‌اید؟{' '}
          <button
            type="button"
            onClick={onToggleType}
            className="text-primary hover:underline focus:outline-none"
          >
            وارد شوید
          </button>
        </p>
      </div>
    </>
  );
};

export default RegisterForm;
