'use client'
import { useRouter } from 'next/navigation'
 
// Composant permettant de revenir à la page précédente
export default function BackButton() {
  // Récupère l'objet router de Next.js pour la navigation côté client
  const router = useRouter()
  return (
    // Bouton qui appelle router.back() au clic pour revenir en arrière
    <button
      onClick={() => router.back()}
      className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
    >
      ←
    </button>
  )
}