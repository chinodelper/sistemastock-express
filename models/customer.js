import mongoose, {Schema} from 'mongoose';

const customerSchema = new Schema({
    customerId: {type: String, minlength: 5, required: true, unique: true},
    name: {type:String, maxlength: 50, required: true},
    typeDni: {type: String, maxlength: 20},
    numDni: {type: String, maxlength: 20},
    address: {type: String, maxlength: 70},
    tel: {type:String, maxlength: 20},
    email: {type: String, maxlength: 50, unique: true, required: true},
    status: {type:Number, default: 1},
    createdAt: {type: Date, default: Date.now}
});

const Customer = mongoose.model('customer', customerSchema);
export default Customer;