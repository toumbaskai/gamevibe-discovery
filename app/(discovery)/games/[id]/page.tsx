"use server"

import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getGameByIdAction } from "@/actions/db/games-actions"
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent,
  CardDescription,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, ArrowLeft, Calendar, Info, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// The game detail component with data fetching
async function GameDetail({ id }: { id: string }) {
  const { isSuccess, data } = await getGameByIdAction(id)
  
  if (!isSuccess || !data || data.game.submissionStatus !== "approved") {
    notFound()
  }
  
  const { game, screenshots } = data
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div>
          <Link href="/games" className="text-muted-foreground mb-2 inline-flex items-center hover:underline">
            <ArrowLeft className="mr-2 size-4" />
            Back to games
          </Link>
          <h1 className="text-3xl font-bold">{game.title}</h1>
        </div>

        <Button size="lg" className="gap-2 text-base" asChild>
          <Link href={game.externalUrl} target="_blank" rel="noopener noreferrer">
            <Gamepad2 className="size-5" />
            Play Game
            <ExternalLink className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div className="overflow-hidden rounded-lg border">
            <div className="relative aspect-video w-full">
              <Image
                src={game.thumbnailUrl}
                alt={game.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">About</h2>
                  <p className="text-muted-foreground mt-2">
                    {game.description}
                  </p>
                </div>

                {game.aiToolsUsed && (
                  <div>
                    <h3 className="font-medium">AI Tools Used</h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {game.aiToolsUsed}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {screenshots.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Screenshots</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {screenshots.map((screenshot) => (
                  <div
                    key={screenshot.id}
                    className="relative aspect-video overflow-hidden rounded-md border"
                  >
                    <Image
                      src={screenshot.url}
                      alt={screenshot.altText || "Game screenshot"}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold">Game Info</h3>
              
              <div className="mt-4 space-y-3">
                {game.genre && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center text-sm">
                      <Info className="mr-2 size-4" />
                      Genre
                    </span>
                    <Badge variant="outline">{game.genre}</Badge>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center text-sm">
                    <Calendar className="mr-2 size-4" />
                    Release Date
                  </span>
                  <span className="text-sm">
                    {new Date(game.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <CardTitle className="text-lg">Play Now</CardTitle>
              <CardDescription className="mt-1">
                Click the button below to play this game in your browser
              </CardDescription>
              
              <Button className="mt-4 w-full gap-2" asChild>
                <Link href={game.externalUrl} target="_blank" rel="noopener noreferrer">
                  <Gamepad2 className="size-4" />
                  Play Game
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default async function GamePage({ params }: { params: { id: string }}) {
  return (
    <Suspense
      fallback={
        <div className="grid h-[50vh] w-full place-items-center rounded-md border border-dashed">
          <div className="flex flex-col items-center gap-2">
            <div className="size-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
            <p className="text-muted-foreground text-sm">Loading game details...</p>
          </div>
        </div>
      }
    >
      <GameDetail id={params.id} />
    </Suspense>
  )
}