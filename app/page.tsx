import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { AlbumArtwork } from "./components/album-artwork"
import { Sidebar } from "./components/sidebar"
import { listenNowAlbums, madeForYouAlbums } from "./data/albums"
import { playlists } from "./data/playlists"

export default function LandingPage() {
    return (
        <>
            <div className="hidden md:block">
                <div className="border-t">
                    <div className="bg-background">
                        <div className="grid lg:grid-cols-5">
                            <Sidebar playlists={playlists} className="hidden lg:block" />
                            <div className="col-span-3 lg:col-span-4 lg:border-l">
                                <div className="h-full px-4 py-6 lg:px-8">
                                    <Tabs defaultValue="all" className="h-full space-y-6">
                                        <div className="space-between flex items-center">
                                            <TabsList>
                                                <TabsTrigger value="all" className="relative">
                                                    All
                                                </TabsTrigger>
                                                <TabsTrigger value="podcasts">
                                                    Com convite amigo
                                                </TabsTrigger>
                                            </TabsList>
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
                                                <ScrollArea>
                                                    <div className="flex space-x-4 pb-4">
                                                        {listenNowAlbums.map((album) => (
                                                            <AlbumArtwork
                                                                key={album.name}
                                                                album={album}
                                                                className="w-[250px]"
                                                                aspectRatio="portrait"
                                                                width={250}
                                                                height={330}
                                                            />
                                                        ))}
                                                    </div>
                                                    <ScrollBar orientation="horizontal" />
                                                </ScrollArea>
                                            </div>
                                            <div className="mt-6 space-y-1">
                                                <h2 className="text-2xl font-semibold tracking-tight">
                                                    Mais Peças
                                                </h2>
                                                <p className="text-sm text-muted-foreground">
                                                    Você também pode gostar
                                                </p>
                                            </div>
                                            <Separator className="my-4" />
                                            <div className="relative">
                                                <ScrollArea>
                                                    <div className="flex space-x-4 pb-4">
                                                        {madeForYouAlbums.map((album) => (
                                                            <AlbumArtwork
                                                                key={album.name}
                                                                album={album}
                                                                className="w-[150px]"
                                                                aspectRatio="square"
                                                                width={150}
                                                                height={150}
                                                            />
                                                        ))}
                                                    </div>
                                                    <ScrollBar orientation="horizontal" />
                                                </ScrollArea>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}