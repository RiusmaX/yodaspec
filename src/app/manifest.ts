import type { MetadataRoute } from 'next'

export default function manifest (): MetadataRoute.Manifest {
  return {
    name: 'YodaSpecs',
    short_name: 'Yoda',
    description: 'A Progressive Web App built for generating specifications for projects.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/favicon.ico',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}
