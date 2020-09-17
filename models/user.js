import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
    rol: {type: String, maxlength: 30, enum: ['superuser','admin', 'control', 'seller'], required: true},
    customer: {type: Schema.ObjectId, ref: 'customer'},
    name: {type:String, maxlength: 50, required: true},
    typeDni: {type: String, maxlength: 20},
    numDni: {type: String, maxlength: 20},
    address: {type: String, maxlength: 70},
    tel: {type:String, maxlength: 20},
    email: {type: String, maxlength: 50, required: true, lowercase: true},
    password: {type: String, maxlength: 64, required: true},
    status: {type:Number, default: 1},
    createdAt: {type: Date, default: Date.now},
    resetLink: {data: String, default: ''}
});

const User = mongoose.model('user', userSchema);
export default User;