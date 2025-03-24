"use server"

import { Suspense } from "react"
import { getGamesAction } from "@/actions/db/games-actions"
import GamesFilter from "./_components/games-filter"
import GamesGrid from "./_components/games-grid"
import FeaturedGameCard from "./_components/featured-game-card"
import { Gamepad2 } from "lucide-react"

// Games page loader component
async function GamesLoader({
  searchParams
}: {
  searchParams: { search?: string; genre?: string; sort?: string }
}) {
  // Get games with filters
  const sortOrder = searchParams.sort === "oldest" ? "asc" : "desc"
  const { data: games = [] } = await getGamesAction({
    submissionStatus: "approved",
    // Add filters based on searchParams
    // Note: This is a simplified implementation - the actual filters
    // would need to be implemented in the getGamesAction function
  })

  // Filter games based on search and genre if provided
  const filteredGames = games.filter(game => {
    // Filter by search term
    if (searchParams.search) {
      const searchLower = searchParams.search.toLowerCase()
      if (
        !game.title.toLowerCase().includes(searchLower) &&
        !game.description.toLowerCase().includes(searchLower)
      ) {
        return false
      }
    }

    // Filter by genre
    if (searchParams.genre && game.genre !== searchParams.genre) {
      return false
    }

    return true
  })

  // Sort games based on the sort parameter
  const sortedGames = [...filteredGames].sort((a, b) => {
    if (searchParams.sort === "popular") {
      // For now, we'll just sort by newest as a fallback
      // In a real implementation, we would need to add a popularity metric to the games schema
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return dateB - dateA
    }
    
    // Sort by date (newest or oldest)
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA
  })

  // Get featured game (for now, just take the first game if available)
  const featuredGame = games.length > 0 ? games[0] : null

  return (
    <>
      {/* Show featured game only on first page with no filters active */}
      {!searchParams.search && !searchParams.genre && featuredGame && (
        <div className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">Featured Game</h2>
          <FeaturedGameCard game={featuredGame} />
        </div>
      )}

      {/* Display filtered games */}
      <GamesGrid games={sortedGames} />
    </>
  )
}

export default async function GamesPage({
  searchParams
}: {
  searchParams: { search?: string; genre?: string; sort?: string }
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <Gamepad2 className="size-8 text-primary" />
          Discover Games
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          Explore our collection of browser games created by independent developers.
          Use the filters to find games by genre or search for specific titles.
        </p>
      </div>

      <GamesFilter />

      <Suspense
        fallback={
          <div className="grid h-[50vh] w-full place-items-center rounded-md border border-dashed">
            <div className="flex flex-col items-center gap-2">
              <div className="size-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
              <p className="text-muted-foreground text-sm">Loading games...</p>
            </div>
          </div>
        }
      >
        <GamesLoader searchParams={searchParams} />
      </Suspense>
    </div>
  )
}