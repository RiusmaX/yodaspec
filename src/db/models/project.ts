import { IProject } from '@/types/interfaces'
import mongoose, { Schema } from 'mongoose'

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
    current_situation: {
      type: String,
      required: true
    },
    problematic: {
      type: String,
      required: true
    },
    goal: {
      type: String,
      required: true
    },
    actors: {
      type: String,
      required: true
    },
    target_users: {
      type: String,
      required: true
    },
    scope_included: {
      type: String,
      required: true
    },
    scope_excluded: {
      type: String,
      required: true
    },
    final_introduction: {
      type: String,
      required: true
    }
  }

}, {
  timestamps: true
})

const Project = mongoose.models.Project !== undefined ? mongoose.models.Project : mongoose.model<IProject>('Project', ProjectSchema)

export default Project
