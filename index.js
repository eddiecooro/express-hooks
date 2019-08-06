let expressHooks;

if (process.env.NODE_ENV === 'production') {
	expressHooks = require('./dist/index');
} else {
	expressHooks = require('./dev/index');
}

module.exports = expressHooks;
