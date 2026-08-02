import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yuvaan Gulati | AI, Math, Robotics",
  description:
    "Portfolio for Yuvaan Gulati, a student developer focused on AI, applied mathematics, robotics, STEM education, and computer engineering.",
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
