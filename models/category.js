import mongoose, {Schema} from 'mongoose';

// creamos modelo a partir de un Schema de mongoose
const categorySchema = new Schema({
    customer: {type: Schema.ObjectId, ref: 'customer'},
    name: {type: String, maxlength:50, unique: true, required: true},
    description: {type: String, maxlength: 255},
    status: {type: Number, default: 1},
    createdAt: {type: Date, default: Date.now}
});

const Category = mongoose.model('category', categorySchema);

export default Category;