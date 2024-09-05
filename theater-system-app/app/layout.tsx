import { Metadata } from 'next';
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
                {children}
            </body>
        </html>
    )
}