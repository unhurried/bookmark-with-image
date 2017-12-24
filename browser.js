const co = require('co');
const exec = require('child-process-promise').exec;
const db = require('./db.js');

module.exports.openUrl = co.wrap(function*(url) {
	let browser = yield db.getBrowser();
	let command = `"${browser.path}" ${browser.option} ${url}`;
	return yield exec(command);
});
