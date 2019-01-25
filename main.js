const { app, BrowserWindow } = require('electron');

// 浏览器引用
let window;
let isDev=true;
require('electron-debug')({ enabled: true, showDevTools: false });

const autoUpdater = require('./app/updater')(window);

// 用于添加Chromium插件
function createDevTools() {
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS,
  } = require('electron-devtools-installer');
  // 安装devtron
  const devtronExtension = require('devtron');
  devtronExtension.install();
  // 安装React开发者工具
  installExtension(REACT_DEVELOPER_TOOLS);
  installExtension(REDUX_DEVTOOLS);
}




// 创建浏览器窗口函数
let createWindow = () => {
    // 创建浏览器窗口
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            webSecurity: false,
        },
    });
    if(isDev){
        window.loadURL('http://localhost:3000');
    }else{
        // 加载应用中的index.html文件
        window.loadFile('./build/index.html/');
    }
   

    // 当window被关闭时，除掉window的引用
    window.on('closed', () => {
        window = null;
    });
};

// 当app准备就绪时候开启窗口
app.on('ready', createWindow);
app.on('ready', () => {
    createWindow();
    // 只在开发环境加载开发者工具
    isDev && createDevTools();
    autoUpdater.checkForUpdatesAndNotify();
  });
// 当全部窗口都被关闭之后推出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// 在macos上，单击dock图标并且没有其他窗口打开的时候，重新创建一个窗口
app.on('activate', () => {
    if (window == null) {
        createWindow();
    }
});