import { MetadataRoute } from 'next'

export default function manifest (): MetadataRoute.Manifest {
  return {
    name: 'Yodaspec',
    short_name: 'Yodaspec',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      { src: '/favicon.ico', sizes: 'any' }
    ]
  }
}
