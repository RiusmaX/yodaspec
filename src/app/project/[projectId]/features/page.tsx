import FeaturesList from '@/components/lists/features-list'
import { getFeatures } from '@/db/services/features-service'
import { ClientFeature } from '@/types/interfaces'

async function ProjectFeaturesPage (props: Readonly<{ params: Promise<{ projectId: string }> }>): Promise<React.ReactNode> {
  const initialFeatures = (await getFeatures()) ?? []

  // On génère un _id string unique pour chaque feature côté client
  const features: ClientFeature[] = initialFeatures.map((f, idx) => ({
    feature: f.feature,
    description: f.description,
    _id: String(idx) // index comme fallback unique
  }))
  const projectId = await props.params.then(p => p.projectId)

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>Fonctionnalités du projet</h1>
      <p className='text-gray-600'>Sélectionnez les fonctionnalités à activer pour ce projet.</p>
      <FeaturesList
        projectId={projectId}
        features={features}
      />
    </div>
  )
}
export default ProjectFeaturesPage
