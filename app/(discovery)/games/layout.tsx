"use server"

import { NavbarDashboard } from "@/components/ui/navbar-dashboard"

export default async function GamesLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full">
      <NavbarDashboard />
      <main className="container py-6">
        {children}
      </main>
    </div>
  )
}