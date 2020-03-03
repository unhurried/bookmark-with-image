<template>
  <div>
    <b-button size="sm" @click="openConfigModal">
      <font-awesome-icon icon="cog" />
    </b-button>
    <b-modal id="config" title="Configration" hide-footer>
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

@Component({
  name: 'Config',
  components: { BrowserConfig, ImportAndExport },
})
export default class Config extends Vue {
  private async openConfigModal() {
    this.$bvModal.show('config');
  }
}
</script>

<style scoped lang="scss">
body {
  font-size: 12pt;
}
</style>
