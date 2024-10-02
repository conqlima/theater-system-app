import {
  TooltipProvider,
} from "@/components/ui/tooltip"
import Sidebar from "./components/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
      <TooltipProvider>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <Sidebar />
            {children}
          </div>
        </div>
      </TooltipProvider>
  )
}