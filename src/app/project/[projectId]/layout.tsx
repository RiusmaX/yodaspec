function ProjectHomeLayout ({ children }: Readonly<{ children: React.ReactNode }>): React.ReactNode {
  return (
    <main className='flex flex-col gap-[32px] row-start-2 items-center max-w-[1080px] p-6 mx-auto'>
      {children}
    </main>
  )
}

export default ProjectHomeLayout
