function ProjectHomeLayout ({ children }: Readonly<{ children: React.ReactNode }>): React.ReactNode {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      {children}
    </main>
  )
}

export default ProjectHomeLayout
