'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, CalendarDays, Clock, ChevronLeft } from "lucide-react"
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
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MapPinned, CalendarClock } from "lucide-react"
import { useState, useEffect } from 'react'
import { Play } from "@/domain/play"

const FormSchema = z.object({
    data: z.date({
        required_error: "Escolha uma data",
    }),
    hora: z.string({
        required_error: "Escolha um horário"
    })
})

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

export default function ItemPage({ params }: { params: { id: string } }) {

    const [play, setPlay] = useState<Play>();
    const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    useEffect(() => {
        const fetchItems = async (id: string) => {
            const response = await fetch(`/api/play/${id}`);
            const data: Play = await response.json();
            setPlay(data);
        };

        fetchItems(params.id);
    }, [params.id]);

    const dateTimeDict = createDateTimeDict(play?.exhibitionDates ?? [])
    const availableDates = Object.keys(dateTimeDict)
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
            <div className="col-span-4 lg:col-span-4 grid flex-1 items-start gap-4">
                <div className="lg:border-l h-full px-8 py-6 lg:px-8">
                    <div className="pb-4">
                        <Button variant="outline" size="icon" className="h-7 w-7">
                            <Link href="/">
                                <ChevronLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                    <div className="flex space-x-4 pb-4">
                        <div className="overflow-hidden rounded-md">
                            <Image
                                src={play?.imageURL ?? ""}
                                alt="React Rendezvous"
                                width={250}
                                height={330}
                                className="h-auto w-auto object-cover transition-all portrait"
                            />
                        </div>
                        <div className="w-full">
                            <Card
                                className="sm:col-span-6 w-full" x-chunk="dashboard-05-chunk-0"
                            >
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        <CardHeader>
                                            <CardTitle>{play?.name}</CardTitle>
                                            <CardDescription className="text-justify">
                                                {play?.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="text-sm">
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
                                                                            !availableDates?.includes(getDatePart(date.toISOString()))
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
                                                                    {availableTimes?.map(item => (
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