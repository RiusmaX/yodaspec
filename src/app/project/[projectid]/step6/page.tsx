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
