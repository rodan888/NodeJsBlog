import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const UserSchema = new Schema({
	login: {type: String, unique: true, lowercase: true, index: true},
	password: String
});

UserSchema.pre('save', async function(next){
	if(!this.isModified('password')){
		return next();
	};
	// const salt = await bcrypt.getSalt(10);
	// const hash = await bcrypt.hash(this.password, salt);

	const hash = await bcrypt.hashSync(this.password, 10);

	this.password = hash;
	next();
});

UserSchema.methods.comparePasswords = function(password){
	// return bcrypt.compare(password, this.password);
	return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', UserSchema);