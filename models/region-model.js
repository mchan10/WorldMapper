const { model, Schema, ObjectId } = require('mongoose');

const regionSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		capital: {
			type: String,
			required: true
		},
		leader: {
			type: String,
			required: true
		},
		parent: {
			type: String,
		},
		children: {
			type: [String],
			required: true
		},
		landmarks: {
			type: [String],
			required: true
		},
		owner: {
			type: String,
			required: true
		}
	}
);

const Region = model('Item', regionSchema);
module.exports = Region;