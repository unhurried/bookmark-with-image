<template>
  <div class="text-center">
    <b-button size="sm" class="mr-4" @click="importList">Import URL List</b-button>
    <b-button size="sm" @click="exportList">Export URL List</b-button>
    <a id="exportLink" class="d-none" download="bookmark.txt" :href="exportHref" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ScrapeFacade } from '@/scraping/ScrapingFacade';
import { RepositoryUtil } from '@/repository/RepositoryUtil';
import { ConfigEntity } from '@/repository/ConfigEntity';
import { BookmarkEntity } from '../repository/BookmarkEntity';
import electron from 'electron';
const dialog = electron.remote.dialog;
//const fs = electron.remote.require('fs');
//const readline = electron.remote.require('readline');
import fs from 'fs';
import readline from 'readline';

@Component({
  name: 'ImportAndExport',
  components: {},
})
export default class ImportAndExport extends Vue {
  private exportHref: string | null = null;
  private async importList() {
    const returnValue = await dialog.showOpenDialog({
      properties: ['openFile'],
      title: 'Select a URL list file',
      //defaultPath: "C:\\Program Files (x86)\\Google\\Chrome\\Application",
      filters: [{ name: 'text file', extensions: ['txt'] }]
    });
    if (returnValue.filePaths && returnValue.filePaths.length > 0) {
      const filename = returnValue.filePaths[0];
      var stream = fs.createReadStream(filename, "utf8");
      var reader = readline.createInterface({ input: stream });
      reader.on("line", async (url) => {
        const b = await ScrapeFacade.createBookmark(url);
        const repo = await RepositoryUtil.getRepository(BookmarkEntity);
        if(b) await repo.save(b);
        this.$emit('update');
      });
    }

  }
  private async exportList() {
    const repository = await RepositoryUtil.getRepository(BookmarkEntity);
    const entities = await repository.find();
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
