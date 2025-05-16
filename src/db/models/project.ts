import mongoose, { model, Schema } from 'mongoose'
import { IProject } from '@/types/interfaces'

const ProjectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  }
}, {
  timestamps: true
})
const Project = mongoose.models.Project ?? model<IProject>('Project', ProjectSchema)
export default Project
