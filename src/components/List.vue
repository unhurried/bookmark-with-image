<template>
  <div>
    <!--<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">-->
    <div>
      <Form @update="update" />
    </div>
    <div class="bookmarkList">
      <BookmarkItem v-for="item in items" :key="item.url" :item="item" @update="update" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BookmarkEntity } from '@/repository/BookmarkEntity';
import Form from '@/components/Form.vue';
import BookmarkItem from '@/components/BookmarkItem.vue';
import { remote } from 'electron';
import { BookmarkService } from '@/remote/service/BookmarkService';
import { RemoteServiceFactory } from '@/remote/RemoteServiceFactory';

@Component({
  name: 'List',
  components: { Form, BookmarkItem }
})
export default class List extends Vue {
  private bookmarkService = RemoteServiceFactory.getModule(BookmarkService);
  private items: BookmarkEntity[] = [];

  private async created() {
    this.update();
  }
  private async update() {
    this.items = await this.bookmarkService.getList();
  }
}
</script>

<style scoped lang="scss">
div.bookmarkList {
	position: relative;
	top: -20px;
	left: -24px;
}
</style>
