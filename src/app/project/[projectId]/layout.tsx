function ProjectHomeLayout ({ children }: Readonly<{ children: React.ReactNode }>): React.ReactNode {
  return (
    <div className='flex flex-col gap-[32px] row-start-2 items-denter'>
      {children}
    </div>
  )
}
export default ProjectHomeLayout
