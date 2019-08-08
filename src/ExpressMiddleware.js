import { setDispatcher } from './CurrentDispatcher';
import onFinished from 'on-finished';

const expressMiddleware = () => (req, res, next) => {
	setDispatcher({
		_req: req,
		_res: res,
	});
	next();
	onFinished(res, () => {
		setDispatcher(null);
	});
};

export default expressMiddleware;
