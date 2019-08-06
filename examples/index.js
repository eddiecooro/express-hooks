import { useHeader } from '../src/Hooks';
/* eslint-disable */
const express = require('express');
const app = express();
const expressHooks = require('../index');

const {
	usePath,
	useQuery,
	useParam,
	useHostName,
	useBaseUrl,
	useMethod,
	useAppend,
	useAttachment,
	useIsAcceptable,
	useIsCharsetAcceptable,
	useIsEncodingAcceptable,
	useSetCookie,
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
	const hostName = useHostName();
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

app.listen(3001, () => {
	console.log('Server runned on port 3001');
});
