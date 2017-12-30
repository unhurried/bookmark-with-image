# Bookmark with Images

A simple native app to manage bookmarks with thumbnail images.

Built with Node.js ([Electron](https://electronjs.org/)) and [nedb](https://github.com/louischatriot/nedb).

![screenshot](assets/screenshot.png)

## Run 

```
# Install electron if you haven't installed it yet.
npm install -g electron

npm install
electron .
```

## Build

```
# Install electron-packager if you haven't installed it yet.
npm install -g electron-packager

npm install
electron-packager . bookmark-with-image ––platform=win32 ––arch=x64 --electron-version=1.7.9
```





