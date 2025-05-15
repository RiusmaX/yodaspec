import { ThemeProvider } from '@/components/providers/theme-provider'
import { ToastContainer } from 'react-toastify'

function Providers ({ children }: Readonly<{ children: React.ReactNode }>): React.ReactElement {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
    >
      {children}
      <ToastContainer />
    </ThemeProvider>
  )
}

export default Providers
