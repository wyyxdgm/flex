<style lang="scss" scoped>
</style>
<template>
  <div flex="dir:top" class="page">
    <div flex="dir:left main:justify" class="page--tabbar">
      <!-- left -->
      <div flex="main:left cross:center">
        <a-button size="small" icon="folder-open" type="primary" class="is-mr-5" @click="IPC_IMAGE_FILE_SELECT">
          导入
        </a-button>
        <!-- <a-button size="small" icon="setting" @click="$router.replace('/setting')">
          偏好设置
        </a-button> -->
      </div>
      <!-- right -->
      <!-- <div flex="main:right cross:center">
        <share title="导出" />
      </div> -->
    </div>
    <div flex-box="1" class="page--router-view">
      <router-view />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import reply from '@root/ipc/reply'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions([
      'IPC_IMAGE_FILE_SELECT'
    ])
  },
  created() {
    reply(this);
  },
  computed: {
    ...mapState({
      image: state => state.File.image
    })
  }
}
</script>