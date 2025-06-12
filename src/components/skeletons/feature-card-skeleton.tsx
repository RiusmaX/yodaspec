import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { IFeature } from '@/types/interfaces'
import { Checkbox } from '../ui/checkbox'
import { useState } from 'react'

export default function FeatureCardSkeleton (
  { feature, checked, onCheckedChange, onEdit }: { feature: IFeature, checked: boolean, onCheckedChange: () => void, onEdit: (newFeature: { feature: string, description: string }) => void }): React.ReactNode {
  const [isEditing, setIsEditing] = useState(false)
  const [editValues, setEditValues] = useState({ feature: feature.feature, description: feature.description })

  const handleSave = (): void => {
    setIsEditing(false)
    onEdit(editValues)
  }
  return (
    <Card className={`flex flex-row px-4 items-center gap-4 transition-opacity relative ${!checked ? 'opacity-50 ' : ''}`}>
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <div className='flex-1'>
        {isEditing
          ? (
            <>
              <div className='flex flex-col items-end mb-2'>
                <input
                  className='font-semibold border rounded px-2 py-1 mb-1 w-full'
                  value={editValues.feature}
                  onChange={e => setEditValues(v => ({ ...v, feature: e.target.value }))}
                />
                <textarea
                  className='text-xs border rounded px-2 py-1 w-full h-fit'
                  value={editValues.description}
                  onChange={e => setEditValues(v => ({ ...v, description: e.target.value }))}
                />
                <button className='text-end text-xs text-white mt-1' onClick={handleSave}>Enregistrer</button>
              </div>
            </>
            )
          : (
            <>
              <CardHeader className='text-sm font-semibold'>{feature.feature}</CardHeader>
              <CardContent className='text-xs text-muted-foreground'>{feature.description}</CardContent>
            </>
            )}
      </div>
      <button
        type='button'
        className='absolute top-2 right-2 p-1 rounded hover:bg-accent transition-colors'
        aria-label='Modifier'
        onClick={() => setIsEditing(!isEditing)}
      >
        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
          <path d='M12 20h9' />
          <path d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z' />
        </svg>
      </button>
    </Card>
  )
}

export {
  FeatureCardSkeleton
}
