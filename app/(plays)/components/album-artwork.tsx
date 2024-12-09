import Image from "next/image"
import { cn } from "@/lib/utils"
import Link from 'next/link'
import { Play } from "@/domain/play"

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Play
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function AlbumArtwork({
  album,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <Link href={`/play/${album.id}`}>
          <Image
            src={album.imageURL}
            alt={album.name}
            width={width}
            height={height}
            className={cn(
              "h-auto w-auto object-cover transition-all hover:scale-105",
              aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
            )}
          />
        </Link>
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{album.name}</h3>
        <p className="text-xs text-muted-foreground">{album.status}</p>
      </div>
    </div>
  )
}