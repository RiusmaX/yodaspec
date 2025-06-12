import { IProject } from '@/types/interfaces'
import mongoose, { Schema } from 'mongoose'

const FeatureSchema = new Schema({
  feature: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: mongoose.Schema.Types.Mixed }, // Accepte string ou number
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { _id: false })

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
      required: false
    },
    problematic: {
      type: String,
      required: false
    },
    goal: {
      type: String,
      required: false
    },
    actors: {
      type: String,
      required: false
    },
    target_users: {
      type: String,
      required: false
    },
    scope_included: {
      type: String,
      required: false
    },
    scope_excluded: {
      type: String,
      required: false
    },
    final_introduction: {
      type: String,
      required: false
    }
  },
  features: [FeatureSchema],
}, {
  timestamps: true
})

const Project = mongoose.models.Project !== undefined ? mongoose.models.Project : mongoose.model<IProject>('Project', ProjectSchema)

export default Project
