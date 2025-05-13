
import React from 'react';
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const MarketPage = () => {
  const marketData = {
    buyPrice: 52400,
    sellPrice: 52200,
    dailyHigh: 53100,
    dailyLow: 51800,
    volume24h: 1250000,
    change24h: 1.2,
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-crypto-indigo to-crypto-purple bg-clip-text text-transparent">
              قیمت لحظه‌ای تتر
            </h1>
            
            <Card className="card-3d bg-card border-border shadow-lg overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row justify-between mb-8">
                  <div className="text-center mb-6 md:mb-0">
                    <p className="text-sm text-muted-foreground mb-1">قیمت خرید</p>
                    <h3 className="text-3xl font-bold text-foreground">{marketData.buyPrice.toLocaleString()} <span className="text-sm">تومان</span></h3>
                  </div>
                  
                  <div className="text-center mb-6 md:mb-0">
                    <p className="text-sm text-muted-foreground mb-1">قیمت فروش</p>
                    <h3 className="text-3xl font-bold text-foreground">{marketData.sellPrice.toLocaleString()} <span className="text-sm">تومان</span></h3>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">تغییرات ۲۴ ساعته</p>
                    <h3 className={`text-3xl font-bold ${marketData.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {marketData.change24h >= 0 ? '+' : ''}{marketData.change24h}%
                    </h3>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">بالاترین قیمت (۲۴ ساعت)</p>
                    <p className="text-xl font-semibold">{marketData.dailyHigh.toLocaleString()} تومان</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">پایین‌ترین قیمت (۲۴ ساعت)</p>
                    <p className="text-xl font-semibold">{marketData.dailyLow.toLocaleString()} تومان</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">حجم معاملات (۲۴ ساعت)</p>
                    <p className="text-xl font-semibold">{marketData.volume24h.toLocaleString()} تتر</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-6">چرا تتر؟</h2>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                تتر (Tether) یک ارز دیجیتال باثبات است که ارزش آن معادل یک دلار آمریکا است. این ارز به دلیل ثبات قیمتی، گزینه مناسبی برای افرادی است که می‌خواهند از نوسانات قیمتی رایج در بازار ارزهای دیجیتال دوری کنند. تتر به عنوان یک پل بین ارزهای فیات سنتی و ارزهای دیجیتال عمل می‌کند.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketPage;
