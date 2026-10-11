import Footer from '@/components/public/shared/footer';
import TopHeader from '@/components/public/shared/topHeader';
import BottomNavbar from '@/components/public/shared/BottomNavbar';
import AIChatbot from "@/components/AIChatbot";
import React from 'react';
import WhatsAppButton from '@/components/WhatsAppButton';


export const metadata = {
  // মেটাডাটা বেস URL (ওপেন গ্রাফ ইমেজের জন্য আবশ্যক)
  metadataBase: new URL("https://al-madina-academy.vercel.app"),

  title: {
    default: "AL-MADINA ISLAMIC ACADEMY | আল-মদিনা ইসলামিক একাডেমি",
    template: "%s | AL-MADINA ISLAMIC ACADEMY | আল-মদিনা ইসলামিক একাডেমি",
  },
  description:
    "আধুনিক ও সুশৃঙ্খল আবাসন ব্যবস্থাসহ একাডেমিক শিক্ষা ও হিফজ করার এক অনন্য প্রতিষ্ঠান, বড় বাকাইল, সুহিলপুর, সদর, ব্রাহ্মণবাড়িয়া।",
  
  // কিওয়ার্ড সংখ্যা ও প্রাসঙ্গিকতা বৃদ্ধি
  keywords: [
    "al-madina",
    "AL-MADINA ISLAMIC ACADEMY",
    "আল-মদিনা ইসলামিক একাডেমি",
    "ব্রাহ্মণবাড়িয়া মাদ্রাসা",
    "Hifz Madrasah Brahmanbaria",
    "Brahmanbaria Islamic School",
    "ব্রাহ্মণবাড়িয়া হিফজ মাদ্রাসা",
    "best madrasah in brahmanbaria",
    "ইসলামিক শিক্ষা ব্রাহ্মণবাড়িয়া",
  ],

  // Google Search & indexing নির্দেশিকা
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // সোশ্যাল মিডিয়া রিচ বাড়াতে OpenGraph (Facebook, WhatsApp, LinkedIn)
    openGraph: {
    title: "AL-MADINA ISLAMIC ACADEMY | আল-মদিনা ইসলামিক একাডেমি",
    description:
      "আধুনিক ও সুশৃঙ্খল আবাসন ব্যবস্থাসহ একাডেমিক শিক্ষা ও হিফজ করার এক অনন্য প্রতিষ্ঠান, ব্রাহ্মণবাড়িয়া।",
    url: "https://al-madina-academy.vercel.app",
    siteName: "AL-MADINA ISLAMIC ACADEMY",
    images: [
      {
        url: "/madrasah-logo.jpeg",
        width: 1200,
        height: 630,
        alt: "AL-MADINA ISLAMIC ACADEMY Logo",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },

  // Twitter / X কার্ড মেটাডেটা
  twitter: {
    card: "summary_large_image",
    title: "AL-MADINA ISLAMIC ACADEMY",
    description:
      "আধুনিক ও সুশৃঙ্খল আবাসন ব্যবস্থাসহ একাডেমিক শিক্ষা ও হিফজ করার এক অনন্য প্রতিষ্ঠান, ব্রাহ্মণবাড়িয়া।",
    images: ["/madrasah-logo.jpeg"],
  },

  // ডুप्लिकেট ইউআরএল সমস্যা দূর করতে
  alternates: {
    canonical: "https://al-madina-academy.vercel.app",
  },
};

const layout = ({ children }) => {
  return (
    <div>
      <TopHeader />


      <main className="min-h-screen pb-24 md:pb-28">
        {children}
      </main>

      <BottomNavbar />
      <AIChatbot />
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default layout;
