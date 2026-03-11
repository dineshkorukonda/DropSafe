import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DropSafe | Parametric Income Protection",
  description: "AI-powered parametric income protection platform for food delivery partners",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
