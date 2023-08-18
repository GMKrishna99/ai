import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Companion-ai',
  description: 'Companion-ai is create with NextJs by GMK',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
