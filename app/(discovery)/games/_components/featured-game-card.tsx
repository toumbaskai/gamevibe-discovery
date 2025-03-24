"use client"

import Link from "next/link"
import Image from "next/image"
import { SelectGame } from "@/db/schema"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { ExternalLink, Gamepad2, Star } from "lucide-react"

interface FeaturedGameCardProps {
  game: SelectGame
}

export default function FeaturedGameCard({ game }: FeaturedGameCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <div className="relative aspect-video lg:w-3/5">
          <div className="absolute left-4 top-4 z-10">
            <Badge className="bg-primary text-primary-foreground">
              <Star className="mr-1 size-3 fill-current" />
              Featured
            </Badge>
          </div>
          <Image
            src={game.thumbnailUrl}
            alt={game.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="flex flex-col justify-between p-6 lg:w-2/5">
          <div className="space-y-4">
            <CardHeader className="p-0">
              <CardTitle className="line-clamp-2 text-2xl">{game.title}</CardTitle>
              <CardDescription className="mt-1">
                {game.genre && (
                  <Badge variant="outline" className="mt-1">
                    {game.genre}
                  </Badge>
                )}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-0">
              <p className="text-muted-foreground line-clamp-3">
                {game.description}
              </p>
            </CardContent>
          </div>
          
          <CardFooter className="flex-col items-start gap-2 p-0 pt-4 sm:flex-row sm:items-center">
            <Button className="w-full sm:w-auto" asChild>
              <Link href={game.externalUrl} target="_blank" rel="noopener noreferrer">
                <Gamepad2 className="mr-2 size-4" />
                Play Now
                <ExternalLink className="ml-2 size-3" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" asChild>
              <Link href={`/games/${game.id}`}>
                View Details
              </Link>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}