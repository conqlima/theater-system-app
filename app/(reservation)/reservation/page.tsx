import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function LandingPage() {
    return (
        <>
            <div className="col-span-3 lg:col-span-4 grid flex-1 items-start gap-4">
                <div className="lg:border-l h-full px-4 py-6 lg:px-8">
                    <div className="flex space-x-4 pb-4">
                        <div className="overflow-hidden rounded-md">
                            <Image
                                src="https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80"
                                alt="React Rendezvous"
                                width={250}
                                height={330}
                                className="h-auto w-auto object-cover transition-all portrait"
                            />
                        </div>
                        <div>
                            <Card
                                className="sm:col-span-3" x-chunk="dashboard-05-chunk-0"
                            >
                                <CardHeader className="pb-3">
                                    <CardTitle>Noviça Rebelde</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 text-sm">
                                    <div className="grid gap-3">
                                        <div className="font-semibold">Localização</div>
                                        <ul className="grid gap-3">
                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">
                                                    Glimmer Lamps x <span>2</span>
                                                </span>
                                                <span>$250.00</span>
                                            </li>
                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">
                                                    Aqua Filters x <span>1</span>
                                                </span>
                                                <span>$49.00</span>
                                            </li>
                                        </ul>
                                        <Separator className="my-2" />
                                        <ul className="grid gap-3">
                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Subtotal</span>
                                                <span>$299.00</span>
                                            </li>
                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Shipping</span>
                                                <span>$5.00</span>
                                            </li>
                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Tax</span>
                                                <span>$25.00</span>
                                            </li>
                                            <li className="flex items-center justify-between font-semibold">
                                                <span className="text-muted-foreground">Total</span>
                                                <span>$329.00</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="grid gap-3">
                                            <div className="font-semibold">Programação</div>
                                            <address className="grid gap-0.5 not-italic text-muted-foreground">
                                                <span>Liam Johnson</span>
                                                <span>1234 Main St.</span>
                                                <span>Anytown, CA 12345</span>
                                            </address>
                                        </div>
                                        <div className="grid auto-rows-max gap-3">
                                            <div className="font-semibold">Billing Information</div>
                                            <div className="text-muted-foreground">
                                                Same as shipping address
                                            </div>
                                        </div>
                                        <div className="grid auto-rows-max gap-3">
                                            <div className="font-semibold">Billing Information</div>
                                            <div className="text-muted-foreground">
                                                Same as shipping address
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Create New Order</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}