const mongoose = require('mongoose');

const fiDetailsSchema = new mongoose.Schema(
	{
		fiName: { type: String },
		id: { type: String }, //fk
		uploadDate: { type: Date, default: Date.now }
	},
	{ collection: 'fiRecord' }
);
fiDetailsSchema.set('timestamps', true);
module.exports = mongoose.model('fiRecord', fiDetailsSchema);
