// lib/api/features.ts
import { IFeature } from '@/types/interfaces'

const sendFeatureSelection = async (selection: IFeature[]): Promise<void> => {
  const res = await fetch('/api/features/selection', {
    method: 'POST',
    body: JSON.stringify({ features: selection }),
    headers: { 'Content-Type': 'application/json' }
  })

  if (!res.ok) {
    throw new Error('Network error')
  }
}
export {
  sendFeatureSelection
}
