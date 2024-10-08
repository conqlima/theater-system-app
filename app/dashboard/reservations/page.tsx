'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState, useEffect } from 'react'
import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Reservation } from "@/app/domain/reservation"

export default function DashboardReservationPage() {

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await fetch('/api/reservation');
      const data = await response.json();
      setReservations(data);
    };

    fetchReservations();
  }, []);

  const filteredItems = reservations.filter(item => {
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
