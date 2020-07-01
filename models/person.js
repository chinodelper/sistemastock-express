import mongoose, {Schema} from 'mongoose';

const personSchema = new Schema({
    customer: {type: Schema.ObjectId, ref: 'customer'},
    typePerson: {type: String, maxlength: 20, enum: ['client', 'provider'], required: true},
    name: {type:String,maxlength: 50, required: true},
    typeDni: {type: String, maxlength: 20},
    numDni: {type: String, maxlength: 20},
    address: {type: String, maxlength: 70},
    tel: {type:String, maxlength: 20},
    email: {type: String, maxlength: 50},
    status: {type:Number, default: 1},
    createdAt: {type: Date, default: Date.now}
});

const Person = mongoose.model('person', personSchema);
export default Person;