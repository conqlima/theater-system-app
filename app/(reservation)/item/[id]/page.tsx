'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, CalendarDays, Clock } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/hooks/use-toast"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MapPinned, CalendarClock } from "lucide-react"
import { useState } from 'react'

const FormSchema = z.object({
    data: z.date({
        required_error: "Escolha uma data",
    }),
    hora: z.string({
        required_error: "Escolha um horário"
    })
})

const reservations = [
    "2024-09-11T16:30:00.000-03:00",
    "2024-09-11T19:30:00.000-03:00",
    "2024-09-12T17:30:00.000-03:00",
    "2024-09-13T22:00:00.000-03:00",
    "2024-09-14T12:00:00.000-03:00",
]

function getDatePart(isoString: string) {
    return isoString.split('T')[0];
}

function getHourAndMinutePart(isoString: string) {
    return isoString.split('T')[1].substring(0, 5);
}

function appendToDict(dict: { [key: string]: string[] }, key: string, value: string): void {
    if (dict[key]) {
        dict[key].push(value);
    } else {
        dict[key] = [value];
    }
}

function createDateTimeDict(isoDates: string[]) {
    const dateTimeDict: { [key: string]: string[] } = {}

    isoDates.forEach((isoString) => {
        const datePart = getDatePart(isoString);
        const timePart = getHourAndMinutePart(isoString);
        appendToDict(dateTimeDict, datePart, timePart)
    })

    return dateTimeDict;
}

const dateTimeDict = createDateTimeDict(reservations);
const availableDates = Object.keys(dateTimeDict);

export default function ItemPage({ params }: { params: { id: string } }) {

    const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const { id } = params;

    if (id && id.length > 0) {

    }

    const availableTimes = selectedDate ? dateTimeDict[selectedDate] : []

    const handleReset = () => {
        form.resetField('hora')
    }

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

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
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                            <div className="grid gap-3">
                                                <div className="font-semibold flex items-center gap-1">
                                                    <CalendarDays />
                                                    Datas Disponíveis
                                                </div>

                                                <FormField
                                                    control={form.control}
                                                    name="data"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col">
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <FormControl>
                                                                        <Button
                                                                            variant={"outline"}
                                                                            className={cn(
                                                                                "w-[240px] pl-3 text-left font-normal",
                                                                                !field.value && "text-muted-foreground"
                                                                            )}
                                                                        >
                                                                            {field.value ? (
                                                                                format(field.value, "PPP", { locale: ptBR })
                                                                            ) : (
                                                                                <span>escolha uma data</span>
                                                                            )}
                                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                        </Button>
                                                                    </FormControl>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0" align="start">
                                                                    <Calendar
                                                                        locale={ptBR}
                                                                        mode="single"
                                                                        selected={field.value}
                                                                        onSelect={(date: Date | undefined) => {
                                                                            field.onChange(date)
                                                                            const datePart = date ? getDatePart(date.toISOString()) : undefined
                                                                            setSelectedDate(datePart)
                                                                            handleReset()
                                                                        }}
                                                                        disabled={(date: Date) =>
                                                                            !availableDates.includes(getDatePart(date.toISOString()))
                                                                        }
                                                                        initialFocus
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-3 my-4">
                                                <div className="font-semibold flex items-center gap-1">
                                                    <Clock />
                                                    Horários Disponíveis
                                                </div>

                                                <FormField
                                                    control={form.control}
                                                    name="hora"
                                                    render={({ field }) => (
                                                        <FormItem className={cn(
                                                            "flex flex-col w-[240px] text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                                disabled={!selectedDate}
                                                            >
                                                                <SelectTrigger
                                                                    id="hora"
                                                                >
                                                                    {field.value ? (
                                                                        field.value
                                                                    ) : (
                                                                        <span>escolha uma um horário</span>
                                                                    )}
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {availableTimes.map(item => (
                                                                        <SelectItem value={item} key={item}>
                                                                            {item}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <Separator className="my-4" />
                                        </CardContent>
                                        <CardFooter>
                                            <Button type="submit">Adquirir Ingresso Amigo</Button>
                                        </CardFooter>
                                    </form>
                                </Form>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}