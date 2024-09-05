'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { Textarea } from "@/components/ui/textarea"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
      message: 'Image file is required', // Ensure a file is selected
    })
    // .refine((files) => files[0]?.type.startsWith('image/'), {
    //   message: 'Only image files are allowed', // Check that the file is an image
    // })
    .refine((files) => files?.size < (5 * 1024 * 1024), {
      message: 'File size must be less than 5MB', // Check that the file size is below the limit
    }),
})

export default function Item({ params }: { params: { id?: string[] } }) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  const { id } = params;

  if (id && id.length > 0) {
    useEffect(() => {
      form.setValue('name', id[0]);
      form.setValue('description', "teste teste");
    }, [form.setValue]);
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
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
                              <FormControl>
                                <div>
                                  <Input
                                    id="file"
                                    type="file"
                                    accept="image/*"
                                    className="w-full"
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
              </div>
            </div>
          </div>
        </form>
      </Form>
    </main>
  )
}
