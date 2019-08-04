import CurrentDispatcher from './CurrentDispatcher';

const expressMiddleware = (req, res, next) => {
	CurrentDispatcher.current = {
		_req: req,
		_res: res,
	};
	next();
	CurrentDispatcher.current = null;
};

export default expressMiddleware;
