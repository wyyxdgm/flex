<template>
  <container>
    <!-- <highlight :value="SCAN_RESULT"/> -->
    <textarea class="full" v-model="SCAN_FILE_PATH"></textarea>
    <textarea class="full" v-model="code"></textarea>
    <div slot="footer" flex="main:center">
      <copy :value="code"/>
    </div>
  </container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'raw',
  title: '数据',
  computed: {
    ...mapState([
      'SCAN_FILE_PATH',
      'SCAN_RESULT_MATRIX'
    ]),
    code () {
      return JSON.stringify(this.SCAN_RESULT_MATRIX, null, 2)
    }
  }
}
</script>

<style lang="scss">
  .full{
    width: 100%;
  }
</style>
