/* eslint-disable no-console */
// 配置
const CONFIG = {
  author: 'coppolo',
  version: '1.0.0',
}

// COPPOLO ASCII Logo
const COPPOLO_LOGO = `
_______________________________________________________________
┏┏┓┏┓┏┓┏┓┃┏┓
┗┗┛┣┛┣┛┗┛┗┗┛
_______________________________________________________________
`

console.log(JSON.stringify(COPPOLO_LOGO))

export function printLogo(): void {
  if (DEV) {
    console.log('[FakeUI]: dev mode.......')
    return
  }

  if (PROD) {
    const logoStyles = [
      'background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
      '-webkit-background-clip: text',
      '-webkit-text-fill-color: transparent',
      'font-size: 16px',
      'font-weight: bold',
      'line-height: 1.2',
      'letter-spacing: 2px',
    ].join(';')

    const authorStyles = [
      'color: #00CED1',
      'font-size: 14px',
      'font-weight: 600',
      'text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3)',
    ].join(';')

    const versionStyles = [
      'color: #9370DB',
      'font-size: 11px',
      'font-family: monospace',
    ].join(';')

    const easterEggStyles = [
      'color: #FF69B4',
      'font-size: 12px',
      'font-style: italic',
      'text-shadow: 1px 1px 2px rgba(255, 105, 180, 0.4)',
    ].join(';')

    // 清屏并打印
    console.info && console.info()

    // 打印 Logo
    console.info(`%c${COPPOLO_LOGO}`, logoStyles)

    // 打印分隔线
    console.info(`%c${'─'.repeat(40)}`, 'color: #667eea; font-size: 8px;')

    // 打印作者信息
    console.info(`%c🍍  crafted by ${CONFIG.author}  🍍`, authorStyles)

    // 打印版本信息
    console.info(`%c✨  Version ${CONFIG.version}  ✨`, versionStyles)

    // 打印分隔线
    console.info(`%c${'─'.repeat(40)}`, 'color: #764ba2; font-size: 8px;')

    // 添加点击彩蛋
    console.info('')
    console.info('%c💡 点击控制台探索更多惊喜...', easterEggStyles)
  }
}
