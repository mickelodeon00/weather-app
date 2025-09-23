import { Cloud } from 'lucide-react'
import './App.css'

import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-4 rounded-full bg-primary/10 shadow-lg">
              <Cloud className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Weather Forecast
            </h1>
          </div>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Get real-time weather information for any city around the world.
            <br />
            <span className="font-semibold text-primary">
              Enter a city name to see current conditions with visual interpretation.
            </span>
          </p>
        </header>

        <main>
          <Outlet />
        </main>

        <footer className="text-center mt-20 pt-8 border-t border-border/50">
          <p className="text-muted-foreground">
            Weather data with visual interpretation • Built with React & TypeScript
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App