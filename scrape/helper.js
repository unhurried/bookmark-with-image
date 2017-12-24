module.exports.createBookmark = function(_id, url, thumbnail, thumbnailUrl, thumbnailExt) {
	var bookmark = {
		_id: _id,
		url: url,
		thumbnail: thumbnail,
		thumbnailUrl: thumbnailUrl,
		thumbnailExt: thumbnailExt,
		deleted: false,
	};
	return bookmark;
};

module.exports.createDeletedBookmark = function(_id, url, thumbnail, thumbnailUrl, thumbnailExt) {
	var bookmark = {
		_id: _id,
		url: url,
		deleted: true,
	};
	return bookmark;
};
