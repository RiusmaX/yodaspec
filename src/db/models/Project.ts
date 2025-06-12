import mongoose, { Schema } from 'mongoose'
import { IProject } from '@/types/interfaces'

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String },
  step2: {
    features: [
      {
        relatedTo: {
          type: Schema.Types.ObjectId,
          ref: 'Feature'
        }
      }
    ]
  },
  step3: { type: Schema.Types.Mixed }
}, {
  timestamps: true
})

const Project =
  mongoose.models.Project ?? mongoose.model<IProject>('Project', ProjectSchema)

export default Project
