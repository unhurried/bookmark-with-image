<template>
  <div>
    <b-button size="sm" @click="openConfigModal">
      <font-awesome-icon icon="cog" />
    </b-button>
    <b-modal id="config" title="Configration" hide-footer @ok="onUpdate">
      <h6 class="mb-3">Browser Config</h6>
      <BrowserConfig />
      <h6 class="mb-3">Import / Export</h6>
      <ImportAndExport @update="$emit('update')"/>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BrowserConfig from '@/components/BrowserConfig.vue';
import ImportAndExport from '@/components/ImportAndExport.vue';
import { ExampleStrategy } from '@/scraping/strategy/ExampleStrategy';
import { RepositoryUtil } from '@/repository/RepositoryUtil';
import { ConfigEntity } from '@/repository/ConfigEntity';
import { ScrapeFacade } from '@/scraping/ScrapingFacade'
import electron from 'electron';
import { RepositoryManager } from '../repository/RepositoryManager';
const dialog = electron.remote.dialog;

@Component({
  name: 'Config',
  components: { BrowserConfig, ImportAndExport },
})
export default class Config extends Vue {
  private browserPath: string = '';
  private browserOption: string = '';

  private async openConfigModal() {
    const repository = await RepositoryUtil.getRepository(ConfigEntity);
    const entity = await repository.findOne('config');
    if (entity) {
      this.browserPath = entity.browserPath? entity.browserPath : '';
      this.browserOption = entity.browserOption? entity.browserOption : '';
    }
    this.$bvModal.show('config')
  }

  private async selectBrowserPath() {
    const returnValue = await dialog.showOpenDialog({
      properties: ['openFile'],
      title: 'Select a browser executable file',
      defaultPath: "C:\\Program Files (x86)\\Google\\Chrome\\Application",
      filters: [{ name: 'executable file', extensions: ['exe'] }]
    });
    if (returnValue.filePaths && returnValue.filePaths.length > 0) {
      this.browserPath = returnValue.filePaths[0];
    }
  }

  private async onUpdate() {
    const repository = await RepositoryUtil.getRepository(ConfigEntity);
    const entity = new ConfigEntity();
    entity.browserPath = this.browserPath;
    entity.browserOption = this.browserOption;
    repository.save(entity);
  }
}
</script>

<style scoped lang="scss">
body {
  font-size: 12pt;
}
</style>
