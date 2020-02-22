<template>
  <b-form>
    <b-form-group>
      <b-form-row>
        <b-col cols="3">
          <label for="browser-path">Browser Path</label>
        </b-col>
        <b-col cols="9">
          <b-input-group size="sm">
            <b-form-input v-model="browserPath" type="text" @change="update" />
            <b-input-group-append>
              <b-button @click="selectBrowserPath">Open Dialog</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-form-row>
    </b-form-group>
    <b-form-group>
      <b-form-row>
        <b-col cols="3">
          <label for="browser-option">Launch Option</label>
        </b-col>
        <b-col cols="9">
          <b-form-input v-model="browserOption" type="text" size="sm" @change="update"/>
        </b-col>
      </b-form-row>
    </b-form-group>
  </b-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ExampleStrategy } from '@/scraping/strategy/ExampleStrategy';
import { RepositoryUtil } from '@/repository/RepositoryUtil';
import { ConfigEntity } from '@/repository/ConfigEntity';
import { ScrapeFacade } from '@/scraping/ScrapingFacade'
import electron from 'electron';
import { RepositoryManager } from '../repository/RepositoryManager';
const dialog = electron.remote.dialog;

@Component({
  name: 'BrowserConfig',
  components: {},
})
export default class BrowserConfig extends Vue {
  private browserPath: string = '';
  private browserOption: string = '';

  private async mounted() {
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

  private async update() {
    const repository = await RepositoryUtil.getRepository(ConfigEntity);
    const entity = new ConfigEntity();
    entity.browserPath = this.browserPath;
    entity.browserOption = this.browserOption;
    repository.save(entity);
  }
}
</script>

<style scoped lang="scss">
</style>
