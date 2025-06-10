'use client'
import { IFeature } from '@/types/interfaces'
import { ScrollArea } from '../ui/scroll-area'
import FeatureCardSkeleton from '../skeletons/feature-card-skeleton'
import { useMemo, useState } from 'react'
import ValidationBar from '../validation/validation-bar'
import { sendFeatureSelection } from '@/lib/api/features'

function FeaturesList ({ projectId, features }: Readonly<{ projectId: string, features: IFeature[] }>): React.ReactNode {
  const [selected, setSelected] = useState<Record<string, boolean>>(
    Object.fromEntries(features.map(f => [f._id, true]))
  )
  // Initial features can be set to true or false based on your requirements
  const toggle = (id: string): void => {
    setSelected(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const selection = useMemo(
    () => features.filter(f => selected[f._id]),
    [selected, features]
  )

  return (
    <div className='flex flex-col gap-4'>
      <ScrollArea className='h-[80hv]'>
        {features.map(feature => (
          <FeatureCardSkeleton
            key={feature._id}
            feature={feature}
            checked={selected[feature._id]}
            onCheckedChange={() => toggle(feature._id)}
          />

        ))}
      </ScrollArea>
      <ValidationBar disabled={selection.length === 0} onValidate={async () => await sendFeatureSelection(selection)} />
    </div>
  )
}

export default FeaturesList
