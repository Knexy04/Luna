import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Header from "@/app/components/header";
import React, { Suspense } from "react";
import Loading from "@/app/loading";
import Footer from "@/app/components/footer"
import { GlobalContextProvider } from "@/app/context/store";

const inter = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Luna',
    description: 'Философия, которая раскрывается через твою красоту',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <GlobalContextProvider>
                    <Header />
                    <Suspense fallback={<Loading />}>
                        {children}
                    </Suspense>
                    <Footer />
                </GlobalContextProvider>
            </body>
        </html>
    )
}
