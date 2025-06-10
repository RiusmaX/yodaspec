import FeaturesList from '@/components/lists/features-list'
import { getFeatures } from '@/db/services/features-service'

async function ProjectFeaturesPage (props: Readonly<{ params: Promise<{ projectId: string }> }>): Promise<React.ReactNode> {
  const initialFeatures = await getFeatures()
  const features = initialFeatures.map(f => ({
    ...f,
    _id: f._id.toString()
    /* createdAt: (f.createdAt != null) ? f.createdAt.toString() : undefined,
    updatedAt: (f.updatedAt != null) ? f.updatedAt.toString() : undefined
    */
  }))
  return (
    <FeaturesList
      projectId={await props.params.then(p => p.projectId)}
      features={features}
    />
  )
}
export default ProjectFeaturesPage
