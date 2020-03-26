const mongoose = require('mongoose');

const accountDemoSchema = new mongoose.Schema({
	userID: {type: String}, //fk
	email: {type: String},
	financialInstitutionID: {type: String}, //fk
	refreshToken: {type: String},
	accessToken: {type: String},
	IBAN: {type: String},
	userFiID: {type: String},
	bankEmail: {type: String},
	uploadDate: {type: Date, default: Date.now}
},{ collection: 'fiDetails' });
accountDemoSchema.set('timestamps', true);
module.exports = mongoose.model('fiDetails', accountDemoSchema);