import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import { ipcRenderer } from 'electron'
// import { notify } from './plugin/vue.notify'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    persistedState()
  ],
  state: {
    OPTION_RESULT: {},
    DRAWER_VISIBLE: false,
    // 扫描的地址
    SCAN_FILE_PATH: '',
    // 扫描结果
    SCAN_RESULT_MATRIX: [],
    SCAN_RESULT_BASE64: '',
    // 设置
    SETTING: {
      // 通用
      PUBLIC: {}
    }
  },
  mutations: {
    DRAW_OPTION_UPDATE(state, data) {
      state.OPTION_RESULT = data.option
    },
    ON_OPEN_DRAWER(state, data) {
      state.DRAWER_VISIBLE = true
    },
    ON_CLOSE_DRAWER(state, data) {
      state.DRAWER_VISIBLE = false
    },
    DRAW_OPTION(state, data) {
      console.log('DRAW_OPTION', state, data)
      ipcRenderer.send('DRAW_OPTION', {
        option: data
      })
    },
    // 更新 [ 目标地址 ]
    SCAN_FILE_PATH_UPDATE(state, data) {
      state.SCAN_FILE_PATH = data
    },
    // 更新 [ 扫描结果 ]
    SCAN_RESULT_UPDATE(state, data) {
      state.SCAN_RESULT = data
      state.SCAN_RESULT_BASE64 = data.base64
      state.SCAN_RESULT_MATRIX = data.imageData
    },
    // IPC [ 发送扫描请求 ]
    IPC_FILE_SCAN(state) {
      ipcRenderer.send('IPC_FILE_SCAN', {
        filePath: state.SCAN_FILE_PATH
      })
    },
    // IPC [ 通过文件选择窗口选择一个 ]
    IPC_FILE_SELECT() {
      ipcRenderer.send('IPC_FILE_SELECT')
    }
  }
})
