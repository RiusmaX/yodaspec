import { IProject } from '@/types/interfaces'
import mongoose, { model, Schema } from 'mongoose'

const ProjectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  step5 :[{ type: Schema.Types.Mixed }]
}, { timestamps: true })

const Project = mongoose.models.Project !== undefined ? mongoose.models.Project : model<IProject>('Project', ProjectSchema)

export default Project
