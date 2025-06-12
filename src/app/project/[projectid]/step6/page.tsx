
import ButtonClient from '@/app/components/specification-export/button-client'
import PDFLink from '@/app/components/specification-export/pdfLink'
import { Button } from '@/components/ui/button'
import { adaptData } from '@/db/services/CSV/adapte-data'
import { ProjectCSV } from '@/db/services/CSV/project-CSV'
import { getOneProject } from '@/db/services/project-service'
import { Table } from 'lucide-react'
import { redirect } from 'next/navigation'

async function Step6(props: Readonly<{ params: Promise<{ projectId: string }> }>): Promise<React.ReactNode> {

  const { projectId } = await props.params

  const project = await getOneProject(projectId)


  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen'>
      <h2 className='text-2xl font-bold m-2 w-full text-center'>Choisis ton format pour l'export</h2>
      <div className='flex flex-row justify-center items-center'>
        {project !== null && project.step5 !== undefined &&
          <>
            <PDFLink features={project.step5} />
            <ButtonClient features={project.step5} />

          </>}
      </div>
    </div >
  )
}

export default Step6
