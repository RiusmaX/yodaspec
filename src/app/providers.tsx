import { ThemeProvider } from '@/components/providers/theme-provider'
import React from 'react'
import { ToastContainer } from 'react-toastify'

export default function Providers ({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem
    >
      {children}
      <ToastContainer />
    </ThemeProvider>
  )
}
