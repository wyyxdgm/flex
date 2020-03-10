<template>
  <container>
    <highlight :value="option_result_string"></highlight>
    <canvas class="full" id="canvasContainer" width="2000" height="2000"></canvas>
    <a-drawer title="option Drawer" placement="right" :closable="false" @close="ON_CLOSE_DRAWER" :visible="DRAWER_VISIBLE">
      <a-form>
        <a-form-item label="gap" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input addonAfter="points" v-model="option.points" :defaultValue="OPTION_RESULT.points" placeholder="" />
        </a-form-item>
        <!-- <a-input v-model="" placeholder="points" />
      <a-input v-model="" placeholder="points" /> -->
        <a-button type="primary" @click="()=>DRAW_OPTION(option)">Draw</a-button>
      </a-form>
    </a-drawer>
    <!-- <reader :value="SCAN_RESULT"/> -->
    <div slot="footer" flex="main:center">
      <copy :value="SCAN_RESULT" />
    </div>
  </container>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
// import translate from '@/util/translate.tree.data.js'
export default {
  name: 'canvas-edit',
  title: '画布',
  data() {
    return {
      option: {
        points: ''
      },
      canvas: null
    }
  },
  mounted() {
    this.option.points = this.OPTION_RESULT.option.points
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
  methods: {
    ...mapMutations([
      'ON_CLOSE_DRAWER',
      'DRAW_OPTION'
    ])
  },
  watch: {
    SCAN_RESULT(val) {
      this.canvas.setBackgroundImage(val)
      this.canvas.renderAll()
    },
    OPTION_RESULT(val) {
      console.log('OPTION_RESULT changed')
    }
  },
  computed: {
    ...mapState([
      'SCAN_RESULT',
      'DRAWER_VISIBLE',
      'OPTION_RESULT'
    ]),
    option_result_string() {
      return JSON.stringify(this.OPTION_RESULT)
    }
  }
}

</script>
<style lang="scss">
canvas {
  height: 100vh;
  border: 1px dashed blue;
  margin: 20px;
}

.action-container {
  position: absolute;
}

</style>
