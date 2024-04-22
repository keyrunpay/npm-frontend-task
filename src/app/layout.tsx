import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Neptune Mutual",
  description:
    "Need Crypto Insurance? You don't need to submit loss proof to receive payouts. No need to wait after creating a claim. Get a free price quote now.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
