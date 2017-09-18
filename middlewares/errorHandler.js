export default function(err, req, res, next){
	let {status = 500, massage = 'Server error'} = err;

	return res
		.status(status)
		.json({massage});
};