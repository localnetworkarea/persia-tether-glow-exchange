
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 mt-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">تتر اکسچنج</h3>
            <p className="text-muted-foreground">
              امن‌ترین و ساده‌ترین راه برای خرید و فروش تتر در ایران
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">لینک‌های مهم</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary">درباره ما</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">قوانین و مقررات</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">سوالات متداول</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">تماس با ما</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">ارتباط با ما</h3>
            <p className="text-muted-foreground mb-2">ایمیل: info@tetherexchange.ir</p>
            <p className="text-muted-foreground mb-2">تلفن: 021-12345678</p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} تتر اکسچنج - تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
