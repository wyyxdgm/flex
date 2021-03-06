import { ipcRenderer } from 'electron'
import store from '../store'

export default function() {
  // 接收绘图的结果
  ipcRenderer.on(
    'DRAW_OPTION_REPLY',
    (event, arg) => {
      store.commit('DRAW_OPTION_UPDATE', arg)
    }
  )
  // 接收选择的结果
  ipcRenderer.on(
    'IPC_FILE_SELECT_REPLY',
    (event, arg) => {
      store.commit('SCAN_FILE_PATH_UPDATE', arg)
      store.commit('IPC_FILE_SCAN')
    }
  )
  // DRAW_OPTION_REPLY
  // 接收返回的扫描结果
  ipcRenderer.on(
    'IPC_FILE_SCAN_REPLY',
    (event, arg) => store.commit('SCAN_RESULT_UPDATE', arg)
  )
}
