import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ErudaProvider from "../components/utils/ErudaProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Whispr - anonymous q&a",
  description: "Send anonymous messages to your friends on Instagram, Snapchat, and TikTok!",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0f0c20] text-white font-sans">
        <ErudaProvider status={process.env.STATUS} />
        {children}
      </body>
    </html>
  );
}
