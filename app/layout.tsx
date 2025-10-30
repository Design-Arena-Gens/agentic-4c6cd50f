import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'J.A.R.V.I.S. - Just A Rather Very Intelligent System',
  description: 'AI Assistant Interface inspired by Iron Man',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
