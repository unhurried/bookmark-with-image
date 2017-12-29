const dialog = require('electron').remote.dialog;
const co = require('co');
const fs = require('fs');
const sleep = require('sleep-promise');
const db = require('./db.js');
const browser = require('./browser.js');
const scrape = require('./scrape');
const logger = require('./logger.js');

let addBookmarkFromUrl = co.wrap(function*() {
	let bookmarkUrl = document.getElementById("bookmarkUrlInput").value;
	try {
		let bookmarkId = scrape.getBookmarkId(bookmarkUrl);
		let bookmarkInDb = yield db.findBookmarkById(bookmarkId);
		if(bookmarkInDb !== null) {
			alert('This url is already registered.');
			return;
		}
	} catch (e) {
		if(e instanceof scrape.error.StrategyNotFoundError) {
			alert(e.message);
			return;
		} else {
			logger.debug(e);
		}
	}

	let createdBookmark = null;
	createdBookmark = yield scrape.createBookmark(bookmarkUrl);
	if(createdBookmark.deleted === true) {
		alert(createdBookmark.url + "is deleted.");
	}
	yield db.insertBookmark(createdBookmark);
	alert(createdBookmark.url + ' has been registered.');
	document.getElementById("bookmarkUrlInput").value = null;
	updateBookmarkList();
});

let loadUrlList = co.wrap(function*() {
	let filenames = dialog.showOpenDialog(null, {
		properties: ['openFile'],
		title: 'Select a list of url',
		defaultPath: '.',
		filters: [
			{name: 'text file', extensions: ['txt']}
		]
	});

	if(!filenames) {
		return;
	}
	let filename = filenames[0];
	let urlArray = fs.readFileSync(filename, 'utf8').split("\n");
	for(let i=0; i<urlArray.length; i++) {
		let bookmarkUrl = urlArray[i].replace(/\r?\n/g, "");

		try {
			let bookmarkId = scrape.getBookmarkId(bookmarkUrl);
			let bookmarkInDb = yield db.findBookmarkById(bookmarkId);
			if(bookmarkInDb !== null) {
				alert(bookmarkUrl + ' is already registered.');
				continue;
			}
		} catch (e) {
			if(e instanceof scrape.error.StrategyNotFoundError) {
				alert(e.message);
				return;
			} else {
				logger.debug(e);
			}
		}

		let createdBookmark = yield scrape.createBookmark(bookmarkUrl);
		if(createdBookmark.deleted === true) {
			alert(createdBookmark.url + "is deleted.");
		}
		yield db.insertBookmark(createdBookmark);
		alert(createdBookmark.url + ' has been registered.');
		yield sleep(1000);
	}
	updateBookmarkList();
});

let selectBrowser = co.wrap(function*() {
	let option = document.getElementById("browserOptionInput").value;
	let filenames = dialog.showOpenDialog(null, {
		properties: ['openFile'],
		title: 'Select a browser executable file',
		defaultPath: "C:\\Program Files (x86)\\Google\\Chrome\\Application",
		filters: [
			{name: 'executable file', extensions: ['exe']}
		]
	});

	if(!filenames) {
		return;
	}
	let filename = filenames[0];
	yield db.insertBrowser(filename, option);
	alert('The browser path has been set.');
	document.getElementById("browserOptionInput").value = null;
});

let updateBookmarkList = co.wrap(function*() {
	let target = document.getElementById("bookmarkList");
	target.textContent = null;
	const bookmarkArray = yield db.getBookmarkArray();
	for(let i=0; i<bookmarkArray.length; i++) {
		let bookmark = bookmarkArray[i];

		let img = document.createElement('img');
		let url = bookmark.url;
		img.onclick = function() {
			browser.openUrl(url);
		};
		img.setAttribute('src', `data:image/${bookmark.thumbnailExt};base64,${bookmark.thumbnail}`);
		let divBookmarkThumbnail = document.createElement('div');
		divBookmarkThumbnail.setAttribute('class', 'bookmarkThumbnail');
		divBookmarkThumbnail.appendChild(img);

		let deleteIcon = document.createElement('img');
		deleteIcon.setAttribute('width', '24');
		deleteIcon.setAttribute('src', './assets/delete_icon.svg');
		let divDeleteIcon = document.createElement('div');
		divDeleteIcon.setAttribute('class', 'deleteIcon');
		divDeleteIcon.appendChild(deleteIcon);
		divDeleteIcon.onclick = function() {
			co(function*() {
				if(window.confirm('Are you sure?')) {
					yield db.deleteBookmarkById(bookmark._id);
					updateBookmarkList();
				}
			});
		};

		let divBookmarkItem = document.createElement('div');
		divBookmarkItem.setAttribute('id', bookmark._id);
		divBookmarkItem.setAttribute('class', 'bookmarkItem');
		divBookmarkItem.appendChild(divBookmarkThumbnail);
		divBookmarkItem.appendChild(divDeleteIcon);
		let divBookmarkItemWrapper = document.createElement('div');
		divBookmarkItemWrapper.setAttribute('class', 'bookmarkItemWrapper');
		divBookmarkItemWrapper.appendChild(divBookmarkItem);

		target.appendChild(divBookmarkItemWrapper);
	}
});

window.onload = co.wrap(function*() {
	let addButton = document.getElementById("addButton");
	addButton.onclick = addBookmarkFromUrl;
	let loadUrlListButton = document.getElementById("loadUrlListButton");
	loadUrlListButton.onclick = loadUrlList;
	let selectBrowserButton = document.getElementById("selectBrowserButton");
	selectBrowserButton.onclick = selectBrowser;
	updateBookmarkList();
});
