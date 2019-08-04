import { setDispatcher } from './CurrentDispatcher';

const expressMiddleware = (req, res, next) => {
	setDispatcher({
		_req: req,
		_res: res,
	});
	next();
	setDispatcher(null);
};

export default expressMiddleware;
