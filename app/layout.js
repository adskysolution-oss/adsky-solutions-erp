import './globals.css';

export const metadata = {
  title: 'AD Sky Solution',
  description: 'Delivering expert IT consulting, software development, and professional staffing solutions for growing businesses.',
  openGraph: {
    title: 'AD Sky Solution',
    description: 'Delivering expert IT consulting, software development, and professional staffing solutions.',
    url: 'https://adskysolution.com',
    siteName: 'AD Sky Solution',
    images: [
      {
        url: 'https://www.adskysolution.com/logo(2).jpeg',
        width: 1200,
        height: 630,
        alt: 'AD Sky Solution',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AD Sky Solution',
    description: 'Delivering expert IT consulting, software development, and professional staffing solutions.',
    images: ['https://www.adskysolution.com/logo(2).jpeg'],
  },
  icons: {
    icon: '/logo(2).jpeg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="stylesheet" href="/adsky_style.css" />
      </head>
      <body className="montserrat_a6b8e55e-module__JnHUVq__variable font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
