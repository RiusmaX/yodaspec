
import mongoose, { Schema } from 'mongoose'
import { IProject } from '../../types/interface'

const ProjectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  }
},
{ timestamps: true } // Automatically add createdAt and updatedAt fields
)

const Project = mongoose.models.Project !== undefined ? mongoose.models.Project : mongoose.model<IProject>('Project', ProjectSchema)

export default Project
