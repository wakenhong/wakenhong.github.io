---
title: windows 安装wsl2
top: false
cover: false
toc: true
mathjax: false
abbrlink: f43b
date: 2021-10-08 14:04:52
author: 潇潇暮雨
img: https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/image-20211008214832466.png
coverImg: https://cdn.jsdelivr.net/gh/wakenhong/cdn/site/blog/medias/featureimages/23.jpg
password:
summary:
keywords:
tags:
categories:
---



# Linux (WSL2)  in Windows 10

## 访问子系统文件方法

###  在要浏览的Linux环境的Windows子系统中，运行以下命令 `explorer.exe .`

![image-20211008141453850](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/image-20211008141453850.png)

### 在文件资源路径中搜索  `\\wsl$`

![image-20211008141323242](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/image-20211008141323242.png)

## wsl 命令

### 查看帮助

```yaml
wsl -h
```

### 设置默认版本，选择linux默认运行在 **wsl1** 还是 **wsl2**

```yaml
wsl --set-default-version 2
```

### 设置 某个linux发行版运行版本,需要先安装好 linux 后才可以转换

```yaml
wsl --set-version <distro> 2   eg:wsl --set-version ubuntu 1
```

### ubuntu 版本转换

```yaml
wsl --set-version ubuntu 2
```

### 查看安装的 linux

```yaml
wsl --list --verbose 或 wsl -l -v
```

### 停止所用运行Linux

```yaml
wsl --shutdowny
```

### 修改root用户密码

- `wsl 默认是没有设置root密码的`

- 设置 root 用户密码，这样要输三次命令，第一次当前用户密码，后两次就是设置密码以及确认密码

  ```yaml
  # 语法： sudo passwd 用户名 
  sudo passwd root
  
  ```

- **password updated successfully** 代表密码更新成功 

-  切换用户

  ```yaml
   # 语法： su 用户名 
  su root
  ```

###  修个设置默认用户

####  查看自己安装的哪个版本![image-20211008151611822](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/image-20211008151611822.png)

*查看修改命令*，输入`ubuntu2004 /? `按回车会自动补全版本对应的命令 不要输入`ubuntu`要不然进入子系统了

![image-20211008151717515](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/image-20211008151717515.png)

#### 设置默认用户

```yaml
语法: ubuntu2004 config --default-user 用户名(已存在)
PS C:\WINDOWS\system32> ubuntu2004 config --default-user root
没有报错就代表成功
```

重新打开已经是root用户了![image-20211008151948185](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/image-20211008151948185.png)

### 启动虚拟机

- 直接输入 系统名称：如 Ubuntu 、kali等 直接进入

- 或使用 wsl命令，例如

  ```yaml
  wsl -d ubuntu
  ```

## 安装wsl 分发版

### 安装 linux

- 打开 应用商店（ [Microsoft Store](https://aka.ms/wslstore)），搜索 **wsl** ,商店提供 ，`ubuntu`,`SUSE Linux Enterprise Server 12`,`Debian`,`Kail Linux`

- 安装 ubuntu

- 设置用户名密码

- 设置 root密码

  ```yaml
  sudo passwd root
  ```

### wsl 分发版上安装docker

```
 sudo apt-get update
  sudo apt-get install -y \
      apt-transport-https \
      ca-certificates \
      curl \
      gnupg-agent \
      software-properties-common
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  sudo add-apt-repository \
     "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
     $(lsb_release -cs) \
     stable"
  sudo apt-get update
  sudo apt-get install docker-ce docker-ce-cli containerd.io
```

### docker相关命令

#### 启动docker

```yaml
sudo service docker start
```

#### 运行容器测试

```yaml
sudo docker run hello-world
```

#### docker 以普通用户执行

```yaml
sudo usermod -aG docker your-user
sudo service docker restart
```

#### windows 网络访问 linux

- 运行 nginx容器

  ```yaml
  docker run --name nginx -d -p 8888:80 nginx   
  run：表示运行容器  --name：指定容器名称 -d：表示进程在后台运行  -p：指定映射端口 8888为外部访问端口 ，80位容器内部端口 nginx:依赖表示镜像名称 可以带参数指定版本号
  ```

- linux子系统内部访问

  ```yaml
  curl http://127.0.0.1:8888
  ```

- windows访问

  1. 查看 linuxIp

     ```yaml
     ip addr
     ```

  2. 查看 eth0 ip,这里是 `192.168.161.203` 每个机器的都不一样

     - 访问：打开浏览器，访问 `http://192.168.161.203:8888` 得到nginx页面
     - 访问 `http://127.0.0.1:8888` 得不到结果，拒绝访问

#### ubuntu 重启系统

- 在Linux 执行 重启或关机命令，会报错，需要执行 `wsl`命令

  ```yaml
  ziyun@DESKTOP-JVE2TQQ:/mnt/c/WINDOWS/system32$ sudo reboot
  System has not been booted with systemd as init system (PID 1). Can't operate.
  Failed to talk to init daemon.
  ziyun@DESKTOP-JVE2TQQ:/mnt/c/WINDOWS/system32$ sudo shutdown
  System has not been booted with systemd as init system (PID 1). Can't operate.
  ziyun@DESKTOP-JVE2TQQ:/mnt/c/WINDOWS/system32$
  ```

- 终止所有运行的linux

  ```yaml
  wsl --shutdown
  ```

- 终止指定的linux

  ```yaml
  wsl --terminate <distro>
  # 或 
  wsl -t <distro>   
  ```

- 查看 linux子系统列表

  ```yaml
  wsl -l  
  ```

- 关闭 ubutnu ,关闭没有任何显示

  ```yaml
  wsl -t Ubuntu
  ```

- 启动 ubuntu

  ```yaml
  - 执行 `wsl -d ubuntu`
  - 或者输入 ubuntu
  ```

#### 将ubuntu导出 安装的默认C盘目录

- 导出到d盘dev目录

  ```yaml
  wsl --export Ubuntu D:/dev/ubuntu.tar  这个不能在系统终端上执行 ，需要在主系统上终端执行
  ```

- 导入

  ```yaml
  wsl --import Ubuntu D:/dev/Ubuntu  D:/dev/ubuntu.tar
  说明
  - –import :导入
  - ubuntu: 导入名称，可自定义
  - D:/dev/Ubuntu : 导入到那个目录，导入成功，有 ext4.vhdx 文件
  - D:/dev/ubuntu.tar： 源文件
  ```

#### win10中WSL 2运行的Docker Desktop运行文件从C盘迁移到其他目录

> `**WSL**` 
>
> 适用于 Linux 的 Windows 子系统，★适用于 Linux 的 Windows 子系统可让开发人员按原样运行 GNU/Linux 环境 - 包括大多数[命令行工具](https://cloud.tencent.com/product/cli?from=10680)、实用工具和应用程序 - 且不会产生虚拟机开销。 ”
>
> **什么是 WSL 2？**
>
> ★WSL 2 是适用于 Linux 的 Windows 子系统体系结构的一个新版本，它支持适用于 Linux 的 Windows 子系统在 Windows 上运行 ELF64 Linux 二进制文件。它的主要目标是提高文件系统性能，以及添加完全的系统调用兼容性。 ”

- 启用 WSL 后，docker 运行数据都在 WSL 发行版中，文件位置都只能由 WSL 管理！安装 docker 后，docker 会自动创建 2 个发行版：

  - docker-desktop
  - docker-desktop-data![image-20211008174721649](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/image-20211008174721649.png)

- WSL 发行版默认都是安装在 C 盘，在`%LOCALAPPDATA%/Docker/wsl` 目录 docker 的运行数据、镜像文件都存在`%LOCALAPPDATA%/Docker/wsl/data/ext4.vhdx `中，C盘空间不大的没玩多久就要紧张了。。。

- 网上查了一下 wsl 发行版迁移，几乎都是说使用 LxRunOffline.exe

  经过我试验，LxRunOffline.exe 确实可以迁移自己安装的发行版，却迁移不了wsl2 安装docker 自动创建的 2 个发行版

  后面只好查别的方法

- 下面是操作方法：

  1. 首先关闭 docker

  2. 关闭所有发行版：`wsl --shutdown`

  3. 将 docker-desktop-data 导出到 `D:\SoftwareData\wsl\docker-desktop-data\docker-desktop-data.tar`（注意，原有的 docker images 不会一起导出）

  ```yaml
  	wsl --export docker-desktop-data D:\SoftwareData\wsl\docker-desktop-data\docker-desktop-data.tar
  ```

  4. 注销 docker-desktop-data：`wsl --unregister docker-desktop-data`

  5. 重新导入 docker-desktop-data 到要存放的文件夹：D:\SoftwareData\wsl\docker-desktop-data\：

     ```yaml
     wsl --import docker-desktop-data D:\SoftwareData\wsl\docker-desktop-data\ D:\SoftwareData\wsl\docker-desktop-data\docker-desktop-data.tar --version 2
     ```

     ![image-20211008175644724](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/image-20211008175644724.png)

6. 只需要迁移 docker-desktop-data 一个发行版就行，另外一个不用管，它占用空间很小。

   完成以上操作后，原来的`%LOCALAPPDATA%/Docker/wsl/data/ext4.vhdx` 就迁移到新目录了：

![image-20211008175725622](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/image-20211008175725622.png)

#### 国内加速地址

1. Docker中国区官方镜像： https://registry.docker-cn.com
2. 腾讯源： https://mirror.ccs.tencentyun.com
3. 网易： http://hub-mirror.c.163.com
4. 中科大： https://docker.mirrors.ustc.edu.cn

#### Docker 配置国内镜像源加速](https://www.cnblogs.com/cao-lei/p/14448052.html)

```yaml
vi /etc/docker/daemon.json 
# 内容如下： 
{  
"registry-mirrors": [    
"https://xx4bwyg2.mirror.aliyuncs.com",    
"http://f1361db2.m.daocloud.io",    
"https://registry.docker-cn.com",    
"http://hub-mirror.c.163.com",    
"https://docker.mirrors.ustc.edu.cn"  
] 
}{} 
# 退出并保存 :wq 
# 使配置生效   systemctl daemon-reload 
# 重启         Docker systemctl restart docker
```

## 参考文章

> https://cloud.tencent.com/developer/article/1679501?from=article.detail.1594940
>
> https://www.hdboy.top/show/35
>
> https://blog.csdn.net/qq_38856939/article/details/116528514

