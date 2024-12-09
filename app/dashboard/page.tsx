'use client'
import {
  PlusCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { DataTable } from "@/components/ui/data-table"
import { Play } from "../../domain/play"
import { columns } from "./columns"


export default function Dashboard() {

  const [plays, setPlays] = useState<Play[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchPlays = async () => {
      const response = await fetch('/api/play');
      const data = await response.json();
      setPlays(data);
    };

    fetchPlays();
  }, []);

  const filteredItems = plays.filter(item => {
    if (selectedCategory === 'all') {
      return true;
    }
    return item.status === selectedCategory;
  });

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all" onValueChange={(value: string) => {
        setSelectedCategory(value)
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
            <Button size="sm" className="h-8 gap-1" asChild>
              <div>
                <PlusCircle className="h-3.5 w-3.5" />
                <Link href={"/dashboard/play"}>Nova Peça</Link>
              </div>
            </Button>
          </div>
        </div>
        <TabsContent value={selectedCategory}>
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Peças</CardTitle>
              <CardDescription>
                Crie, delete ou arquive suas peças aqui
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={filteredItems} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
