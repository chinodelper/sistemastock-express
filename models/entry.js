import mongoose, {Schema} from 'mongoose';

const entrySchema = new Schema({
    customer: {type: Schema.ObjectId, ref: 'customer'},
    user: {type: Schema.ObjectId, ref: 'user', required: true},
    person: {type: Schema.ObjectId, ref: 'person', required: true},
    typeVoucher: {type: String, maxlength: 20, required: true},
    serieVoucher: {type:String, maxlength: 7},
    numVoucher: {type: String, maxlength: 10, required: true},
    tax: {type: Number, required: true},
    total: {type: Number, required: true},
    details: [{
        _id: {
            type: String, 
            required: true
        },
        product: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    status: {type: Number, default: 1},
    createdAt: {type: Date, default: Date.now}
});

const Entry = mongoose.model('entry', entrySchema);
export default Entry;