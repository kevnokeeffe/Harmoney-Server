const mongoose = require('mongoose');

const accountDemoSchema = new mongoose.Schema({
	userID: {type: String}, //fk
	vCode: {type: String},
	uploadDate: {type: Date, default: Date.now}
},{ collection: 'validationCode' });
accountDemoSchema.set('timestamps', true);
module.exports = mongoose.model('validationCode', accountDemoSchema);