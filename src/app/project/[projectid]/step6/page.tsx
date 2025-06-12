// 'use client'

// import { Button } from '@/components/ui/button'
// import { FileDown } from 'lucide-react'
// import { ProjectCSV } from '@/db/services/CSV/project-CSV'
// import { data } from '@/db/Data-example/data-example'
// import React, { useState } from 'react'
// import { adaptData } from '@/db/services/CSV/adapte-data'
// import ProjectRadio from '@/components/Radio/projects-Radio'

// function Step6 (): React.ReactElement {
//   const [isExporting, setIsExporting] = useState(false)
//   const [exportFormat, setExportFormat] = useState('csv')

//   const handleClick = async (): Promise<void> => {
//     setIsExporting(true)
//     try {
//       if (exportFormat === 'csv') {
//         const adapted = adaptData(data)
//         await ProjectCSV(adapted)
//       } else {
//         console.log('PDF export à faire')
//       }
//     } finally {
//       setIsExporting(false)
//     }
//   }

//   return (
//     <div>
//       <h1 className='text-2xl font-bold'>Step 6</h1>
//       <div className='text-sm text-muted-foreground'>
//         <div className='grid grid-cols-4 items-center gap-4'>
//           <ProjectRadio value={exportFormat} onChange={setExportFormat} />

//           <Button
//             variant='outline'
//             disabled={isExporting}
//             onClick={() => { void handleClick() }}
//           >
//             <FileDown className='mr-2 h-4 w-4' /> {isExporting ? 'Export...' : 'Exporter'}
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Step6
'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { usePathname, redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FileDown } from 'lucide-react'
import { ProjectCSV } from '@/db/services/CSV/project-CSV'
import { adaptData } from '@/db/services/CSV/adapte-data'
import ProjectRadio from '@/components/Radio/projects-Radio'
import { Ifeature } from '@/types/interfaces'
import Loading from '../loading'

interface ApiResponse {
  success: boolean
  data: Ifeature[]
  count: number
}

function Step6 (): React.ReactElement {
  const [features, setFeatures] = useState<Ifeature[]>([])
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState('csv')
  const pathname = usePathname()

  useEffect(() => {
    const match = pathname.match(/project\/([^/]+)\/step6/)
    const projectId = match?.[1]

    if (typeof projectId === 'string' && projectId.trim() !== '') {
      void fetchFeatures(projectId)
    }
  }, [pathname])

  const fetchFeatures = async (projectId: string): Promise<void> => {
    if (exportFormat !== 'csv') return
    try {
      const res = await fetch(`/api/route?projectId=${encodeURIComponent(projectId)}`)
      const response: ApiResponse = await res.json()

      if (!res.ok || !response.success) {
        console.error('Erreur de récupération des features')
        setFeatures([])
        return
      }

      setFeatures(response.data ?? [])
    } catch (err) {
      console.error('Erreur lors du fetch des features :', err)
      setFeatures([])
    }
  }

  const handleClick = async (): Promise<void> => {
    setIsExporting(true)
    try {
      if (exportFormat === 'csv') {
        const adapted = adaptData(features)
        await ProjectCSV(adapted)
        redirect('/')
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
            disabled={isExporting || features.length === 0}
            onClick={() => { void handleClick() }}
          >
            <FileDown className='mr-2 h-4 w-4' />
            {isExporting ? 'Export...' : 'Exporter'}
          </Button>
        </div>
        <Suspense fallback={<Loading />}>
          <p className='mt-2 text-xs'>Features trouvées : {features.length}</p>
        </Suspense>
      </div>
    </div>
  )
}

export default Step6
