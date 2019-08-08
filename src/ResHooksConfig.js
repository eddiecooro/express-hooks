import { useResponseHeader, useSetLocals } from './ResHooksImplementation';

module.exports = {
	headersSent: 'useHeadersSent',
	app: 'useApp',
	cookie: {
		type: 'function',
		name: 'useSetCookie',
	},
	append: {
		type: 'function',
		name: 'useAppend',
	},
	attachment: {
		type: 'function',
		name: 'useAttachment',
	},
	get: {
		implementation: useResponseHeader,
		name: 'useResponseHeader',
	},
	locals: {
		implementation: useSetLocals,
		name: 'useSetLocals',
	},
};
