import { Metadata } from 'next'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { Toaster } from "@/components/ui/toaster"
import { Profile } from "./components/profile"
import './globals.css'

export const metadata: Metadata = {
    title: "Teatro Grátis",
    description: "Encontre peças teatrais grátis",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <UserProvider>
                    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:border-0 sm:bg-transparent sm:px-6">
                        <Profile />
                    </header>
                    <main>
                        {children}
                    </main>
                    <Toaster />
                </UserProvider>
            </body>
        </html>
    )
}