"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { AlbumArtwork } from "./album-artwork"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from 'react'
import { CalendarDateRangePicker } from "./date-range-picker"
import { addDays } from "date-fns"
import { DateRange } from "react-day-picker"
import { Play } from "../../domain/play"
import { PaginationComponent } from "./pagination"

export default function LandingPage() {

    const [plays, setPlays] = useState<Play[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 20),
    })

    useEffect(() => {
        const fetchItems = async (page: number) => {
            const res = await fetch(`/api/play?page=${page}`);
            const data: PaginatedData<Play> = await res.json();
            setPlays(data.items);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
        };

        fetchItems(currentPage);

    }, [currentPage]);

    const filteredItems = plays
        .filter(item => {
            if (selectedCategory === 'all') {
                return true;
            }
            return item.name === selectedCategory;
        })
        .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                    <Tabs defaultValue="all" className="h-full space-y-6" onValueChange={(value: string) => {
                        setSelectedCategory(value)
                    }}>
                        <div className="space-between flex items-center">
                            <TabsList>
                                <TabsTrigger value="all" className="relative">
                                    All
                                </TabsTrigger>
                                <TabsTrigger value="podcasts">
                                    Com convite amigo
                                </TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <Input
                                    type="search"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Search..."
                                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                                />
                            </div>
                            <CalendarDateRangePicker date={date} setDate={setDate} />
                        </div>
                        <TabsContent
                            value="all"
                            className="border-none p-0 outline-none"
                        >
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-semibold tracking-tight">
                                        Peças
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Mais procuradas
                                    </p>
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="relative">
                                <ScrollArea className="h-85 rounded-md">
                                    <div className="grid grid-cols-4 gap-4">
                                        {filteredItems.map((item) => (
                                            <AlbumArtwork
                                                key={item.id}
                                                album={item}
                                                className="w-[200px]"
                                                aspectRatio="portrait"
                                                width={250}
                                                height={330}
                                            />
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>
                        </TabsContent>
                        <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </Tabs>
                </div>
            </div>
        </>
    )
}