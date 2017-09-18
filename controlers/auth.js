import User from '../models/urer.js';

export const signup = async(req, res, next) => {
	const credential = req.body;
	let user;
	try{
		user = await User.create(credential);
	} catch ({massage}) {
		return next({
			status: 400,
			massage
		});
	};

	res.json(user);
};

export const signin = async(req, res, next) => {
	const {login, password} = req.body;
	const user = await User.findOne({login});

	if(!user){
		return next({
			status: 400,
			massage: 'User not found'
		});
	};

	try {
		const result = await user.comparePasswords(password);
	} catch (e){
		return next({
			status: 400,
			massage: 'Bad credential'
		});
	}

	req.session.userId = user._id;
	res.json(user);
};