import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import "./globals.scss";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./Providers";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});



export const metadata: Metadata = {
  title: "PlanIt",
  description: "PlanIt is a platform for event management.",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl='/'>
      <html lang="en">
        <body className={poppins.className}>
          <main className="root">
            <Providers>
            {children}
            </Providers>
            </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
