import './globals.css';
import type { Metadata } from 'next';
import { Schibsted_Grotesk, Martian_Mono } from 'next/font/google';

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"]
})

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: 'DevEvent',
  description: "The Hub for Every Event You Mustn't Miss",
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col overflow-hidden">
        {children}
        Footer
      </body>
    </html>
  );
}
