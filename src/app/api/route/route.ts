import { NextResponse } from 'next/server'
import { getFeatures } from '@/db/services/feature-service'

export async function GET (request: Request): Promise<NextResponse> {
  console.log('API /api/features appelée')

  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')

    console.log('projectId reçu dans API:', projectId)

    if (projectId === null) {
      console.log('projectId manquant, on retourne une 400')
      return NextResponse.json(
        { error: 'projectId manquant' },
        { status: 400 }
      )
    }

    // Additional validation if needed
    if (projectId.trim() === '') {
      return NextResponse.json(
        { error: 'projectId ne peut pas être vide' },
        { status: 400 }
      )
    }

    const features = await getFeatures(projectId)
    console.log('Features récupérées:', features.length)

    return NextResponse.json({
      success: true,
      data: features,
      count: features.length
    })
  } catch (error) {
    console.error('Erreur serveur:', error)
    return NextResponse.json(
      {
        error: 'Erreur serveur',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
