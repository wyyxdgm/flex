<template>
  <container>
    <canvas class="full" id="canvasContainer" width="2000" height="2000"></canvas>
      <!-- <reader :value="SCAN_RESULT"/> -->
    <div slot="footer" flex="main:center">
      <copy :value="SCAN_RESULT" />
    </div>
  </container>
</template>
<script>
import { mapState } from 'vuex'
// import translate from '@/util/translate.tree.data.js'
export default {
  name: 'canvas-edit',
  title: '画布',
  data() {
    return {
      canvas: null
    }
  },
  computed: {
    ...mapState([
      'SCAN_RESULT'
    ])
  },
  mounted() {
    const fabric = window.fabric
    const canvas = this.canvas = new fabric.Canvas('canvasContainer')
    // `this` 指向 vm 实例
    if (this.SCAN_RESULT) {
      this.canvas.setBackgroundImage(this.SCAN_RESULT || 'https://cn.vuejs.org/images/logo.png', canvas.renderAll.bind(canvas), {
        // Needed to position backgroundImage at 0/0
        originX: 'left',
        originY: 'top'
      })
    }
    console.log('canvas-edit mounted')
    // // create a rectangle object
    // var rect = new fabric.Rect({
    //   left: 100,
    //   top: 100,
    //   fill: 'red',
    //   width: 20,
    //   height: 20
    // })

    // // "add" rectangle onto canvas
    // canvas.add(rect)
    // canvas.renderAll()
  },
  watch: {
    SCAN_RESULT(val) {
      this.canvas.setBackgroundImage(val)
      this.canvas.renderAll()
    }
  }
}

</script>
<style lang="scss">
canvas {
  width: 100vw;
  height: 100vh;
}

</style>
