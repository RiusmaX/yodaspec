import mongoose, { Schema, Document } from 'mongoose'

export interface ISpecification extends Document {
  id: string
  titreSpec: string
  contexte: string
  objectifs: string
  acteurs: string
  description: string
  conditionsSucces: string
  preConditions: string
  etapesFlux: string
  scenariosErreurs: string
  scenariosAlternatifs: string
  reglesGestion: string
  interfaceUxUi: string
  casTests: string
  postCondition: string
  status: string
}
const SpecificationSchema = new Schema<ISpecification>({
  id: { type: String, required: true },
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
)
const Specification = mongoose.models.Project !== undefined ? mongoose.models.Project : mongoose.model<ISpecification>('Project', SpecificationSchema)

export default Specification
