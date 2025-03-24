"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

const genres = [
  { label: "All Genres", value: "" },
  { label: "Action", value: "action" },
  { label: "Adventure", value: "adventure" },
  { label: "Arcade", value: "arcade" },
  { label: "Casual", value: "casual" },
  { label: "Puzzle", value: "puzzle" },
  { label: "RPG", value: "rpg" },
  { label: "Simulation", value: "simulation" },
  { label: "Strategy", value: "strategy" }
]

export default function GamesFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [genre, setGenre] = useState(searchParams.get("genre") || "")
  const [sort, setSort] = useState(searchParams.get("sort") || "newest")
  
  // Create a query string from the current filters
  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      
      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === "") {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, value)
        }
      })
      
      return newSearchParams.toString()
    },
    [searchParams]
  )
  
  // Apply filters
  const applyFilters = () => {
    router.push(`/games?${createQueryString({
      search,
      genre,
      sort
    })}`);
    setFiltersVisible(false);
  }
  
  // Reset filters
  const resetFilters = () => {
    setSearch("")
    setGenre("")
    setSort("newest")
    router.push("/games")
    setFiltersVisible(false)
  }
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/games?${createQueryString({
      search,
      genre: searchParams.get("genre"),
      sort: searchParams.get("sort")
    })}`);
  }
  
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <form onSubmit={handleSearch} className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search games..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => setFiltersVisible(!filtersVisible)}
        >
          <SlidersHorizontal className="size-4" />
        </Button>
      </div>
      
      {filtersVisible && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Options</CardTitle>
          </CardHeader>
          
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Genre</label>
              <Select
                value={genre}
                onValueChange={setGenre}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre.value} value={genre.value}>
                      {genre.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Sort by</label>
              <Select
                value={sort}
                onValueChange={setSort}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sort option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={resetFilters}
            >
              <X className="mr-2 size-4" />
              Reset
            </Button>
            <Button onClick={applyFilters}>
              Apply Filters
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}