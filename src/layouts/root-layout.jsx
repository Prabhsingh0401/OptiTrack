import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import './root-layout.scss'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      <header className="header">
        <div className='navbar'>
          <div>
            <h1>OptiTrack</h1>
          </div>
          <div className='nav-items'>
              <p Link to='#'>Home</p>
              <p Link to='#'>About</p>
              <p Link to='#'>Dashboard</p>
          </div>
          <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
              <button><Link to="/sign-in">Sign in</Link></button>
          </SignedOut>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </ClerkProvider>
    
  )
}