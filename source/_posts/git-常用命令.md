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

___

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

___

##  3.gitignore配置规则

![image-20211011110107993](https://cdn.jsdelivr.net/gh/wakenhong/cdn/image/2021/image-20211011110107993.png)

通常，在使用Git的项目上工作时，您会希望排除将特定文件或目录推送到远程存储库中的情况。

`.gitignore`文件指定Git应该忽略的未跟踪文件。

### 3.1应忽略哪些文件？

被忽略的文件通常是特定于平台的文件或从构建系统自动创建的文件。一些常见的例子包括：

- 运行时文件，例如日志，锁定，缓存或临时文件。
- 具有敏感信息的文件，例如密码或API密钥。
- 已编译的代码，例如`.class`或`.o`。
- 依赖目录，例如`/vendor`或`/node_modules`。
- 建立目录，例如`/public`，`/out`或`/dist`。
- 系统文件，例如`.DS_Store`或`Thumbs.db`
- IDE或[文本编辑器](https://www.myfreax.com/how-to-install-visual-studio-code-on-ubuntu-18-04/)配置文件。

### 3.2`.gitignore`模式

`.gitignore`文件是纯文本文件，其中每行包含一个模式，供文件或目录忽略。

`.gitignore`使用[ globbing pattern ](http://tldp.org/LDP/GNU-Linux-Tools-Summary/html/x11655.htm)来匹配带通配符的文件名。如果文件或目录包含通配符模式，则可以使用单个反斜杠（`\`）来转义字符。

### 3.3.评论

以井号（`#`）开头的行是注释，将被忽略。空行可以用来提高文件的可读性，并可以对相关的模式行进行分组。

### 3.4.斜线

斜杠符号（`/`）表示目录分隔符。模式开头的斜线相对于`.gitignore`所在的目录。

如果模式以斜杠开头，则仅在存储库根目录中匹配文件和目录。

如果模式不是以斜杠开头，则它将匹配任何目录或子目录中的文件和目录。

如果模式以斜杠结尾，则仅匹配目录。当目录被忽略时，其所有文件和子目录也将被忽略。

### 3.5.文学文件名

最直接的模式是没有任何特殊字符的文字文件名。

样式 示例匹配    `/access.log`  `access.log`   `access.log`  `access.log`
`logs/access.log`
`var/logs/access.log`   `build/`  `build`

### 3.6.通配符

**`\*`** -星号符号匹配零个或多个字符。

样式 示例匹配    

```
*.log`  `error.log`
`logs/debug.log`
`build/logs/error.log
```

**`\**`** -两个相邻的星号符号匹配任何文件或零个或多个目录。当后跟斜杠（`/`）时，它仅与目录匹配。

样式 示例匹配    `logs/**` 在`logs`目录中。   `**/build`  `var/build`
`pub/build`
`build`   `foo/**/bar` ​​ `foo/bar`
`foo/a/bar`
`foo/a/b/c/bar`

**`?`** -问号与任何单个字符匹配。

样式 示例匹配    `access?.log`  `access0.log`
`access1.log`
`accessA.log`   `foo??`  `fooab`
`foo23`
`foo0s`

### 3.7.方括号

**`[...]`** -匹配方括号中包含的任何字符。当两个字符之间用连字符`-`隔开时，表示一个字符范围。该范围包括这两个字符之间的所有字符。范围可以是字母或数字。

如果`[`之后的第一个字符是感叹号（`!`），则该模式匹配除指定集合中的字符以外的任何字符。

样式 示例匹配    `*.[oa]`  `file.o`
`file.a`   `*.[!oa]`  `file.s`
`file.1`
`file.0`   `access.[0-2].log`  `access.0.log`
`access.1.log`
`access.2.log`   `file.[a-c].out`  `file.a.out`
`file.b.out`
`file.c.out`   `file.[a-cx-z].out`  `file.a.out`
`file.b.out`
`file.c.out`
`file.x.out`
`file.y.out`
`file.z.out`   `access.[!0-2].log`  `access.3.log`
`access.4.log`
`access.Q.log`

### 3.8.反模式

以感叹号（`!`）开头的模式将否定（重新包括）先前模式忽略的任何文件。此规则的例外是，如果排除了其父目录，则重新包含文件。

样式 示例匹配    `*.log`
`!error.log`  `error.log`或`logs/error.log`将不会被忽略

### 3.9.`.gitignore`范例

以下是`.gitignore`文件的外观示例：

```bash
# Ignore the node_modules directory
node_modules/

# Ignore Logs
logs
*.log

# Ignore the build directory
/dist

# The file containing environment variables 
.env

# Ignore IDE specific files
.idea/
.vscode/
*.sw*
```

### 3.10本地`.gitignore`

本地`.gitignore`文件通常放置在存储库的根目录中。但是，您可以在存储库的不同子目录中创建多个`.gitignore`文件。 `.gitignore`文件中的模式相对于文件所在目录匹配。

在子目录中的文件中定义的模式优先于较高级目录中的模式。

本地`.gitignore`文件与其他开发人员共享，并且应包含对存储库的所有其他用户有用的模式。

### 3.11.全局`.gitignore`

Git还允许您创建全局`.gitignore`文件，您可以在其中为本地系统上的每个Git存储库定义忽略规则。

该文件可以命名为任意名称，并存储在任何位置。保留此文件的最常见位置是主目录。您必须手动[创建文件](https://www.myfreax.com/create-a-file-in-linux/)并将Git配置为使用它。

例如，要将`~/.gitignore_global`设置为全局Git忽略文件，您可以执行以下操作：

创建文件：

```bash
touch ~/.gitignore_global
```

将文件添加到Git配置：

```bash
git config --global core.excludesfile ~/.gitignore_global
```

使用文本编辑器打开文件并向其中添加规则。

全局规则对于忽略您永远不想提交的特定文件（例如带有敏感信息或已编译的可执行文件的文件）特别有用。

### 3.12.忽略以前提交的文件

您的工作副本中的文件可以被追踪，也可以未被追踪。

要忽略先前提交的文件，您需要取消暂存并从索引中删除该文件，然后在`.gitignore`中为该文件添加规则：

```bash
git rm --cached filename
```

`--cached`选项告诉git不要从工作树中删除文件，而只是从索引中删除它。

要递归删除目录，请使用`-r`选项：

```bash
git rm --cached filename
```

如果要从索引和本地文件系统中删除文件，请忽略`--cached`选项。

以递归方式删除文件时，使用`-n`选项将执行“空运行”并显示要删除的文件：

```bash
git rm -r -n directory
```

