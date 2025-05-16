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
  step3: [
    {
      id: {
        type: String,
        required: true
      },
      titreSpec: { type: String, required: true },
      contexte: { type: String, required: true },
      objectifs: { type: String, required: true },
      acteurs: { type: String, required: true },
      description: { type: String, required: true },
      conditionsSucces: { type: String, required: true },
      preConditions: { type: String, required: true },
      etapesFlux: { type: String, required: true },
      scenariosErreurs: { type: String, required: true },
      scenariosAlternatifs: { type: String, required: true },
      reglesGestion: { type: String, required: true },
      interfaceUxUi: { type: String, required: true },
      casTests: { type: String, required: true },
      postCondition: { type: String, required: true },
      status: { type: String, required: true }
    }
  ]
}, {
  timestamps: true
})

const Project = mongoose.models.Project !== undefined ? mongoose.models.Project : mongoose.model<IProject>('Project', ProjectSchema)

export default Project
