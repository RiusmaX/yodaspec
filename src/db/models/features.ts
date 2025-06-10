
import { IFeature } from '@/types/interfaces'
import mongoose, { Schema } from 'mongoose'

const FeatureSchema = new Schema<IFeature>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Feature = mongoose.models.Project !== undefined ? mongoose.models.Project : mongoose.model<IFeature>('Project', FeatureSchema)

export default Feature
