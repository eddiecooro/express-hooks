import { useResponseHeader } from './ResHooksImplementation';

module.exports = {
	headersSent: 'useHeadersSent',
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
};
