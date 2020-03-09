import fs from 'fs'
import path from 'path'
import { BrowserWindow, dialog } from 'electron'

/**
 * 返回传入文件的子文件数据
 * @param {Object} param0 {String} folderPath 路径
 * @param {Object} param0 {Boolean} needCheckIsFolder 判断传入的是否为
 */
async function scan ({
	folderPath,
	needCheckIsFolder = false,
	rootFolderPath = folderPath
}) {
	let result = []
	// 防止拖拽导入的路径不是，这个判断只在递归的第一次触发
	if (needCheckIsFolder && !await fs.statSync(folderPath).isDirectory()) {
		dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
			type: 'error',
			message: '检测到非输入',
			detail: '请选择或者将拖入程序窗口'
		})
		return result
	}
	// 获得的内容
	const files = await fs.readdirSync(folderPath)
	for (const filename of files) {
		// path
		const filePathFull = path.join(folderPath, filename)
		const filePathRelative = filePathFull.replace(rootFolderPath, '')
		// stat
		const stat = await fs.statSync(filePathFull)
		const isFile = stat.isFile()
		const isDirectory = stat.isDirectory()
		result.push({
			// stat
			stat: {
				...stat,
				isFile,
				isDirectory
			},
			// path
			filePathRelative,
			filePathRelativeParsed: path.parse(filePathRelative),
			filePathFull,
			filePathFullParsed: path.parse(filePathFull),
			// 如果是，其子文件或者子
			children: isDirectory ? await scan({
				folderPath: filePathFull,
				rootFolderPath
			}) : []
		})
	}
	return result
}

function saveFile (fileName = '', text = '') {
	const writeData = new Uint8Array(Buffer.from(text))
	fs.writeFile(`./${fileName}`, writeData, (err) => {
		if (err) throw err
		console.log('文件已被保存')
	})
}

// ;(async function () {
// 	saveFile('数据.txt', JSON.stringify(await scan(path.resolve('/Users/liyang/Documents/code/blog')), null, 2))
// })()

export default scan
