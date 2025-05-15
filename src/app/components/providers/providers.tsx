import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from './theme-provider'

function Providers ({ children }: { children: React.ReactNode }): React.ReactElement {
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
