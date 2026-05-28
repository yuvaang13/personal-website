import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yuvaan Gulati | Student Developer",
  description:
    "Portfolio for Yuvaan Gulati, a student developer focused on artificial intelligence, applied mathematics, and computer engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
