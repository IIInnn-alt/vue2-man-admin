<!--
 * @Author: mn
 * @Date: 2022-12-09 15:36:00
 * @LastEditors: mn
 * @LastEditTime: 2023-05-05 13:35:53
 * @Description: 
-->
<template>
  <div class="app-container">
    <m-card>
      <div slot="header" class="headerLabel">git</div>
      <div>
        <h3>配置用户名和邮件地址</h3>
        <span>
          your username 表示你的 github 用户名,your email 表示你的 github 邮箱地址,
          --global去掉可以给仓库单独设立账号和密码
        </span>
        <p>git config --global user.name 'your username'</p>
        <p>git config --global user.email 'your email'</p>
        <hr />
        <h3>查看配置信息</h3>
        <span>查看所有信息，最后两项是你的用户名和邮箱</span>
        <p>git config --list</p>
        <span>查看某一配置，其中 &lt;key &gt; 表示你需要看的配置信息属性，比如查看用户名就是 git config user.name</span>
        <p>git config &lt;key &gt;</p>
        <h3>跟踪文件（即将文件纳入 git 的管理之中）</h3>
        <span>. 表示当前目录（即管理该目录下的所有文件），也可以指定文件名以 只管理该文件</span>
        <p>git add . （暂存区）</p>
        <span>提交文件到本地仓库，其中 disc 表示对该次提交的描述信息</span>
        <p>git commit -m &lt;disc&gt;</p>
        <h3>添加远程仓库</h3>
        <span>
          &lt;shortname&gt; 表示你给这个远程仓库添加的名字，供上传代码到 github 使用，&lt;url&gt; 表示远程仓库的地址
        </span>
        <p>git remote add &lt;shortname&gt; &lt;url&gt;</p>
        <h3>查看远程仓库名。克隆的仓库默认名为 origin</h3>
        <span>[-v] 是可选项，指定 -v 选项会同时给出远程仓库的 URL</span>
        <p>git remote [-v]</p>
        <h3>提交到远程仓库</h3>
        <span>git push &lt;shortname&gt; master</span>
        <h3>开发新的功能了最好放在新的分支上，在合并到主分支 1.要切换到主分支路径上，在合并新功能所在的子分支</h3>
        <span>git branch 查看所有分支</span>
        <br />
        <span>git branch -a 查看远程分支</span>
        <br />
        <span>git branch [branch-name] 创建本地分支</span>
        <br />
        <span>git checkout -b [branch-name] 切换分支</span>
        <br />
        <span>git fetch 获取远程所有分支</span>
        <br />
        <span>git merge [branch-name] 合并指定分支到当前分支</span>
        <br />
        <span>git stash 暂存工作区修改的内容</span>
        <br />
        <span>git stash pop 和git stash相反,git stash pop 是恢复暂存的工作区内容，默认恢复最新一次stash</span>
        <br />
        <span>git stash list 查询工作区所有stash的列表</span>
        <br />
        <span>git stash apply 指定恢复git stash apply [stash@`{`2`}]名字</span>
        <br />
        <span>git stash clear 清空stash</span>
        <br />
        <span>git add . 添加当前目录的所有文件到暂存区</span>
        <br />
        <span>git commit -m 'XXX' 提交暂存区到仓库区</span>
        <br />
        <span>git pull 取回远程仓库的变化，并与本地分支合并</span>
        <br />
        <span>git push 上传本地指定分支到远程</span>
        <br />
        <span>git log 显示当前分支的版本历史</span>
      </div>
    </m-card>
    <m-card>
      <div slot="header" class="headerLabel">git 如何修改分支名</div>
      <ul>
        <li>1.重命名分支: git branch -m oldBranch newBranch</li>
        <h3>
          注意，如果修改的分支只是在本地，还没有推送到远程，只需要执行该操作即可。后面的操作步骤是针对已经推送到远程的分支
        </h3>
        <li>2、删除远程分支: git push --delete origin oldBranch</li>
        <li>3、上传新命名的本地分支 : git push origin newBranch</li>
        <li>4、本地分支与远程分支关联: git branch --set-upstream-to origin/newBranch</li>
        <li>其中,第3、4步命令也可以直接用下面的命令代替: git push -u origin newBranch</li>
      </ul>
    </m-card>
    <m-card>
      <div slot="header" class="headerLabel">git 如何将某A分支的部分代码合并到B分支上面</div>
      <ul>
        <li>1.A分支: git log查看日志,自己提交的该功能对应的hash值</li>
        <li>
          2、切换到B分支:通过git cherry-pick [commit对应的hash1值、hash2值]
          将当前hash对应提交的代码合并到B分支上去,注意hash1时间必须早于hash2
        </li>
        <li>3、在B分支上、可以恢复工作区的提交(A传入过来的),然后查看代码</li>
      </ul>
    </m-card>
    <m-card>
      <div slot="header" class="headerLabel">git commit规范</div>
      <ul>
        <li>feat: 新增feature</li>
        <li>fix: 修复bug</li>
        <li>lierf: 更改代码，以提高性能（在不影响代码内部行为的前提下，对程序性能进行优化）</li>
        <li>refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）</li>
        <li>docs: 文档修改</li>
        <li>style: 代码格式修改, 注意不是 css 修改（例如分号修改）</li>
        <li>test:测试用例,包括单元测试，集成测试等</li>
        <li>revert:回滚到上一个版本</li>
        <li>build: 影响项目构建或依赖项修改</li>
        <li>revert: 恢复上一次提交</li>
        <li>ci: 持续集成相关文件修改</li>
        <li>release: 发布新版本</li>
        <li>workflow: 工作流相关文件修改</li>
        <li>chore: 其他修改（不在上述类型中的修改）改变构建流程，或者增加依赖库，工具等</li>
      </ul>
    </m-card>
    <m-card>
      <div slot="header" class="headerLabel">常见报错</div>
      <div>
        <h3>
          fatal: unable to access 'https://github.com/qdleader/qdleader.git/': Failed to connect to github.com port 443:
          Timed out
        </h3>
        <span>1、连接超时,首先找到git的安装目录,找到/etc/ssh/ssh_config文件</span>
        <br />
        <span>在cmd中输入: where git 查看git的安装目录</span>
        <p>复制这几句到该文件最后</p>
        <span>Host github.com</span>
        <br />
        <span>User git</span>
        <br />
        <span>Hostname ssh.github.com</span>
        <br />
        <span>PreferredAuthentications publickey</span>
        <br />
        <span>IdentityFile ~/.ssh/id_rsa</span>
        <br />
        <span>Port 443</span>
        <h3>git push时出现 fetal:unable to access “https://github.com/...“错误</h3>
        <span>git config --global --unset http.proxy #取消http代理</span>
        <br />
        <span>git config --global --unset https.proxy #取消https代理</span>
        <p>然后新开一个命令窗口,再push一下就可以啦</p>
      </div>
    </m-card>
  </div>
</template>

<script>
export default {
  name: 'git'
}
</script>

<style lang="scss" scoped></style>
