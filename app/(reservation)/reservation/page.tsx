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
import { MapPinned, CalendarClock } from "lucide-react"

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
                                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                                        Ao contrário do que se acredita, Lorem Ipsum não é simplesmente um texto randômico. Com mais de 2000 anos, suas raízes podem ser encontradas em uma obra de literatura latina clássica datada de 45 AC. Richard McClintock, um professor de latim do Hampden-Sydney College na Virginia, pesquisou uma das mais obscuras palavras em latim, consectetur, oriunda de uma passagem de Lorem Ipsum, e, procurando por entre citações da palavra na literatura clássica, descobriu a sua indubitável origem. Lorem Ipsum vem das seções 1.10.32 e 1.10.33 do "de Finibus Bonorum et Malorum" (Os Extremos do Bem e do Mal), de Cícero, escrito em 45 AC. Este livro é um tratado de teoria da ética muito popular na época da Renascença. A primeira linha de Lorem Ipsum, "Lorem Ipsum dolor sit amet..." vem de uma linha na seção 1.10.32.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 text-sm">
                                    <Separator className="my-2" />
                                    <div className="grid gap-3">
                                        <div className="font-semibold flex items-center gap-1">
                                            <MapPinned />
                                            Localização
                                        </div>
                                        <ul className="grid gap-3">
                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">
                                                    Teatro Riachuelo, Cinelandia, Rio de Janeiro, Rio de Janeiro
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="grid gap-3">
                                        <div className="font-semibold flex items-center gap-1">
                                            <CalendarClock />
                                            Horários
                                        </div>
                                        <ul className="grid gap-3">
                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">
                                                    Toda sexta, sábado e domingo às 18h
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <Separator className="my-4" />
                                </CardContent>
                                <CardFooter>
                                    <Button>Adquirir Ingresso Amigo</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}