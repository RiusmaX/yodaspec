import { IProject } from '@/types/interfaces'
import ProjectCard from './project-card'

function ProjectsList({ projects }: Readonly<{ projects: IProject[] }>): React.ReactNode {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <h1 className='text-xl font-bold'>Projets</h1>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} project={project} />
        ))}
      </div>
    </div>
  )
}

export default ProjectsList
