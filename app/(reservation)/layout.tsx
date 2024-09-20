import { Sidebar } from "./components/sidebar"

export default function ReservationLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="md:block">
            <div className="border-t">
                <div className="bg-background">
                    <div className="grid lg:grid-cols-5">
                        <Sidebar className="hidden lg:block" />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}