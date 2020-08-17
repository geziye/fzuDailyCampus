## 注意

本项目只供学习交流，不可以用于其他用途，任何由于本项目导致的法律责任与作者本人无关
如果项目侵犯了您和您公司的利益，请立即联系作者删除。



## 需要的东西

1. 一个抓包软件 （Fiddler, Charles, Burp， ……)
2. 一台服务器 



## 最好是

1. 可爱的憨憨的前端的小哥哥

2. 可爱的前端的小哥哥

3. 可爱的小哥哥

4. 程序员

   排名分先后。

   不过不是也没关系，下面的流程对于不熟的你来说也不用花超过半个小时，但是可以一直带来学习收获。

## 自动化流程

1. 抓包获取cookie，注意要抓的包抓下面这个路径的或者类似的

   - /wec-counselor-collector-apps/stu/collector/detailCollector

   获取完cookie之后填写到文件夹conf/custom.config.ts 中的Cookie的位置

   注：一点都不懂抓包的可以看看这个教程(这个是ios手机的，对于安卓用户应该也是一样的)

   - https://www.jianshu.com/p/7242d4e8b179

2. 填写 custom.config.ts 中的defaults

   1. 填写规则应该是对于单选，文本框，级联选择框（填写居住地的）value的值是一个string
   2. 对于是复选框的，填写的值应该是一个string数组
   3. title要对应好每道题的title，顺序没有关系（~~这里如果辅导员出题目一样的会崩，不过大概率都不会一样，对吧~~）

3. 在你的服务器上安装node并设置全局变量（为了可以使用npm以及node）以及软连接（某些npm安装项需要用到）, npm和node出现版本号代表运行正常（对vim不了解的，可以上网查一查基本用法）

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
   
   ln -s /usr/local/nodejs/bin/node /usr/local/bin
   ln -s /usr/local/nodejs/bin/npm /usr/local/bin
   node -v
   npm -v
   ```

4. 随便找一个文件夹，下载依赖,我是在 usr/include（建议跟我一样，否则很多地方需要改动, 包括代码中的shell脚本） 目录下, 并将npm全局安装的模块添加到环境变量中

   ```
   mkdir campus_daily
   cd campus_daily
   mkdir log
   // 这里把文件放进去~ 可以通过xftp
   cd src
   vim run.sh
   // 命令行敲入 (这里的话windows下是doc, linux要运行的话要改为unix)
   set ff=unix
   npm config set registry https://registry.npm.taobao.org
   npm install -g typescript
   npm install -g ts-node
   npm install
   echo -e "export PATH=$(npm prefix -g)/bin:$PATH" >> ~/.bashrc && source ~/.bashrc
   ln -s /usr/local/nodejs/bin/node /usr/bin
   ln -s /usr/local/nodejs/bin/npm /usr/bin
   ```

5. 用linux自带的crontab设置定时任务, 在里面输入这些东西，注意路径会因为上面放的路径不同而不同,为了进程保活，大概30分钟用原来的cookie去请求，保证是保活的 

   ```
   crontab -e
   30 8 * * * cd /usr/include/campus_daily/ && sh ./src/run.sh
   */30 * * * * cd /usr/include/campus_daily/ && sh ./src/keep-alive.sh
   ```



## 维护相关

应该会一直维护下去，而且不会扩展业务，只供福州大学的学生进行交流。

## 版本相关

v1.0.0（现在） -> 仅仅支持今日校园疫情填报，还不支持疫情的每日签到，需要抓包暂时比较麻烦。 