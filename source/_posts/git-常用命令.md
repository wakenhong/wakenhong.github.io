---
title: git 常用命令
cover: false
toc: true
abbrlink: d48e
date: 2021-10-10 21:27:31
categories: 工具类
tags: git
author: 潇潇暮雨
img: https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/git-1.png
summary:
keywords: git常用命令 
---

# git 常用命令

![Basic GIT Commands: A Complete Cheat Sheet for Beginners](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/git-1.png)

## 1.git几个概念名字

![img](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/bg2015120901.png)

- Workspace：工作区
- Index / Stage：暂存区
- Repository：仓库区（或本地仓库）
- Remote：远程仓库

### 1.新建代码库

> ```bash
> # 在当前目录新建一个Git代码库
> $ git init
> 
> # 新建一个目录，将其初始化为Git代码库
> $ git init [project-name]
> 
> # 下载一个项目和它的整个代码历史
> $ git clone [url]
> ```

### 2.配置

Git的设置文件为`.gitconfig`，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置）。

> ```bash
> # 显示当前的Git配置
> $ git config --list
> 
> # 编辑Git配置文件
> $ git config -e [--global]
> 
> # 设置提交代码时的用户信息
> $ git config [--global] user.name "[name]"
> $ git config [--global] user.email "[email address]"
> ```

## 2.命令及说明

### 1.远程拉取分支到本地

```yaml
git checkout -b 本地分支名 origin/远程分支名
```

### 2.查看本地分支

```yaml
git branch
```

### 3.查看远程分支

```yaml
git branch -r
```

### 4.查看所有分支

```yaml
git branch -a
```

### 5.新建一个本地分支

```yaml
git branch 本地分支名
```

### 6.新建一个本地分支并且切换到新分支

```yaml
git checkout -b 本地分支名
```

### 7.切换分支

```yaml
git checkout 分支名
```

### 8.将本地分支与远程分支关联

```yaml
git branch -u origin/分支名   其中origin/分支名 中分支名 为远程分支名
#或使用下面命令
git branch --set-upstream-to origin/分支名
```

### 9.查看本地分支与远程分支的映射关系

```yaml
git branch -vv
```

### 10. 撤销本地分支与远程分支的关联

```yaml
git branch --unset-upstream
```

###  11.拉取远程分支

```yaml
git fetch origin（不指定分支名就是远程全部分支)
git fetch origin XXX(拉下远程指定的分支
```

### 12.删除本地的分支

```yaml
git branch -d XXX
```

### 13.删除远程仓库的 分支

```
git push origin --delete XXX
```

### 14.合并分支

例如：想将 dev 分支合并到 master 分支，操作如下：

```yaml
git  checkout master    //切换到master分支上
git pull origin master  //把远程分支pull下去，及时更新
git  merge dev          //把dev分支的代码合并到master上
git branch --merged     //只是为了确认所有内容都已合并，请运行以下命令：
git status              // 查看状态
git push origin master  //push到远程分支
```

- 其他命令

  ```
  更新远程分支列表
  git remote update origin --prune
  
  查看所有分支
  git branch -a
  
  删除远程分支Chapater6
  git push origin --delete Chapater6
  
  删除本地分支 Chapater6
  git branch -d  Chapater6
  ```

### 15.推送本地分支到远程分支

```yaml
//远程先开好分支然后拉到本地
git checkout -b feature origin/feature //检出远程的feature分支到本地

//本地先开好分支然后推送到远程
git checkout -b feature    //创建并切换到分支feature  
git push origin feature:feature  //推送本地的feature(冒号前面的)分支到远程origin的feature(冒号后面的)分支(没有会自动创建)
```

### 16.保存当前工作进度

```yaml
保存当前工作进度
git stash

添加一些注释
git stash save 'message...'

恢复最新的进度到工作区
git stash pop
```

### 17.用于比较两次修改的差异

```yaml
工作区与暂存区(默认)
git diff 

Git仓库 vs Git仓库
git diff <commit> <commit>

暂存区 vs Git仓库
git diff --cached <filename>
```

### 18. git tag 给当前分支打标签

```yaml
列出当前分支所有标签
git tag

查看标签版本信息
git show v0.1.2

打标签（轻量标签和附注标签）
git tag v0.1.2  （标签版本）
git tag -a v0.1.2 -m '0.1.2版本'  (带标注的标签)

# 补打标签
git tag -a v0.1.2 9fbc3d0  （为之前的版本补打标签）    

删除标签
git tag -d v0.1.2   删除标签

标签发布（git push 不会将标签对象提交到git服务器）
git push origin v0.1.2    # 将v0.1.2标签提交到git服务器
git push origin –-tags     # 将本地所有标签一次性提交到git服务器
```

### 19.远程分支覆盖本地分支（慎用）

```yaml
git fetch --all  (拉取所有分支)
git reset --hard origin/master (master指定远程的分支)
git pull
```

### 20.本地分支覆盖远程分支（慎用）

```yaml
git push origin 分支名 --force       (远程分支名)
```

### 21.git取消对文件夹的追踪

- 列出需要取消跟踪的文件

```bash
# 需要取消追踪的文件是target目录
git rm -r -n --cached ./mavenparent/maven-admin/target/
```

- 去除缓存不想要跟踪的文件

```bash
git rm -r --cached ./mavenparent/maven-admin/target/
```

- 在本地仓库的根目录下新建.gitignore 文件(若有这个文件那么进行编辑即可)，添加你希望忽略的文件/目录

```bash
# 忽略当前目录下mavenparent目录下maven-admin目录下的target目录文件
/mavenparent/maven-admin/target/
```

- 提交文件 (会出现确认需要提交哪些文件 记得==将需要取消的文件前面的#去掉==)

```bash
git commit

# 提交的文件 取消deleted前面的 “#”
deleted:    mavenparent/maven-admin/target/classes/com/leiwu/architecture/maven/admin/AdminBase.class
deleted:    mavenparent/maven-admin/target/maven-admin.war
deleted:    mavenparent/maven-admin/target/maven-admin/META-INF/MANIFEST.MF

# 保存提交的文件
```

- 将修改的 .ignore文件 commit上去

```bash
git add .gitignore
git commit

# 修改提交的文件 ---- 去除前面的 # 号
On branch master
Changes to be committed:
modified:   .gitignore

# 保存提交的文件
```

- 使用命令查看当前工作区是否有未提交的文件

```bash
git status

# 修改上面取消追踪的文件 再使用命令查看 此文件是否被git追踪
```



