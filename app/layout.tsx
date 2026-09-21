import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Avicenna Hospital - بیمارستان بین‌المللی ابن‌سینا',
  description: 'پلتفرم دیجیتال و سیستم طراحی وب‌سایت چندزبانه بیمارستان بین‌المللی ابن‌سینا',
  openGraph: {
    title: 'Avicenna Hospital - بیمارستان بین‌المللی ابن‌سینا',
    description: 'پلتفرم دیجیتال و سیستم طراحی وب‌سایت چندزبانه بیمارستان بین‌المللی ابن‌سینا',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avicenna Hospital - بیمارستان بین‌المللی ابن‌سینا',
    description: 'پلتفرم دیجیتال و سیستم طراحی وب‌سایت چندزبانه بیمارستان بین‌المللی ابن‌سینا',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
