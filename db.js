const co = require('co');
const datastore = require('nedb-promise');

let db = {};
db.bookmark = datastore({ filename: 'data/bookmark.json', autoload: true });
db.setting = datastore({ filename: 'data/setting.json', autoload: true });

module.exports.insertBookmark = function(bookmark) {
	return db.bookmark.update({ _id: bookmark._id }, bookmark, { upsert: true });
};

module.exports.findBookmarkById = co.wrap(function*(_id) {
	let bookmark = yield db.bookmark.findOne({ _id: _id });
	return bookmark;
});

module.exports.getBookmarkArray = co.wrap(function*() {
	return yield db.bookmark.find({deleted: false});
});

module.exports.deleteBookmarkById = co.wrap(function*(_id) {
	let bookmark = yield db.bookmark.remove({ _id: _id });
	return bookmark;
});

module.exports.insertBrowser = function(browser, option) {
	return db.setting.update(
			{ _id: 'browser' },
			{ _id: 'browser', path: browser, option: option },
			{ upsert: true }
	);
};

module.exports.getBrowser = co.wrap(function*() {
	return yield db.setting.findOne({ _id: 'browser' });
});
