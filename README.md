# GameVibe Discovery Module

A Next.js-based game discovery platform for GameVibe, allowing users to browse, filter, and play browser-based games.

## Features

- Game discovery with filtering and search
- Featured game showcase
- Detailed game pages with information and screenshots
- Responsive design for all device sizes
- Genre-based filtering and sorting

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Shadcn/UI
- **Backend**: Supabase, Drizzle ORM, Server Actions
- **Authentication**: Clerk

## Components

### Game Discovery Page

- Showcases featured games
- Provides search and filtering functionality
- Displays games in a responsive grid layout

### Game Detail Page

- Shows comprehensive game information
- Displays screenshots
- Provides direct play options
- Shows game metadata (genre, release date, etc.)

## UI Components

- **GamesGrid**: Responsive grid layout for game cards
- **GamesFilter**: Search and filtering interface
- **FeaturedGameCard**: Highlight featured games

## Integration with GameVibe Platform

This module is part of the larger GameVibe platform, integrating with:

- User authentication system
- Game submission and management processes
- Admin review workflow

## Development

To set up the development environment:

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## License

MIT