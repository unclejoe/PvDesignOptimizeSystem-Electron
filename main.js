'use strict'
const electron = require('electron');
const app = electron.app;
const BrowserWindow = require('browser-window');
const ipcMain = require('electron').ipcMain;
const nativeImage = require('electron').nativeImage;
const Menu = require('electron').Menu;
const dialog = require('electron').dialog;
var image = nativeImage.createFromPath('res/images/tray.png');

var mainWindow = null;

var template = [
  {
  	label: '文件',
  	submenu: [
  		{
  			label : '创建新项目',
  			accelerator : 'Ctrl+N',
        click : function(item, focusedWindow){
          if(focusedWindow){
            focusedWindow.loadURL('file://' + __dirname + '/newProject.html')
          }
        }
  		},
  		{
  			label : '打开项目',
  			accelerator : 'Ctrl+O',
        click : function(item, focusedWindow){
          if(focusedWindow){
            dialog.showOpenDialog(focusedWindow, {
              title : '打开项目',
              properties : ['openFile']
            })
          }
        }
  		},
  		{
  			type: 'separator'
  		},
      {
        label : '保存项目',
        accelerator : 'Ctrl+S',
      },
  		{
  			label : '退出',
  			accelerator : 'Ctrl+E',
        click : function(item, focusedWindow){
          dialog.showMessageBox(focusedWindow,{
            type : 'info',
            message :'确认退出？',
            buttons : ['确定' ,'取消']
          },function(res){
            if(res == 0){
              app.quit();
            }
          });
        }
  		}
  	]
  },
  {
    label: '编辑',
    submenu: [
      {
        label: '撤销',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        label: '重做',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: '剪切',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: '复制',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: '粘贴',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      }
    ]
  },
  {
    label: '视图',
    submenu: [
      {
        label: '切换全屏',
        accelerator: (function() {
          if (process.platform == 'darwin')
            return 'Ctrl+Command+F';
          else
            return 'F11';
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
      },
      {
        label: '开发者工具',
        accelerator: (function() {
          if (process.platform == 'darwin')
            return 'Alt+Command+I';
          else
            return 'Ctrl+Shift+I';
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.webContents.toggleDevTools();
        }
      },
    ]
  },
  {
    label: '窗口',
    role: 'window',
    submenu: [
      {
        label: '最小化',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: '关闭',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      }
    ]
  }
];

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

app.on('window-all-closed',function(){
	if(process.platform != 'darwin'){
		app.quit();
	}
});

app.on('ready',function(){
	mainWindow = new BrowserWindow({
		width : 1200,
		height : 800,
		title : 'PvDesignOptimizeSystem',
		icon : image,
    webPreferences : {
      webSecurity : false,
      plugins : true
    },
    minWidth : 1200,
    minHeight : 600
	});
	mainWindow.loadURL('file://' + __dirname + '/index.html');

	mainWindow.on('closed',function(){
		mainWindow = null;
	})
})