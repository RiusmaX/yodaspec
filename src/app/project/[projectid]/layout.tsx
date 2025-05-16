function ProjectHomeLayoute ({ children }: Readonly<{ children: React.ReactNode }>): React.ReactNode {
  return (
    <main className='flex flex-col gap-{32px] row-start-2 items-center'>
      {children}
    </main>
  )
}

export default ProjectHomeLayoute
