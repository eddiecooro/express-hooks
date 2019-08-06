/* eslint-disable */
const express = require('express');
const app = express();
const expressHooks = require('../index');

const { usePath, useQuery, useParam, useHostName, useBaseUrl, useMethod } = expressHooks;

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

app.listen(3001, () => {
	console.log('Server runned on port 3001');
});
