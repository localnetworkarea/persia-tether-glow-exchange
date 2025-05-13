
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Feature3DCard from "@/components/Feature3DCard";
import TetherExchangeCard from "@/components/TetherExchangeCard";

const Index = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      title: "امنیت بالا",
      description: "امن‌ترین پلتفرم معاملاتی با استفاده از رمزنگاری پیشرفته و احراز هویت دو مرحله‌ای",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "کارمزد پایین",
      description: "پایین‌ترین کارمزدهای معاملاتی در بازار ارزهای دیجیتال ایران",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "پشتیبانی ۲۴/۷",
      description: "پشتیبانی کامل و آنلاین در تمام روزهای هفته از طریق تیکت و چت آنلاین",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      )
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-6 md:px-16 flex flex-col items-center justify-center text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-crypto-purple to-crypto-blue bg-clip-text text-transparent animated-shadow floating">
              امن‌ترین پلتفرم خرید و فروش تتر در ایران
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10">
              با بهترین قیمت و کمترین کارمزد، تتر خود را معامله کنید
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="animated-gradient-button text-white px-8 py-6 rounded-full text-lg shadow-lg shadow-purple-500/20"
                onClick={() => navigate('/auth')}
              >
                شروع معاملات
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/market')}
                className="px-8 py-6 rounded-full text-lg border-2 border-primary/30 hover:border-primary hover:bg-primary/5"
              >
                مشاهده قیمت لحظه‌ای
              </Button>
            </div>
          </div>
        </section>
        
        {/* Live Exchange Card */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-crypto-indigo to-crypto-purple bg-clip-text text-transparent">
              معاملات آنلاین تتر
            </h2>
            <div className="flex justify-center">
              <TetherExchangeCard />
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-6 md:px-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-crypto-indigo to-crypto-purple bg-clip-text text-transparent">
            ویژگی‌های برتر
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Feature3DCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 md:px-16 text-center">
          <div className="max-w-3xl mx-auto bg-card rounded-3xl p-10 border border-primary/10 animated-shadow card-3d">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-crypto-purple to-crypto-blue bg-clip-text text-transparent">
              همین حالا ثبت‌نام کنید
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              با ثبت نام در تتر اکسچنج، به سادگی معاملات ارز دیجیتال خود را آغاز کنید
            </p>
            <Button 
              className="animated-gradient-button text-white px-8 py-6 rounded-full text-lg shadow-lg shadow-purple-500/20"
              onClick={() => navigate('/auth')}
            >
              ثبت‌نام رایگان
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
