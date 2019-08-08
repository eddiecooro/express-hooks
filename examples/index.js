/* eslint-disable */
const express = require('express');
const app = express();
const expressHooks = require('../index');

const {
	useParam,
	usePath,
	useMethod,
	useQuery,
	useHostname,
	useBaseUrl,
	useSetCookie,
	useAppend,
	useAttachment,
	useHeader,
	useResponseHeader,
	useIsAcceptable,
	useIsCharsetAcceptable,
	useIsEncodingAcceptable,
	useIsLanguageAcceptable,
	useRange,
	useProtocol,
	useIsSecure,
	useIP,
	useIPs,
	useSubdomains,
	useIsXHR,
	useSetLocals,
	useHeadersSent,
} = expressHooks;

app.use(expressHooks.middleware());

app.get('/use-path', (_, res) => {
	const path = usePath();
	res.json({ path }).send();
});

app.get('/use-query', (_, res) => {
	const nameQuery = useQuery('name', 'name query is not provided');
	res.json({ query: nameQuery }).send();
});

app.get('/use-param/:name', (_, res) => {
	const nameParam = useParam('name', 'name param is not provided');
	res.json({ param: nameParam }).send();
});

app.get('/use-host-name', (_, res) => {
	const hostName = useHostname();
	res.json({ hostName }).send();
});

app.get('/use-base-url', (_, res) => {
	const baseUrl = useBaseUrl();
	res.json({ baseUrl }).send();
});

app.get('/use-method', (_, res) => {
	const method = useMethod();
	res.json({ method }).send();
});

app.get('/use-append', (_, res) => {
	useAppend('Content-Type', 'application/json');
	res.send();
});

app.get('/use-set-cookie', (_, res) => {
	useSetCookie('token', '12345');
	res.send();
});

app.get('/use-attachment', (_, res) => {
	useAttachment('a.png');
	res.send();
});

app.get('/use-header', (_, res) => {
	const contentType = useHeader('Content-Type', 'content type is not provided');
	res.json({ RequestContentType: contentType });
});

app.get('/use-response-header', (_, res) => {
	const responseContentType = useResponseHeader('Content-Type', 'response content type has not set');
	res.json({ ResponseContentType: responseContentType });
});

app.get('/use-is-acceptable', (_, res) => {
	const isAcceptable = useIsAcceptable('json');
	res.json({ isJsonAcceptable: !!isAcceptable });
});

app.get('/use-is-charset-acceptable', (_, res) => {
	const isAcceptable = useIsCharsetAcceptable('utf-8');
	res.json({ isUTF8Acceptable: !!isAcceptable });
});

app.get('/use-is-encoding-acceptable', (_, res) => {
	const isAcceptable = useIsEncodingAcceptable('b');
	res.json({ isBEncodingAcceptable: !!isAcceptable });
});

app.get('/use-is-language-acceptable', (_, res) => {
	const isAcceptable = useIsLanguageAcceptable('en');
	res.json({ isENAcceptable: !!isAcceptable });
});

app.get('/use-range', (_, res) => {
	const range = useRange(1000);
	res.json({ range });
});

app.get('/use-protocol', (_, res) => {
	const protocol = useProtocol();
	res.json({ protocol });
});

app.get('/use-is-secure', (_, res) => {
	const isSecure = useIsSecure();
	res.json({ isSecure });
});

app.get('/use-ip', (_, res) => {
	const ip = useIP();
	res.json({ ip });
});

app.get('/use-ips', (_, res) => {
	const ips = useIPs();
	res.json({ ips });
});

app.get('/use-subdomains', (_, res) => {
	const subdomains = useSubdomains();
	res.json({ subdomains });
});

app.get('/use-is-xhr', (_, res) => {
	const isXHR = useIsXHR();
	res.json({ isXHR });
});

app.get('/use-set-locals', (_, res) => {
	useSetLocals({ name: 'Eddie' });
	res.json({ locals: res.locals });
});

app.get('/use-headers-sent', (_, res) => {
	const headersSent = useHeadersSent();
	res.json({ headersSent });
});

app.enable('trust proxy');
app.listen(3001, () => {
	console.log('Server runned on port 3001');
});
