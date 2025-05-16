
import { IFeature } from '@/types/interfaces'
import mongoose, { Schema } from 'mongoose'

const FeatureSchema = new Schema<IFeature>({

  title: {
    type: String,
    required: true
  },
  description: {
    type: String,

    required: true
  },
  status: {
    type: String,
    enum: ['validate', 'modified', 'deleted']

  },
  step2: {
    features: [
      {


        relatedTo: {
          type: Schema.Types.ObjectId,
          ref: 'project'

        }
      }
    ]
  }
}, {
  timestamps: true
})


const Feature = mongoose.models.Project !== undefined ? mongoose.models.Project : mongoose.model<IFeature>('Project', FeatureSchema)

export default Feature

