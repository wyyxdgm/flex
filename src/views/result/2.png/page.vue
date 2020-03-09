<template>
  <container>
    <div class="full">
      <img :src="SCAN_RESULT">
    </div>
    <div slot="footer" flex="main:center">
      <copy :value="SCAN_RESULT" />
    </div>
  </container>
</template>
<script>
import { mapState } from 'vuex'
// import translate from '@/util/translate.tree.data.js'
export default {
  name: 'png',
  title: '图片',
  computed: {
    ...mapState([
      'SCAN_RESULT'
    ])
  }
}

</script>
