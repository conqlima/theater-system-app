import {
  TooltipProvider,
} from "@/components/ui/tooltip"
import { Suspense } from "react"
import Loading from "./loading"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <TooltipProvider>
      <div className="flex w-full flex-col bg-muted/40 justify-center">
        <div className="flex flex-col sm:gap-4 py-6 border-t">
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </div>
      </div>
    </TooltipProvider>
  )
}