'use client'
import { defineStepper } from '@stepperize/react'
import { Button } from './ui/button'
import React, { useEffect } from 'react'
import { Separator } from './ui/separator'
import { projectSteps } from '@/config/constants'

const { useStepper, steps, utils } = defineStepper(...projectSteps)

function Stepper ({ stepId, onNext, onPrev, onReset }: Readonly<{ stepId?: 'step1' | 'step2' | 'step3' | 'step4' | 'step5' | 'step6', onNext?: () => void, onPrev?: () => void, onReset?: () => void }>): React.ReactNode {
  const stepper = useStepper({ initialStep: stepId })

  useEffect(() => {
    stepId !== undefined && stepper.goTo(stepId)
  }, [stepId])

  const currentIndex = utils.getIndex(stepper.current.id)

  const handleNext = (): void => {
    stepper.next()
    onNext?.()
  }

  const handlePrev = (): void => {
    stepper.prev()
    onPrev?.()
  }

  const handleReset = (): void => {
    stepper.reset()
    onReset?.()
  }

  return (
    <div className='space-y-6 p-6 rounded-lg'>
      <div className='flex justify-between'>
        <h2 className='text-lg font-medium'>Progression du projet</h2>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-muted-foreground'>
            Etape {currentIndex + 1} sur {steps.length}
          </span>
          <div />
        </div>
        <div className='space-y-4'>
          {!stepper.isLast
            ? (
              <div className='flex justify-end gap-4'>
                <Button
                  variant='secondary'
                  onClick={handlePrev}
                  disabled={stepper.isFirst}
                >
                  Précédent
                </Button>
                <Button onClick={handleNext}>
                  {stepper.isLast ? 'Terminer' : 'Suivant'}
                </Button>
              </div>
              )
            : (
              <Button onClick={handleReset}>Réinitialiser</Button>
              )}
        </div>
      </div>
      <nav aria-label='Checkout Steps' className='group my-4'>
        <ol
          className='flex items-center justify-between gap-2'
        >
          {stepper.all.map((step, index, array) => (
            <React.Fragment key={step.id}>
              <li className='flex items-center gap-4 flex-shrink-0'>
                <Button
                  type='button'
                  role='tab'
                  variant={index <= currentIndex ? 'default' : 'secondary'}
                  aria-current={
                  stepper.current.id === step.id ? 'step' : undefined
                }
                  aria-posinset={index + 1}
                  aria-setsize={steps.length}
                  aria-selected={stepper.current.id === step.id}
                  className='flex size-10 items-center justify-center rounded-full'
                  onClick={() => stepper.goTo(step.id)}
                >
                  {index + 1}
                </Button>
                <span className='text-sm font-medium'>{step.title}</span>
              </li>
              {index < array.length - 1 && (
                <Separator
                  className={`flex-1 ${
                  index < currentIndex ? 'bg-primary' : 'bg-muted'
                }`}
                />
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>

    </div>
  )
}

export default Stepper
