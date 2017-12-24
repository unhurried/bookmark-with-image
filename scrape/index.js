const co = require('co');
const fs = require('fs');
const path = require('path');
const url = require('url');

let strategyList = [];
let strategyPath = __dirname + "/strategy/";
let fileList = fs.readdirSync(strategyPath);
fileList.forEach(function(file){
	if(path.extname(file) === '.js') {
		strategyList.push(require(strategyPath + file));
	}
});

let error = {};
error.StrategyNotFoundError = class extends Error {};
error.StrategyNotFoundError.prototype.name = "StrategyNotFoundError";
module.exports.error = error;

module.exports.getBookmarkId = function(bookmarkUrl) {
	let strategy = findStrategy(bookmarkUrl);
	return strategy.getBookmarkId(bookmarkUrl);
}

module.exports.createBookmark = co.wrap(function*(bookmarkUrl){
	let strategy = findStrategy(bookmarkUrl);
	let bookmark = yield strategy.createBookmark(bookmarkUrl);
	return bookmark;
});

let findStrategy = function(bookmarkUrl) {
	let hostname = url.parse(bookmarkUrl).hostname;
	let foundStrategy;
	strategyList.forEach(function(strategy) {
		if(strategy.accept(hostname)) {
			foundStrategy = strategy;
		}
	});
	return foundStrategy;
}
