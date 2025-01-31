import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import LeftSidebar from "@/components/LeftSidebar";
import Loading from "./loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TODO",
  description: "TODO App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <Suspense fallback={<Loading />}>
            <div className="flex flex-col md:flex-row h-screen">
              <div className="flex-[2.5]">
                <LeftSidebar />
              </div>
              <div className="flex-[9.5] relative mx-14">{children}</div>
            </div>
          </Suspense>
        </ReduxProvider>
      </body>
    </html>
  );
}
