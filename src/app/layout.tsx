import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JurisFlow — The Career Operating System for Law Students",
  description:
    "Discover internships. Track applications. Build networks. Accelerate legal careers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
