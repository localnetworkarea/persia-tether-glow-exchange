
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  getCurrentUser, 
  getUserProfile, 
  getUserTransactions, 
  Transaction as TransactionType
} from "@/lib/supabase";

const WalletPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [walletData, setWalletData] = useState({
    tetherBalance: 0,
    rialBalance: 0,
    depositAddress: 'TK9ihHoEUCUwNFXNfxj6Yc5DrtaBGh5wLL',
  });
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        // Check if user is logged in
        const user = await getCurrentUser();
        if (!user) {
          toast.error('برای مشاهده کیف پول، لطفاً وارد شوید');
          navigate('/auth');
          return;
        }

        setUserId(user.id);
        
        // Fetch user profile with balance information
        const profile = await getUserProfile(user.id);
        
        // Fetch user transactions
        const userTransactions = await getUserTransactions(user.id);
        
        setWalletData({
          tetherBalance: Number(profile.tether_balance),
          rialBalance: Number(profile.rial_balance),
          depositAddress: 'TK9ihHoEUCUwNFXNfxj6Yc5DrtaBGh5wLL', // This would typically come from the backend
        });
        
        setTransactions(userTransactions);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        toast.error('خطا در دریافت اطلاعات کیف پول');
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [navigate]);
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletData.depositAddress);
    toast.success('آدرس با موفقیت کپی شد');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTransactionTypeText = (type: string, currency: string) => {
    switch (type) {
      case 'deposit':
        return `واریز ${currency === 'tether' ? 'تتر' : 'تومان'}`;
      case 'withdrawal':
        return `برداشت ${currency === 'tether' ? 'تتر' : 'تومان'}`;
      case 'exchange':
        return `تبدیل ${currency === 'tether' ? 'تتر به تومان' : 'تومان به تتر'}`;
      default:
        return type;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'انجام شده';
      case 'pending':
        return 'در حال انجام';
      case 'failed':
        return 'ناموفق';
      case 'cancelled':
        return 'لغو شده';
      default:
        return status;
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Background />
        <Navbar />
        
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">در حال بارگذاری اطلاعات کیف پول...</p>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
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
                {transactions.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-right py-3 px-4">نوع تراکنش</th>
                          <th className="text-right py-3 px-4">مقدار</th>
                          <th className="text-right py-3 px-4">وضعیت</th>
                          <th className="text-right py-3 px-4">تاریخ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((tx) => (
                          <tr key={tx.id} className="border-b border-border hover:bg-muted/30">
                            <td className="py-3 px-4">
                              {getTransactionTypeText(tx.type, tx.currency)}
                            </td>
                            <td className="py-3 px-4">
                              {Number(tx.amount).toLocaleString()} {tx.currency === 'tether' ? 'USDT' : 'تومان'}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`rounded-full px-2 py-1 text-xs border ${getStatusBadgeClass(tx.status)}`}>
                                {getStatusText(tx.status)}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">
                              {formatDate(tx.created_at)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
