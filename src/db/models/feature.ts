import mongoose, { model, Schema } from 'mongoose'
import { IAlternativeScenario, Ifeature } from '@/types/interfaces'

const AlternativeScenarioSchema = new Schema<IAlternativeScenario>({
  Name: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Expected_Result: {
    type: [String],
    required: true
  }
}, { _id: false })

const FeatureSchema = new Schema<Ifeature>({
  Name: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Goal: {
    type: String,
    required: true
  },
  Success_Condition: {
    type: String,
    required: true
  },
  Actors: {
    type: [String],
    required: true
  },
  Preconditions: {
    type: [String],
    required: true
  },
  Main_Flow_Steps: {
    type: [String],
    required: true
  },
  Postconditions: {
    type: [String],
    required: true
  },
  Alternative_Scenarios: {
    type: [AlternativeScenarioSchema],
    required: true
  },
  _id: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  }

}, {
  timestamps: true
})

const Feature = mongoose.models.Feature ?? model<Ifeature>('feature', FeatureSchema)
export default Feature
// import mongoose, { model, Schema, Model } from 'mongoose'
// import { Ifeature } from '@/types/interfaces'

// const AlternativeScenarioSchema = new Schema(
//   {
//     Name: { type: String, required: true },
//     Description: { type: String, required: true },
//     Expected_Result: { type: [String], required: true }
//   },
//   { _id: false }
// )

// const FeatureSchema = new Schema<Ifeature>(
//   {
//     Name: { type: String, required: true },
//     Description: { type: String, required: true },
//     Goal: { type: String, required: true },
//     Success_Condition: { type: String, required: true },
//     Actors: { type: [String], required: true },
//     Preconditions: { type: [String], required: true },
//     Main_Flow_Steps: { type: [String], required: true },
//     Postconditions: { type: [String], required: true },
//     Alternative_Scenarios: { type: [AlternativeScenarioSchema], required: true },
//     idProject: { type: Schema.Types.ObjectId, required: true }
//   },
//   { timestamps: true }
// )
// const Feature: Model<Ifeature> = (mongoose.models.Feature as Model<Ifeature>) || model<Ifeature>('feature', FeatureSchema)

// export default Feature
