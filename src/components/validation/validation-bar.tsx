/* ValidationBar.tsx */
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import type { JSX } from 'react'

export default function ValidationBar ({
  disabled, onValidate
}: {
  disabled: boolean
  onValidate: () => Promise<void> | void
}): JSX.Element {
  const handleClick = (): void => {
    void (async () => {
      try {
        await onValidate()
        toast.success('Succès', { description: 'Fonctionnalités enregistrées.' })
      } catch {
        toast.error('Erreur', { description: "Impossible d'enregistrer." })
      }
    })()
  }

  return (
    <Button className='w-32' disabled={disabled} onClick={handleClick}>
      Valider
    </Button>
  )
}
