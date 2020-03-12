import { ipcMain, dialog, BrowserWindow, Notification, shell } from 'electron'
import scan from '../util/scan'

import Controller from './controller'

const controller = new Controller()

/**
 * 渲染进程请求选择文件
 */
ipcMain.on('DRAW_OPTION', async (event, arg) => {
  console.log(arg)
  event.reply('DRAW_OPTION_REPLY', arg)
})

/**
 * 渲染进程请求选择文件
 */
ipcMain.on('IPC_FILE_SELECT', async (event, arg) => {
  const window = BrowserWindow.getFocusedWindow()
  const result = await dialog.showOpenDialog(window, {
    title: '选择文件',
    buttonLabel: '选择该文件',
    properties: [
      'openFile',
    ],
    message: '请选择一个'
  })
  if (result.canceled === false) {
    controller.IPC_FILE_SELECT(result.filePaths[0]);
    event.reply('IPC_FILE_SELECT_REPLY', result.filePaths[0])
  }
})

/**
 * 渲染进程请求扫描
 */
ipcMain.on('IPC_FILE_SCAN', async (event, { filePath }) => {
  const result = await controller.IPC_FILE_SCAN(filePath);
  event.reply('IPC_FILE_SCAN_REPLY', result);
})

/**
 * 渲染进程请求发送桌面通知
 */
ipcMain.on('IPC_SEND_NOTIFICATION', async (event, {
  title = 'Flex',
  body = ''
}) => {
  event.returnValue = Notification.isSupported()
  if (Notification.isSupported()) {
    const notification = new Notification({
      title,
      body
    })
    notification.show()
  }
})

/**
 * 渲染进程请求发送桌面通知
 */
ipcMain.on('IPC_SHOW_ITEM_IN_FOLDER', async (event, {
  itemPath
}) => {
  shell.showItemInFolder(itemPath)
})
