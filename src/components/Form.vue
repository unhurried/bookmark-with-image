<template>
  <div>
    <b-form class="d-flex flex-row-reverse" @submit.prevent="onSubmit">
      <Config class="ml-3" @update="$emit('update')" />
      <b-form-group class="ml-3">
        <b-button type="submit" size="sm">Submit</b-button>
      </b-form-group>
      <b-form-group style="width: 250pt">
        <b-form-input v-model="url" type="text" size="sm"></b-form-input>
      </b-form-group>
    </b-form>
    <b-toast id="toast-success" variant="success" no-close-button toast-class="form-toast" auto-hide-delay="1500" no-hover-pause>
      Bookmark is successifully added.
    </b-toast>
    <b-toast id="toast-error" variant="danger" no-close-button toast-class="form-toast" auto-hide-delay="1500" no-hover-pause>
      Sorry, somthing went wrong.
    </b-toast>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { BookmarkEntity } from '@/repository/BookmarkEntity';
import { BookmarkService } from '@/remote/service/BookmarkService';
import { ScrapeFacade } from '@/scraping/ScrapingFacade';
import Config from '@/components/Config.vue';
import { RemoteServiceFactory } from '@/remote/RemoteServiceFactory';

@Component({
  name: 'Form',
  components: { Config },
})
export default class Form extends Vue {
  private bookmarkService = RemoteServiceFactory.getModule(BookmarkService);

  private url: string = '';

  private async onSubmit() {
    try {
      const b = await ScrapeFacade.createBookmark(this.url);
      await this.bookmarkService.save(b);
      this.$emit('update');
      this.$bvToast.show('toast-success');
      this.url = '';
    } catch (e) {
      this.$bvToast.show('toast-error');
    }
  }
}
</script>

<style lang="scss">
body {
  font-size: 12pt;
}
.form-toast {
  margin-top: 102px;
  margin-right: 8px;
}
</style>
