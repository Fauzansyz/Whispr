import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErudaProvider from "../components/utils/ErudaProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NGL - anonymous q&a",
  description: "Send anonymous messages to your friends on Instagram, Snapchat, and TikTok!",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0f0c20] text-white font-sans">
        <ErudaProvider status={process.env.STATUS} />
        {children}
      </body>
    </html>
  );
}
