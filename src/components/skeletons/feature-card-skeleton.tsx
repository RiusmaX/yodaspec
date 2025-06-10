import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { IFeature } from '@/types/interfaces'
import { Checkbox } from '../ui/checkbox'
import { Check, X } from 'lucide-react'

export default function FeatureCardSkeleton ({ feature, checked, onCheckedChange }: { feature: IFeature, checked: boolean, onCheckedChange: () => void }): React.ReactNode {
  return (
    <Card className='flex items-start gap-4'>
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <div className='flex-1'>
        <CardHeader className='text-lg font-semibold'>
          {feature.name}
        </CardHeader>
        <CardContent className='text-sm text-muted-foreground'>
          {feature.description}
        </CardContent>
      </div>
      {checked ? <Check className='text-green-500' /> : <X className='text-destructive' />}
    </Card>
  )
}

export {
  FeatureCardSkeleton
}
