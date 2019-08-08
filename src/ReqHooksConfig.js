import { useParam, useQuery, useHeader } from './ReqHooksImplementation';

export default {
	baseUrl: 'useBaseUrl',
	path: 'usePath',
	method: 'useMethod',
	hostname: 'useHostname',
	fresh: 'useIsFresh',
	stale: 'useIsStale',
	header: {
		implementation: useHeader,
		name: 'useHeader',
	},
	accepts: {
		type: 'function',
		name: 'useIsAcceptable',
	},
	acceptsEncodings: {
		type: 'function',
		name: 'useAreEncodingsAcceptable',
	},
	acceptsEncoding: {
		type: 'function',
		name: 'useIsEncodingAcceptable',
	},
	acceptsCharsets: {
		type: 'function',
		name: 'useAreCharsetsAcceptable',
	},
	acceptsCharset: {
		type: 'function',
		name: 'useIsCharsetAcceptable',
	},
	acceptsLanguages: {
		type: 'function',
		name: 'useAreLanguagesAcceptable',
	},
	acceptsLanguage: {
		type: 'function',
		name: 'useIsLanguageAcceptable',
	},
	query: {
		implementation: useQuery,
		name: 'useQuery',
	},
	params: {
		implementation: useParam,
		name: 'useParam',
	},
	// range: 'useRange',
	// param: 'useParam',
	// protocol: 'useProtocol',
	// secure: 'useIsSecure',
	// ip: 'useIP',
	// ips: 'useIPs',
	// subdomains: 'useSubdomains',
	// path: 'usePath',
	// hostname: 'useHostname',
	// host: 'useHost',
	// xhr: 'useXHR',
};
