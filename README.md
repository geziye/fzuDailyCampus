## 注意

本项目只供学习交流，任何由于本项目导致的间接或直接的法律责任与作者无关，如果项目侵犯了您和您公司的利益，请立即联系作者删除。

## 需要的东西

1. 一个抓包软件 （Fiddler, Charles, Burp， ……)

2. 一台服务器 （LINUX）

   

## 最好是

1. 可爱的憨憨的前端的小哥哥

2. 可爱的前端的小哥哥

3. 程序员小哥哥

  如果不是的话，建议找程序员小哥哥帮忙，下面的操作对于不懂的你来说可能需要花费几个小时，对于程序员小哥哥一般三十分钟内就可以解决了。

## 自动化流程

1. 抓包获取cookie，注意要抓的包抓下面这个路径的或者类似的

- /wec-counselor-collector-apps/stu/collector/detailCollector

  获取完cookie之后填写到文件夹conf/custom.config.ts 中的Cookie的位置

  注：一点都不懂抓包的可以看看这个教程(这个是ios手机的，对于安卓用户应该也是一样的)

- https://www.jianshu.com/p/7242d4e8b179

2. 填写 custom.config.ts 中的 userEmail 和 emailSecret (用于发送邮件给你自己，例如自动填报成功还是失败，不写问题也不大，就是没有邮件提醒了)
   1. 首先进入QQ邮箱，左上角点击设置
   2. 进入设置界面，左上角点击账户
   3. 进入账户界面往下拉 开启服务 POP3/SMTP服务 ([如何使用 Foxmail 等软件收发邮件？](http://service.mail.qq.com/cgi-bin/help?subtype=1&&id=28&&no=371))
   4. 然后开启后会给你一个授权码，填入emailSecret
   5. userEmail就填你这个邮箱
3. 根据提示填写其他的信息，关于经纬度的信息，可以从百度地图等地方获取

- http://api.map.baidu.com/lbsapi/getpoint/index.html

4. 在你的服务器上安装node并设置全局变量（为了可以使用npm以及node）以及软连接（某些npm安装项需要用到）, npm和node出现版本号代表运行正常（对vim不了解的，可以上网查一查基本用法）

  ```
  wget https://nodejs.org/dist/v12.18.3/node-v12.18.3-linux-x64.tar.xz
  tar xf node-v12.18.3-linux-x64.tar.xz -C /usr/local/
  cd /usr/local/
  mv node-v12.18.3-linux-x64 nodejs
  // 以下为修改 /etc/profile文件
  vim /etc/profile
  // 在末尾追加以下内容
  export PATH="$PATH:/usr/local/nodejs/bin"
  // 使生效
  source /etc/profile
  ln -s /usr/local/nodejs/bin/node /usr/bin
  ln -s /usr/local/nodejs/bin/npm /usr/bin
  node -v
  npm -v
  ```

5. 随便找一个文件夹，下载依赖,我是在 usr/include（建议跟我一样，否则很多地方需要改动, 包括代码中的shell脚本） 目录下, 并将npm全局安装的模块添加到环境变量中

  ```
  mkdir campus_daily
  cd campus_daily
  mkdir log
  // 这里把文件放进去~ 可以通过xftp
  cd src
  // vim 退出可以在冒号的情况下输入wq 退出
  vim sign.sh
  set ff=unix
  npm config set registry https://registry.npm.taobao.org
  npm install -g typescript
  npm install -g ts-node
  npm install
  echo -e "export PATH=$(npm prefix -g)/bin:$PATH" >> ~/.bashrc && source ~/.bashrc
  ```

6. linux自带的crontab设置定时任务, 在里面输入这些东西，注意路径会因为上面放的路径不同而不同,为了进程保活，大概30分钟用原来的cookie去请求，保证是保活的 

  ```
  // 命令行输入
  crontab -e
  // 然后在vim里面敲
  30 7 * * * cd /usr/include/campus_daily/ && sh ./src/sign.sh
  30 11 * * * cd /usr/include/campus_daily/ && sh ./src/sign.sh
  30 21 * * * cd /usr/include/campus_daily/ && sh ./src/sign.sh
  */30 * * * * cd /usr/include/campus_daily/ && sh ./src/keep-alive.sh
  // 上面的格式是 分钟 小时 
  // 如果是 30 9 * * * 就是九点三十分钟提交，可以自行设置
  ```



## 维护相关

应该会一直维护下去，而且不会扩展业务，只供福州大学的学生进行交流。



## 版本相关

| 版本号       | 更新信息                                                     |
| ------------ | ------------------------------------------------------------ |
| v1.0.0       | 仅仅支持今日校园疫情填报，还不支持疫情的每日签到，需要抓包暂时比较麻烦。 |
| v1.0.1       | 支持今日校园的每日签到，且提供反馈至用户填写邮箱。           |
| v1.0.2(现在) | 目前开始支持今日校园的每日三报,可视化界面不做了              |



## 其他

- 作者的其他联系方式暂时不公布，a little scared…… 有问题可以提issue