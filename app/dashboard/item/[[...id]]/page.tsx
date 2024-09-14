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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, PlusCircle } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HorariosReserva } from "@/app/domain/horariosReserva"
import { UUID } from "crypto"

const FormSchema = z.object({
  name: z
    .string()
    .max(10, {
      message: "Name must not be longer than 30 characters."
    }),
  description: z
    .string()
    .max(1000, {
      message: "Description must not be longer than 1000 characters"
    }),
  status: z
    .string({
      required_error: "Please select an status to display."
    }),
  image: z
    .any() // Start with `any()` since files are non-standard types
    .refine((files) => files && files.length > 0, {
      message: 'Image file is required',
    })
    .refine((files) => files?.size < (5 * 1024 * 1024), {
      message: 'File size must be less than 5MB',
    })
})


let contador = 1

export default function ItemPage({ params }: { params: { id?: string[] } }) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  const { id } = params;
  if (id && id.length > 0) {
    form.setValue('name', id[0]);
    form.setValue('description', "teste teste");
  }

  const [horarios, setHorarios] = useState<HorariosReserva[]>([])
  const [data, setData] = useState<Date>()
  const [hora, setHora] = useState<string>('')

  const isButtonDisabled: boolean = data === undefined || hora === '';

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => { })}>
          <div className="grid flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard">Discard</Link>
                </Button>
                <Button type="submit" size="sm">Save</Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormField control={form.control} name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
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
                              <FormLabel>Description</FormLabel>
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
                        onClick={() => setHorarios([...horarios, { data: data ? data.toLocaleDateString() : '', hora: hora, id: contador++ }])}
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
                      <ScrollArea className="h-72 w-68 rounded-md border">
                        <DataTable columns={columns} data={horarios} />
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Product Status</CardTitle>
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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger id="status" aria-label="Select status">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Active</SelectItem>
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
                    <CardTitle>Product Images</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
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
                              <FormLabel>File</FormLabel>
                              <FormControl className="w-[240px]">
                                <div>
                                  <Input
                                    id="file"
                                    type="file"
                                    accept="image/*"
                                    {...field}
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
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard">Discard</Link>
                </Button>
                <Button type="submit" size="sm">Save</Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
