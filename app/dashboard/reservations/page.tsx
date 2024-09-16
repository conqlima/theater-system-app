'use client'
import Image from "next/image"
import {
  MoreHorizontal,
  PlusCircle,
  Search
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Link from 'next/link'
import { useState } from 'react'
import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { v4 as uuid } from 'uuid'
import { Reservas } from "@/app/domain/reservas"

export default function dashboardReservationPage() {

  const items: Reservas[] = [
    { id: uuid(), name: 'Fulano de tal', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-11 10:42 AM' },
    { id: uuid(), name: 'Ciclano e tal', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-12 10:56 PM' },
    { id: uuid(), name: 'Gabriel Queiroz', status: 'approved', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-13 10:56 AM' },
    { id: uuid(), name: 'Will smith', status: 'approved', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-14 10:32 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
    { id: uuid(), name: 'Agata', status: 'pending', playName: 'jhdfdjfhdj idufidjh', imageURL: '/placeholder.svg', createdAt: '2023-07-15 10:40 AM' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = items.filter(item => {
    if (selectedCategory === 'all') {
      return true;
    }
    return item.status === selectedCategory;
  });

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all" onValueChange={(value: string) => {
        setSelectedCategory(value);
      }}>
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
        </div>
        <TabsContent value={selectedCategory}>
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Pedidos de convites</CardTitle>
              <CardDescription>
                Gerencia os pedidos de convites
              </CardDescription>
            </CardHeader>
            <CardContent>
            <DataTable columns={columns} data={filteredItems} />
            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
