// app/api/features/selection/route.ts
import { NextResponse } from 'next/server'
import { updateSelectedFeatures } from '@/db/services/features-service'

export async function POST (req: Request): Promise<NextResponse> {
  try {
    const { features } = await req.json() // [{ id, name, … }]
    await updateSelectedFeatures(features) // côté DB
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
