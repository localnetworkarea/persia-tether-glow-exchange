
import React from 'react';
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const WalletPage = () => {
  // Dummy wallet data - in a real app this would come from an API
  const walletData = {
    tetherBalance: 0,
    rialBalance: 0,
    depositAddress: 'TK9ihHoEUCUwNFXNfxj6Yc5DrtaBGh5wLL',
    transactions: []
  };
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletData.depositAddress);
    toast.success('آدرس با موفقیت کپی شد');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-16 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-crypto-indigo to-crypto-purple bg-clip-text text-transparent">
              کیف پول من
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card className="card-3d bg-card border-border shadow-lg overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">موجودی تتر</h3>
                  <p className="text-3xl font-bold">{walletData.tetherBalance.toLocaleString()} <span className="text-sm">USDT</span></p>
                  <p className="text-muted-foreground mt-2">
                    معادل {(walletData.tetherBalance * 52400).toLocaleString()} تومان
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-3d bg-card border-border shadow-lg overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">موجودی تومان</h3>
                  <p className="text-3xl font-bold">{walletData.rialBalance.toLocaleString()} <span className="text-sm">تومان</span></p>
                  <p className="text-muted-foreground mt-2">
                    معادل {(walletData.rialBalance / 52400).toFixed(2)} تتر
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="card-3d bg-card border-border shadow-lg overflow-hidden mb-12">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">واریز تتر</h3>
                <div className="bg-muted/30 p-4 rounded-lg mb-4">
                  <p className="text-sm text-muted-foreground mb-1">آدرس کیف پول تتر شما (شبکه TRC20)</p>
                  <div className="flex items-center justify-between bg-background p-3 rounded-md">
                    <p className="text-sm font-mono overflow-auto">{walletData.depositAddress}</p>
                    <Button variant="ghost" className="ml-2" onClick={handleCopyAddress}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>• لطفاً فقط از شبکه TRC20 برای واریز تتر استفاده کنید.</p>
                  <p>• حداقل مقدار واریز: 10 تتر</p>
                  <p>• واریز کمتر از 10 تتر قابل بازگشت نیست.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-3d bg-card border-border shadow-lg overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">تاریخچه تراکنش‌ها</h3>
                {walletData.transactions.length > 0 ? (
                  <div>
                    {/* Transaction history would be listed here */}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">هیچ تراکنشی یافت نشد</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      تراکنش‌های شما پس از انجام معاملات در اینجا نمایش داده می‌شوند
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default WalletPage;
