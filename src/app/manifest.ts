import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'YodaSPecs',
    short_name: 'YodaSpecs',
    description: 'Créé tes specs sans efforts',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: 'YodaSpecs.jpg',
        sizes: 'any',
      }
    ],
  }
}