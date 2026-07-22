import type { Metadata } from "next";
import { Rajdhani, Barlow, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

const rajdhani = Rajdhani({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
});

const barlow = Barlow({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-barlow",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Email-Vmail | DFY Email Marketing for Firearms & 2A Brands",
  description:
    "Done-For-You email marketing agency for gun stores, FFL dealers, ammo retailers, and 2A brands. ESP-compliant lifecycle systems that turn subscribers into repeat buyers.",
  metadataBase: new URL("https://emailvmail.com"),
  openGraph: {
    type: "website",
    siteName: "Email-Vmail",
    title: "Email-Vmail | DFY Email Marketing for Firearms & 2A Brands",
    description:
      "Done-For-You email marketing for gun stores, ammo retailers, and 2A brands. From subscribed to sold, again and again.",
    url: "https://emailvmail.com",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Email-Vmail | DFY Email Marketing for Firearms & 2A Brands",
    description:
      "Done-For-You email marketing for gun stores, ammo retailers, and 2A brands. From subscribed to sold, again and again.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${rajdhani.variable} ${barlow.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KW478NFN');`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KW478NFN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-28L8BWNRYP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-28L8BWNRYP');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Email-Vmail",
              "url": "https://emailvmail.com",
              "description": "Done-for-you email marketing agency for firearms, ammunition, and tactical gear retailers.",
              "founder": {
                "@type": "Person",
                "name": "Ameer Hamza",
                "jobTitle": "Founder & Email Strategist",
                "sameAs": ["https://linkedin.com/in/rahamza009/"]
              },
              "knowsAbout": [
                "Email Marketing",
                "Lifecycle Marketing",
                "Klaviyo",
                "ActiveCampaign",
                "Firearms Industry Compliance",
                "Ecommerce Retention",
                "Customer Segmentation"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Email Marketing for Firearms, Ammunition, and Tactical Gear Retailers",
              "provider": {
                "@type": "Organization",
                "name": "Email-Vmail",
                "url": "https://emailvmail.com"
              },
              "areaServed": [
                { "@type": "State", "name": "Texas" },
                { "@type": "State", "name": "Florida" },
                { "@type": "State", "name": "Pennsylvania" },
                { "@type": "State", "name": "North Carolina" },
                { "@type": "State", "name": "Ohio" },
                { "@type": "State", "name": "Arizona" },
                { "@type": "State", "name": "Georgia" },
                { "@type": "State", "name": "Tennessee" }
              ],
              "audience": {
                "@type": "BusinessAudience",
                "audienceType": "FFL dealers, gun stores, ammunition retailers, tactical gear and outdoor brands"
              }
            })
          }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
