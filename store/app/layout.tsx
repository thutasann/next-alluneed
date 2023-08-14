import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-prrovider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AllUNeed Ecommece',
  description: 'This is the Ecommerce named ALLUNEED',
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    images: '/alluneed-og.webp',
    type: 'website',
    url: 'https://alluneed.vercel.app/',
    locale: 'en',
    title: 'AllUNeed Ecommece',
    description: 'This is the Ecommerce named ALLUNEED',
    siteName: 'AllUNeed',
    countryName: 'Myanmar',
    alternateLocale: 'eng',
  },
  twitter: {
    title: "AllUNeed Ecommece'",
    description: 'This is the Ecommerce named ALLUNEED',
    card: 'summary_large_image',
    site: '@thutasann3',
    images: '/alluneed-og.webp',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ModalProvider />
        <ToastProvider />
        {/* @ts-ignore */}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
