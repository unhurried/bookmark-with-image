<template>
  <div class="bookmarkItemWrapper">
    <div class="bookmarkItem">
      <div class="bookmarkThumbnail" :id="item.url">
        <img v-if="item.thumbnailData" @click="openItem" :src="`data:image/${item.thumbnailExt};base64,${item.thumbnailData}`" />
        <img v-else @click="openItem" src="/assets/no_image.png" />
      </div>
      <div class="deleteIcon" @click="deleteItem">
        <font-awesome-icon icon="minus-circle" />
      </div>
      <div class="moveLeftIcon">
        <font-awesome-icon icon="arrow-alt-circle-left" />
      </div>
      <div class="moveRightIcon">
        <font-awesome-icon icon="arrow-alt-circle-right" />
      </div>
    </div>
    <b-tooltip v-if="item.title" :target="item.url" triggers="hover">
      {{item.title}}
    </b-tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RepositoryUtil } from '@/repository/RepositoryUtil';
import { BookmarkEntity } from '@/repository/BookmarkEntity';
import { ConfigEntity } from '@/repository/ConfigEntity';
import { BrowserUtil } from '@/util/BrowserUtil';

@Component({
  name: 'BookmarkItem',
  components: {},
})
export default class BookmarkItem extends Vue {
  @Prop() private item!: BookmarkEntity;
  private async openItem() {
    BrowserUtil.openUrl(this.item.url);
  }
  private async deleteItem() {
    const repository = await RepositoryUtil.getRepository(BookmarkEntity);
    repository.delete(this.item.url);
    this.$emit("update");
  }
}
</script>

<style scoped lang="scss">
div.bookmarkItemWrapper {
  display: inline-block;
}
div.bookmarkItem {
  position: relative;
  padding: 20px 0px 0px 24px;
}
div.bookmarkThumbnail {
  display: table-cell;
  vertical-align: middle;
  height: 150px;
  background-color: black;
  cursor: pointer;
}
div.bookmarkThumbnail img {
  width: 200px;
  vertical-align: middle;
}
div.deleteIcon {
  position: absolute;
  top: 20px;
  left: 192px;
  cursor: pointer;
  font-size: 18pt;
  color: white;
}
div.moveLeftIcon {
  position: absolute;
  top: 134px;
  left: 32px;
  cursor: pointer;
  font-size: 18pt;
  color: white;
}
div.moveRightIcon {
  position: absolute;
  top: 134px;
  left: 192px;
  cursor: pointer;
  font-size: 18pt;
  color: white;
}
</style>
