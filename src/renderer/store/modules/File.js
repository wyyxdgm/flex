import { ipcRenderer } from 'electron'
import { message } from 'ant-design-vue'

const state = {
  image: ''
}

const mutations = {
  IPC_IMAGE_FILE_SELECT(state, image) {
    if (!image) return message.warning('您取消了图片选择')
    state.image = image
  }
}

const actions = {
  IPC_IMAGE_FILE_SELECT ({ commit }) {
    ipcRenderer.send('IPC_IMAGE_FILE_SELECT')
    console.log('IPC_IMAGE_FILE_SELECT')
  }
}

export default {
  // namespaced: true,
  state,
  mutations,
  actions
}
