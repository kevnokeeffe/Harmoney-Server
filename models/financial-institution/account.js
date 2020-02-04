import mongoose from 'mongoose'

const accountDemoSchema = new mongoose.Schema({
    financialInstitutionID: {type: String}, //fk
    userId: {type: String}, //fk
    refreshToken: {type: String},
    accessToken: {type: String, required: true}
},{ collection: 'accounts' })
accountDemoSchema.set('timestamps', true)
export default mongoose.model('account', accountDemoSchema)