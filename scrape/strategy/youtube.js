const co = require('co');
const client = require('cheerio-httpcli');
const request = require('request-promise');
const path = require('path');
const url = require('url');
const helper = require('../helper.js');
const logger = require('../../logger.js');

let youtubeStrategy = class {
	static accept(hostname) {
		return hostname === 'www.youtube.com';
	}

	static getBookmarkId(bookmarkUrl) {
		let parsedBookmarkUrl = url.parse(bookmarkUrl, true);
		let videoId = parsedBookmarkUrl.query.v;
		let _id = parsedBookmarkUrl.hostname + '_' + videoId;
		return _id;
	}
	
	static createBookmark(bookmarkUrl) {
		return co(function*() {
			let parsedBookmarkUrl = url.parse(bookmarkUrl, true);
			let videoId = parsedBookmarkUrl.query.v;
			let thumbnailUrl = `http://i.ytimg.com/vi/${videoId}/0.jpg`;
			logger.debug('thumbnailUrl: ' + thumbnailUrl);
			let thumbnailExt = path.extname(thumbnailUrl).slice(1);
			logger.debug('thumbnailExt: ' + thumbnailExt);
			let thumbnailBinary = yield request({ method: 'GET', url: thumbnailUrl, encoding: null });
			let thumbnail = new Buffer(thumbnailBinary).toString('base64');

			let _id = youtubeStrategy.getBookmarkId(bookmarkUrl);
			return helper.createBookmark(_id, bookmarkUrl, thumbnail, thumbnailUrl, thumbnailExt);
		});
	}
};
module.exports = youtubeStrategy;
