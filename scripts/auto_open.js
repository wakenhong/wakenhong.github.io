var spawn = require('child_process').exec;
// Hexo 2.x 用户复制这段
//hexo.on('new', function(path){
//  spawn('start  "typora编辑器绝对路径.exe" ' + path);
//});
//C:\Program Files\Typora\bin\typora.exe是typora编辑器在我本地的路径！
// Hexo 3 用户复制这段
hexo.on('new', function(data){
  spawn('start  "D:\software\Typora\Typora.exe" ' + data.path);
});