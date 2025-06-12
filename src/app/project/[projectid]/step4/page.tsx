// app/project/[projectid]/step4/page.tsx

import Step4Validation from '@/components/step4/step-4-validation'

export default async function Step4Page ({ params }: { params: { projectid: string } }): Promise<React.ReactElement> {
  const projectId = await params.projectid

  return (
    <Step4Validation projectId={projectId} />
  )
}
