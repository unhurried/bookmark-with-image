<template>
  <div>
    <!--<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">-->
    <div>
      <Form @update="update" />
    </div>
    <div class="bookmarkList">
      <BookmarkItem v-for="item in items" :key="item.id" :item="item" @update="update" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RepositoryUtil } from '@/repository/RepositoryUtil';
import { BookmarkEntity } from '@/repository/BookmarkEntity';
import Form from '@/components/Form.vue';
import BookmarkItem from '@/components/BookmarkItem.vue';

@Component({
  name: 'List',
  components: { Form, BookmarkItem }
})
export default class List extends Vue {
  private items: BookmarkEntity[] = [];
  private async created() {
    this.update();
  }
  private async update() {
    const repo = await RepositoryUtil.getRepository(BookmarkEntity);
    this.items = await repo.find();
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
