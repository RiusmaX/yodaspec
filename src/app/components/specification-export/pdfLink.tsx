'use client'

import DocumentPDF from '@/app/components/specification-export/document/document-pdf'
import { Button } from '@/components/ui/button'
import { dataExemple } from '@/data-exemple/data'
import { getOneProject } from '@/db/services/project-service'
import { IFeature, IProject } from '@/types/interfaces'
import { get } from 'http'
import { File, Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'

const PDFDownloadLink = dynamic(
  async () => await import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => (<Loader2 className='animate-spin m-1' />)
  }
)

function PDFLink({ features }: { features: IFeature[] }): React.ReactNode {

  if (features !== undefined) {
    return (
      <PDFDownloadLink document={<DocumentPDF features={features} />} fileName='Specifications.pdf'>
        <Button className='m-1 hover:cursor-pointer'><File className='m-r-1' />PDF</Button>
      </PDFDownloadLink>
    )
  }
}

export default PDFLink
