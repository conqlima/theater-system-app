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
import { useState } from 'react';

export default function Dashboard() {

  const items = [
    { id: 1, Name: 'Apple', Status: 'draft', Description: 'jhdfdjfhdj idufidjh', ImageURL: '/placeholder.svg', CreatedAt: '2023-07-12 10:42 AM' },
    { id: 2, Name: 'Carrot', Status: 'active', Description: 'jhdfdjfhdj idufidjh', ImageURL: '/placeholder.svg', CreatedAt: '2023-07-12 10:42 AM' },
    { id: 3, Name: 'Banana', Status: 'archived', Description: 'jhdfdjfhdj idufidjh', ImageURL: '/placeholder.svg', CreatedAt: '2023-07-12 10:42 AM' },
    { id: 4, Name: 'Broccoli', Status: 'archived', Description: 'jhdfdjfhdj idufidjh', ImageURL: '/placeholder.svg', CreatedAt: '2023-07-12 10:42 AM' },
    { id: 5, Name: 'Chicken', Status: 'active', Description: 'jhdfdjfhdj idufidjh', ImageURL: '/placeholder.svg', CreatedAt: '2023-07-12 10:42 AM' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = items.filter(item => {
    if (selectedCategory === 'all') {
      return true;
    }
    return item.Status === selectedCategory;
  });

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all" onValueChange={(value: string) => {
        setSelectedCategory(value);
      }}>
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
            <Button size="sm" className="h-8 gap-1" asChild>
              <div>
                <PlusCircle className="h-3.5 w-3.5" />
                <Link href={"/dashboard/item"}>Nova Peça</Link>
              </div>
            </Button>
          </div>
        </div>
        <TabsContent value={selectedCategory}>
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Description
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map(item => (
                    <TableRow>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={item.ImageURL}
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.Name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.Status}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item.Description}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item.CreatedAt}
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
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>

                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
