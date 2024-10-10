'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, PlusCircle, MoreHorizontal, ChevronLeft } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ExhibitionDate } from "@/app/domain/exhibitionDate"
import { v4 as uuid } from 'uuid'
import { Play } from "@/app/domain/play"

const FormSchema = z.object({
  name: z
    .string()
    .max(50, {
      message: "Nome deve ter no máximo 50 caracteres"
    }),
  description: z
    .string()
    .max(1000, {
      message: "Descrição deve ter no máximo 1000 caracteres"
    }),
  status: z
    .string({
      required_error: "Por favor, selecione um status"
    }),
  image: z
    .any()
    .refine((files) => files && files.length > 0, {
      message: 'Imagem é obrigatória',
    })
})

// Default values for the form
const defaultValues = {
  name: "",
  description: "",
  status: "",
  image: null
};


function getDatePart(isoString: string) {
  return new Date(isoString).toLocaleDateString();
}

function getHourAndMinutePart(isoString: string) {
  return isoString.split('T')[1].substring(0, 5);
}

function getHorariosReserva(isoDates: string[]) {
  const horarios: ExhibitionDate[] = [];
  isoDates.forEach((isoString) => {
    const datePart = getDatePart(isoString);
    const timePart = getHourAndMinutePart(isoString);
    horarios.push({ date: datePart, time: timePart, id: uuid() });
  })
  return horarios;
}

export default function PlayPage({ params }: { params: { id?: string[] } }) {

  const [play, setPlay] = useState<Play>();
  const [horarios, setHorarios] = useState<ExhibitionDate[]>([])
  const [data, setData] = useState<Date>()
  const [hora, setHora] = useState<string>('')
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues
  })
  const isButtonDisabled: boolean = data === undefined || hora === '';
  const { id } = params;

  if (id && id.length > 0) {
    useEffect(() => {
      const fetchItems = async (id: string) => {
        const response = await fetch(`/api/play/${id}`);
        const data: Play = await response.json();
        setPlay(data);
        form.setValue('name', data.name ?? "");
        form.setValue('description', data.description ?? "");
        form.setValue('status', data.status ?? "");
        setHorarios(getHorariosReserva(data.exhibitionDates))
      };

      fetchItems(id[0]);
    }, []);
  }

  const addItem = () => {
    setHorarios([...horarios, { date: data ? data.toLocaleDateString() : '', time: hora, id: uuid() }])
  }

  const removeItem = (id: string) => {
    const updatedItems = horarios.filter((item) => item.id !== id)
    setHorarios(updatedItems)
  }

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => { })}>
          <div className="grid flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7">
                <Link href="/dashboard">
                  <ChevronLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard">Descartar</Link>
                </Button>
                <Button type="submit" size="sm">Salvar</Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Detalhes da peça</CardTitle>
                    <CardDescription>
                      Cadastre/edite sua peça aqui
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormField control={form.control} name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome</FormLabel>
                              <FormControl>
                                <Input
                                  id="name"
                                  type="text"
                                  className="w-full"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                      </div>
                      <div className="grid gap-3">
                        <FormField control={form.control} name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Descrição</FormLabel>
                              <FormControl>
                                <Textarea
                                  id="description"
                                  className="min-h-32"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-2">
                  <Card x-chunk="dashboard-07-chunk-0">
                    <CardHeader>
                      <CardTitle>Horários</CardTitle>
                      <CardDescription>
                        Cadastre as datas e horários para essa peça
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="data" >Data</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                name="data"
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !data && "text-muted-foreground"
                                )}
                              >
                                {data ? (
                                  format(data, "PPP", { locale: ptBR })
                                ) : (
                                  <span>escolha uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                locale={ptBR}
                                mode="single"
                                selected={data}
                                onSelect={setData}
                                disabled={(date: Date) =>
                                  date < new Date()
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="grid gap-3 text-black">
                          <Label htmlFor="hora">Hora</Label>
                          <Input
                            name="hora"
                            value={hora}
                            onChange={(event) => setHora(event.target.value)}
                            type="time"
                            step="60"
                            className="w-[240px] justify-center"
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="justify-center border-t p-4">
                      <Button
                        type="button"
                        onClick={() => addItem()}
                        disabled={isButtonDisabled}
                        size="sm"
                        variant="outline"
                        className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        Adicionar Horário
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-0">
                    <CardHeader>
                      <CardDescription>
                        Datas e horários cadastrados
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-72 w-71 rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Data</TableHead>
                              <TableHead>Horário</TableHead>
                              <TableHead>
                                <span className="sr-only">Actions</span>
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {horarios.length ? (
                              horarios.map(item => (
                                <TableRow key={item.id}>
                                  <TableCell className="md:table-cell">
                                    {item.date}
                                  </TableCell>
                                  <TableCell className="md:table-cell">
                                    {item.time}
                                  </TableCell>
                                  <TableCell>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          aria-haspopup="true"
                                          size="icon"
                                          variant="ghost"
                                        >
                                          <MoreHorizontal className="h-4 w-4" />
                                          <span className="sr-only">Toggle menu</span>
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => removeItem(item.id)} >
                                          Deletar
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              ))) : (
                              <TableRow>
                                <TableCell colSpan={2} className="h-24 text-center">
                                  Nenhum resultado
                                </TableCell>
                              </TableRow>)
                            }
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status</FormLabel>
                              <FormControl>
                                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                  <SelectTrigger id="status" aria-label="Select status">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card
                  className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Imagem</CardTitle>
                    <CardDescription>
                      Suba uma imagem com boa definição como capa da peça
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 gap-2">
                        <FormField
                          control={form.control}
                          name="image"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Arquivo</FormLabel>
                              <FormControl className="w-[240px]">
                                <div>
                                  <Input
                                    id="file"
                                    type="file"
                                    accept="image/*"
                                    onChange={field.onChange}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 md:ml-auto">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard">Descartar</Link>
                </Button>
                <Button type="submit" size="sm">Salvar</Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
