"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { AlbumArtwork } from "../components/album-artwork"
import { listenNowAlbums } from "../data/albums"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from 'react'

export default function LandingPage() {

    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredItems = listenNowAlbums.filter(item => {
        if (selectedCategory === 'all') {
            return true;
        }
        return item.name === selectedCategory;
    });
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
                                    placeholder="Search..."
                                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                                />
                            </div>
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
                                        {filteredItems.map((album) => (
                                            <AlbumArtwork
                                                key={album.name}
                                                album={album}
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
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" isActive>
                                        2
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">3</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </Tabs>
                </div>
            </div>
        </>
    )
}