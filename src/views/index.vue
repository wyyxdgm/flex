<style lang="scss" scoped>
.page {
  height: 100%;

  .page--tabbar {
    margin: 5px;
  }

  .page--router-view {
    overflow: auto;
    border-top: 1px solid #D9D9D9;
  }
}

</style>
<template>
  <div flex="dir:top" class="page">
    <div flex="dir:left main:justify" class="page--tabbar">
      <!-- left -->
      <div style="width: 70px;" flex="main:left">
        <a-button size="small" icon="folder-open" @click="IPC_FILE_SELECT">
          打开
        </a-button>
      </div>
      <!-- center -->
      <a-radio-group size="small" :defaultValue="$route.name" buttonStyle="solid" @change="e => $router.replace({ name: e.target.value })">
        <a-radio-button v-for="type of scanResultDisplayTypesMenu" :key="type.name" :value="type.name">{{type.title}}</a-radio-button>
      </a-radio-group>
      <!-- right -->
      <div style="width: 70px;" flex="main:right">
        <a-button @click="ON_OPEN_DRAWER" size="small" icon="edit">
        </a-button>
      </div>
    </div>
    <div flex-box="1" class="page--router-view">
      <router-view />
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { scanResultDisplayTypesMenu } from '@/router.js'
export default {
  data() {
    return {
      // 支持的显示方式
      scanResultDisplayTypesMenu
    }
  },
  computed: {
    ...mapState([
      'SCAN_FILE_PATH'
    ])
  },
  methods: {
    ...mapMutations([
      'ON_OPEN_DRAWER',
      'IPC_FILE_SELECT'
    ])
  }
}

</script>
