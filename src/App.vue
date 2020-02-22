<template>
  <div>
    <b-container class="p-3" fluid>
      <b-row no-gutters>
        <b-col>
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'App',
})
export default class App extends Vue {}
</script>

<style lang="scss">
  /* Set the height of sidebar to fit to the viewport height. */
  @media (min-width: 768px) {
    .sidebar {
      min-height: calc(100vh - 56px);
      overflow: hidden;
    }
  }
</style>
