
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
  },
  step1: {
    type: Object,
    required: false
  },
  step2: {
    type: Object,
    required: false
  },
  step3: {
    type: Object,
    required: false
  },
  step4: {
    type: Object,
    required: false
  },
  step5: {
    type: Object,
    required: false
  },
  step6: {
    type: Object,
    required: false
  }
}, // Define the schema for the Project model
{ timestamps: true } // Automatically add createdAt and updatedAt fields
)

const Project = mongoose.models.Project !== undefined ? mongoose.models.Project : mongoose.model<IProject>('Project', ProjectSchema)

export default Project
