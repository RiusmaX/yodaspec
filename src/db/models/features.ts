import mongoose from 'mongoose'

const FeaturesSchema = new mongoose.Schema({
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
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Feature'
        }
      }
    ]
  }
}, {
  timestamps: true
})

const Features = mongoose.models.Features !== undefined ? mongoose.models.Features : mongoose.model('Features', FeaturesSchema, 'features')

export default Features
