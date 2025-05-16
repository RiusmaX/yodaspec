import { ThemeProvider } from '@/components/providers/theme-provider'
import { ToastContainer } from 'react-toastify'

function Providers ({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      // enableColorScheme
      // storageKey='theme'
      // disableTransitionOnChange
    >
      {children}
      <ToastContainer />
    </ThemeProvider>
  )
}

export default Providers
