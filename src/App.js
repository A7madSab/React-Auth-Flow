import React from "react"
import Navigation from "./navigation"
import { AuthProvider } from "./contexts/JWTAuthContext"

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  )
}

export default App
