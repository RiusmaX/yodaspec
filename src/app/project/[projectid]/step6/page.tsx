'use client'

import { Button } from '@/components/ui/button'
import { FileDown } from 'lucide-react'
import { ProjectCSV } from '@/db/services/CSV/project-CSV'
import { data } from '@/db/Data-example/data-example'
import React, { useState } from 'react'
import { adaptData } from '@/db/services/CSV/adapte-data'
import ProjectRadio from '@/components/Radio/projects-Radio'

function Step6 (): React.ReactElement {
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState('csv')

  const handleClick = async (): Promise<void> => {
    setIsExporting(true)
    try {
      if (exportFormat === 'csv') {
        const adapted = adaptData(data)
        await ProjectCSV(adapted)
      } else {
        console.log('PDF export à faire')
      }
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>Step 6</h1>
      <div className='text-sm text-muted-foreground'>
        <div className='grid grid-cols-4 items-center gap-4'>
          <ProjectRadio value={exportFormat} onChange={setExportFormat} />

          <Button
            variant='outline'
            disabled={isExporting}
            onClick={() => { void handleClick() }}
          >
            <FileDown className='mr-2 h-4 w-4' /> {isExporting ? 'Export...' : 'Exporter'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Step6

// 'use client'

// import { useEffect, useState } from 'react'
// import { usePathname } from 'next/navigation'
// import { Button } from '@/components/ui/button'
// import { FileDown } from 'lucide-react'
// import { ProjectCSV } from '@/db/services/CSV/project-CSV'
// import { adaptData } from '@/db/services/CSV/adapte-data'
// import ProjectRadio from '@/components/Radio/projects-Radio'
// import { Ifeature } from '@/types/interfaces'

// interface ApiResponse {
//   success: boolean
//   data: Ifeature[]
//   count: number
// }

// interface ApiErrorResponse {
//   error: string
// }

// function Step6 (): React.ReactElement {
//   const [isExporting, setIsExporting] = useState(false)
//   const [exportFormat, setExportFormat] = useState('csv')
//   const [features, setFeatures] = useState<Ifeature[]>([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const pathname = usePathname()

//   useEffect(() => {
//     const match = pathname.match(/project\/([^/]+)\/step6/)
//     const projectId = match?.[1]

//     // Fix: Explicit check for undefined
//     if (projectId != null && projectId !== '') {
//       void fetchFeatures(projectId)
//     }
//   }, [pathname])

//   const fetchFeatures = async (projectId: string): Promise<void> => {
//     setLoading(true)
//     setError(null)

//     try {
//       const res = await fetch(`/api/features?projectId=${encodeURIComponent(projectId)}`)

//       if (!res.ok) {
//         // Fix: Proper typing for error response
//         const errorData: ApiErrorResponse = await res.json().catch(() => ({ error: 'Unknown error' }))
//         throw new Error(`Erreur API: ${res.status} - ${errorData.error ?? res.statusText}`)
//       }

//       const response: ApiResponse = await res.json()
//       console.log('Données reçues depuis la BDD:', response.data)

//       // Fix: Use nullish coalescing instead of logical OR
//       setFeatures(response.data ?? [])
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue'
//       console.error('Erreur lors du fetch des features:', errorMessage)
//       setError(errorMessage)
//       setFeatures([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleClick = async (): Promise<void> => {
//     if (features.length === 0) {
//       console.warn('Aucune feature à exporter')
//       return
//     }

//     setIsExporting(true)
//     try {
//       if (exportFormat === 'csv') {
//         const adapted = adaptData(features)
//         await ProjectCSV(adapted)
//       } else {
//         console.log('PDF export à faire')
//       }
//     } catch (error) {
//       console.error('Erreur lors de l\'export:', error)
//       setError('Erreur lors de l\'export')
//     } finally {
//       setIsExporting(false)
//     }
//   }

//   return (
//     <div>
//       <h1 className='text-2xl font-bold'>Step 6</h1>
//       <div className='text-sm text-muted-foreground'>
//         {error != null && error !== '' && (
//           <div className='mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded'>
//             Erreur: {error}
//           </div>
//         )}

//         {loading && (
//           <div className='mb-4 p-2 bg-blue-100 border border-blue-400 text-blue-700 rounded'>
//             Chargement des features...
//           </div>
//         )}

//         <div className='mb-4'>
//           <p>Features trouvées: {features.length}</p>
//         </div>

//         <div className='grid grid-cols-4 items-center gap-4'>
//           <ProjectRadio value={exportFormat} onChange={setExportFormat} />

//           <Button
//             variant='outline'
//             disabled={isExporting || loading || features.length === 0}
//             onClick={() => {
//               void handleClick()
//             }}
//           >
//             <FileDown className='mr-2 h-4 w-4' />
//             {isExporting ? 'Export...' : 'Exporter'}
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Step6
