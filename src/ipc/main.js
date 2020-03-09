import { ipcMain, dialog, BrowserWindow, Notification, shell } from 'electron'
import scan from '../util/scan'
import { image2base64 } from '../util/util'

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
    event.reply('IPC_FILE_SELECT_REPLY', result.filePaths[0])
  }
})

/**
 * 渲染进程请求扫描
 */
ipcMain.on('IPC_FILE_SCAN', async (event, { filePath }) => {
  const result = await image2base64(filePath);
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
