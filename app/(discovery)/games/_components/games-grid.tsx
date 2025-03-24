"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SelectGame } from "@/db/schema"

interface GamesGridProps {
  games: SelectGame[]
}

export default function GamesGrid({ games }: GamesGridProps) {
  if (games.length === 0) {
    return (
      <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
        <h3 className="text-xl font-semibold">No games found</h3>
        <p className="text-muted-foreground mt-2 max-w-sm">
          Try adjusting your search or filter criteria to find games.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {games.map((game) => (
        <Link key={game.id} href={`/games/${game.id}`}>
          <Card className="h-full overflow-hidden transition-all hover:shadow-md">
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={game.thumbnailUrl}
                alt={game.title}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            
            <CardContent className="p-4">
              <h3 className="line-clamp-1 text-lg font-semibold">{game.title}</h3>
              <p className="text-muted-foreground line-clamp-2 mt-2 text-sm">
                {game.description}
              </p>
            </CardContent>
            
            <CardFooter className="flex items-center justify-between p-4 pt-0">
              {game.genre && (
                <Badge variant="outline">{game.genre}</Badge>
              )}
              <span className="text-muted-foreground text-sm">
                {new Date(game.createdAt).toLocaleDateString()}
              </span>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}