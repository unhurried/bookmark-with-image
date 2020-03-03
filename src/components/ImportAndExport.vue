<template>
  <div class="text-center">
    <b-button size="sm" class="mr-4" @click="importList">Import URL List</b-button>
    <b-button size="sm" @click="exportList">Export URL List</b-button>
    <a id="exportLink" class="d-none" download="bookmark.txt" :href="exportHref" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import electron from 'electron';
const dialog = electron.remote.dialog;
import fs from 'fs';
import readline from 'readline';
import { ScrapeFacade } from '@/scraping/ScrapingFacade';
import { RemoteServiceFactory } from '@/remote/RemoteServiceFactory';
import { BookmarkService } from '@/remote/service/BookmarkService';
import { BookmarkEntity } from '@/repository/BookmarkEntity';

@Component({
  name: 'ImportAndExport',
  components: {},
})
export default class ImportAndExport extends Vue {
  private bookmarkService = RemoteServiceFactory.getModule(BookmarkService);

  private exportHref: string | null = null;
  private async importList() {
    const returnValue = await dialog.showOpenDialog({
      properties: ['openFile'],
      title: 'Select a URL list file',
      filters: [{ name: 'text file', extensions: ['txt'] }]
    });
    if (returnValue.filePaths && returnValue.filePaths.length > 0) {
      const filename = returnValue.filePaths[0];
      var stream = fs.createReadStream(filename, "utf8");
      var reader = readline.createInterface({ input: stream });
      reader.on("line", async (url) => {
        const b = await ScrapeFacade.createBookmark(url);
        if(b) await this.bookmarkService.save(b);
        this.$emit('update');
      });
    }

  }
  private async exportList() {
    const entities = await this.bookmarkService.getList();
    let data = '';
    for (const entity of entities) {
      data += `${entity.url}\n`;
    }
    const blob = new Blob([data], {type: 'text/plain'});
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, 'bookmark.txt');
    } else {
      this.exportHref = window.URL.createObjectURL(blob);
      this.$nextTick(() => {
        const a = document.getElementById('exportLink');
        if (a) {
          a.click();
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
</style>
