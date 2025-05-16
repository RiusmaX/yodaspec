function ProjectHomeLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <main className='flex flex-col h-full'>
      {children}
    </main>
  )
}

export default ProjectHomeLayout
