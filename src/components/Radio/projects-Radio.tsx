'use client'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface Props {
  value: string
  onChange: (value: string) => void
}

const ProjectRadio = ({ value, onChange }: Props): React.ReactElement => {
  return (
    <RadioGroup value={value} onValueChange={onChange}>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='pdf' id='r2' />
        <Label htmlFor='r2'>PDF</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='csv' id='r3' />
        <Label htmlFor='r3'>CSV</Label>
      </div>
    </RadioGroup>
  )
}

export default ProjectRadio
