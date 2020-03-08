import fs from 'fs'
import { ipcMain, dialog, BrowserWindow, Notification, shell } from 'electron'
// import scan from '../util/scan'

/**
 * 渲染进程请求选择扫描的文件夹
 */
ipcMain.handle('IPC_IMAGE_FILE_SELECT', async (event, arg) => {
  console.log(event)
  const window = BrowserWindow.getFocusedWindow()
  const result = await dialog.showOpenDialog(window, {
    filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png'] }],
    properties: ['openFile']
  })
  if (result.canceled === false) {
    event.reply('IPC_IMAGE_FILE_SELECT', result.filePaths[0])
  }
})
ipcMain.on('IPC_IMAGE_FILE_SELECT', async (event, arg) => {
  console.log(event)
  const window = BrowserWindow.getFocusedWindow()
  const result = await dialog.showOpenDialog(window, {
    filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png'] }],
    properties: ['openFile']
  })
  if (result.canceled === false) {
    event.reply('IPC_IMAGE_FILE_SELECT', result.filePaths[0])
  }
})