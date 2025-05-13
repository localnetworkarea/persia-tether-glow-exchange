
import React, { useState } from 'react';
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const SettingsPage = () => {
  const [kycStatus, setKycStatus] = useState<'unverified' | 'pending' | 'verified'>('unverified');
  const [idImage, setIdImage] = useState<File | null>(null);
  const [selfieImage, setSelfieImage] = useState<File | null>(null);
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  
  const handleKycSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!fullName || !nationalId || !phoneNumber || !address || !idImage || !selfieImage) {
      toast.error('لطفاً تمامی فیلدها را تکمیل کنید');
      return;
    }
    
    // Simulate API call
    toast.info('درخواست احراز هویت شما در حال بررسی است');
    setTimeout(() => {
      setKycStatus('pending');
      toast.success('درخواست احراز هویت شما با موفقیت ثبت شد');
    }, 1500);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const renderKycContent = () => {
    switch (kycStatus) {
      case 'verified':
        return (
          <div className="flex flex-col items-center p-6 text-center">
            <div className="bg-green-100 rounded-full p-3 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">احراز هویت شما تأیید شده است</h3>
            <p className="text-muted-foreground">شما می‌توانید از تمامی امکانات سایت استفاده کنید</p>
            <Badge variant="outline" className="mt-4 px-3 py-1 bg-green-50 text-green-600 border-green-200">تأیید شده</Badge>
          </div>
        );
        
      case 'pending':
        return (
          <div className="flex flex-col items-center p-6 text-center">
            <div className="bg-yellow-100 rounded-full p-3 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">درخواست احراز هویت در حال بررسی است</h3>
            <p className="text-muted-foreground">لطفاً منتظر بمانید. معمولاً این فرآیند ۱ تا ۳ روز کاری زمان می‌برد.</p>
            <Badge variant="outline" className="mt-4 px-3 py-1 bg-yellow-50 text-yellow-600 border-yellow-200">در حال بررسی</Badge>
          </div>
        );
        
      default:
        return (
          <form onSubmit={handleKycSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">نام و نام خانوادگی</Label>
                <Input 
                  id="fullName" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="نام کامل خود را وارد کنید"
                  dir="rtl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nationalId">کد ملی</Label>
                <Input 
                  id="nationalId" 
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  placeholder="کد ملی 10 رقمی خود را وارد کنید"
                  dir="rtl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">شماره تلفن</Label>
                <Input 
                  id="phoneNumber" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="شماره تلفن همراه خود را وارد کنید"
                  dir="rtl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">آدرس</Label>
                <Input 
                  id="address" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="آدرس محل سکونت خود را وارد کنید"
                  dir="rtl"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="idImage">تصویر کارت ملی</Label>
                <div className="border border-dashed border-input rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <Input 
                    id="idImage" 
                    type="file"
                    accept="image/*"
                    className="cursor-pointer"
                    onChange={(e) => handleFileChange(e, setIdImage)}
                  />
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    لطفاً تصویر واضحی از کارت ملی خود بارگذاری کنید
                  </p>
                </div>
                {idImage && (
                  <p className="text-sm text-green-600">{idImage.name} بارگذاری شد</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="selfieImage">تصویر سلفی با کارت ملی</Label>
                <div className="border border-dashed border-input rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <Input 
                    id="selfieImage" 
                    type="file"
                    accept="image/*"
                    className="cursor-pointer"
                    onChange={(e) => handleFileChange(e, setSelfieImage)}
                  />
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    لطفاً تصویر سلفی خود در حالی که کارت ملی کنار صورت شماست بارگذاری کنید
                  </p>
                </div>
                {selfieImage && (
                  <p className="text-sm text-green-600">{selfieImage.name} بارگذاری شد</p>
                )}
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full animated-gradient-button text-white py-2 px-4 rounded-md shadow-lg shadow-purple-500/20 mt-8"
            >
              ارسال مدارک و درخواست احراز هویت
            </Button>
            
            <p className="text-sm text-muted-foreground text-center mt-4">
              توجه: فرآیند احراز هویت ممکن است ۱ تا ۳ روز کاری زمان ببرد
            </p>
          </form>
        );
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar />
      
      <main className="flex-grow py-16 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-crypto-indigo to-crypto-purple bg-clip-text text-transparent">
            تنظیمات حساب کاربری
          </h1>
          
          <Tabs defaultValue="kyc" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-8">
              <TabsTrigger value="kyc">احراز هویت (KYC)</TabsTrigger>
              <TabsTrigger value="security">امنیت حساب</TabsTrigger>
            </TabsList>
            
            <TabsContent value="kyc">
              <Card className="card-3d bg-card border-border shadow-xl overflow-hidden">
                <CardHeader>
                  <CardTitle>احراز هویت (KYC)</CardTitle>
                  <CardDescription>
                    برای افزایش محدودیت برداشت و واریز، لطفاً احراز هویت خود را تکمیل کنید
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderKycContent()}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card className="card-3d bg-card border-border shadow-xl overflow-hidden">
                <CardHeader>
                  <CardTitle>امنیت حساب</CardTitle>
                  <CardDescription>
                    تنظیمات مربوط به امنیت حساب کاربری خود را مدیریت کنید
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">رمز عبور فعلی</Label>
                      <Input id="currentPassword" type="password" dir="rtl" placeholder="رمز عبور فعلی خود را وارد کنید" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">رمز عبور جدید</Label>
                      <Input id="newPassword" type="password" dir="rtl" placeholder="رمز عبور جدید را وارد کنید" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">تأیید رمز عبور جدید</Label>
                      <Input id="confirmPassword" type="password" dir="rtl" placeholder="رمز عبور جدید را مجدداً وارد کنید" />
                    </div>
                    
                    <Button 
                      className="w-full animated-gradient-button text-white py-2 px-4 rounded-md shadow-lg shadow-purple-500/20 mt-6"
                      onClick={() => toast.success('رمز عبور با موفقیت تغییر کرد')}
                    >
                      تغییر رمز عبور
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SettingsPage;
