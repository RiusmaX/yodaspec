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
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: [FeatureSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const Project = mongoose.models.Project !== undefined ? mongoose.models.Project : mongoose.model<IProject>('Project', ProjectSchema)

export default Project
