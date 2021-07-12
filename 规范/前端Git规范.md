### 目的

1.  统一团队Git Commit标准，便于后续代码review、版本发布、自动化生成change log。
2.  可以提供更多更有效的历史信息，方便快速预览以及配合cherry-pick快速合并代码。
3.  团队其他成员进行类`git blame`时可以快速明白代码用意。

### 基本原则

1.  ==不可以直接在master上提交代码==。
2.  确保master分支上的任何提交都是经过测试的可发布的版本。
3.  在同一个需求内的所有功能必须使用同一个分支进行转测、测试，分支名release-xxx(需求)。

### 分支及作用

1.  master主分支，设置为==保护分支==，不能直接在上面进行修改或者提交，可发布的稳定版本。
2.  release-xxx迭代分支，设置为==保护分支==，迭代上线使用。
3.  hotfix-xxx、bugfix-xxx分支，用于紧急修复和线上bug修复。
4.  feature-xxx分支，功能分支，从dev开发分支检出。
5.  dev、jd-dev、test1、test2、test3、jd-test分支，开发服分支和测试服分支。feature分支开发完以后，经过code review合并到dev分支。


### Tag规范

==每次上线需要打上语义化版本号，采用三段式Tag，形式为major.minor.fixed==

1.  项目产生重大变化时（如架构升级或架构调整）：修改major（major + 1)
2.  新功能上线：修改minor（minor + 1）
3.  无功能更改的bug修复：修改fixed（fixed + 1）

### Commit提交规范

1.  ==统一配置好姓名和邮箱，使用中文名，便于查看提交历史。==
    ```
    git config --global user.name "中文名"
    git config --global user.email "xxx@xiaoduotech.com"
    ```
2.  ==每次提交的commit信息必须明确提交的核心改动，不可省略==。
    > [feature|feat|fix|style|refactor|misc...]：commit信息
3.  每次提交尽量限制于一次逻辑更改或者一处功能开发修复，建议不要一次提交解决多个问题的更新。
4.  新功能或者bug修复都可以关联上jira任务，约定使用# +jira号的格式，比如#CVDBUG-3885，便于后续追溯。

### 开发流程

1.  确定方案以后，从master检出一个新的release-xxx分支，即新需求分支（或者叫迭代分支）。
2.  从release-xxx分支检出一个开发分支feature-xxx，通过这个分支，进行开发。
3.  本地开发完成并且push到feature-xxx分支以后，发起merge request，将代码merge到release-xxx分支上；在该过程中将merge request的地址发到前端钉钉群，供其他人员进行代码检视。
4.  如果merge到release-xxx的时候发现冲突，在本地同步release-xxx：```get merge origin/releae-xxx```，解决冲突以后，再push到远端开发分支feature-xxx上，远端再进行merge到release-xxx的操作。
5.  如果release-xxx需要被拆分成多次上线，本地push到远端仓库的feature-xxx开发分支以后，新建一个release-xxx-上线顺序分支，用这个分支来区分上线后续的版本。例如release-xxx需要上线，然后又在此基础上新开发了需求，也进入了提测或者上线阶段，则可以新建一个分支release-xxx-1来表示分批上线的版本。

开发流程前4步是基本上不变了，遇见特殊场景以具体情况而定，前提都是需要保证代码版本的干净和正确性。

### 提测流程

本地开发完的feature-xxx分支，合并到dev、test、jd-test、pdd-test等相关分支，然后发送提测邮件，通知测试同学进行测试。
提测流程详见：[提测规范及测试流程](http://doc.xiaoduoai.com/pages/viewpage.action?pageId=212402328)


### 上线流程

测试完成以后，将修改完bug后的feature-xxx上的最新代码，merge到上线分支release-xxx上。上线完成以后，将release-xxx分支合入到master，打上tag以及补充好该版本的简短说明：```git tag -a 2.3.22 -m '2.3.22版本上线了XXX功能'```，上线流程详见：[上线申请流程](http://doc.xiaoduoai.com/pages/viewpage.action?pageId=219349012)


### 注：
1.  不再使用的分支，应当删除，保持仓库的干净简洁。
2.  gitlab merge request的操作可以见官方文档 https://docs.gitlab.com/ee/user/project/merge_requests/index.html
3.  也可以参考前端九部分享的Git规范：[Git团队协作规范](https://www.yuque.com/fe9/basic/nruxq8)

### 开发中的一些情况

1.  **转测完成以后的release合入到master的时候出现冲突**

    这种情况证明你拉取master后，开发的需求和其他人开发的需求（已经合到mater）有冲突，这种情况最好是先用本地的开发分支feature去merge远端的master，解决冲突以后（冲突的地方需要和其他开发人对齐），往远端feature分支合入。
    
    
2.  **feature合入到dev的时候有冲突**

    feature合入到dev的时候有冲突，这个时候也应该先完成第一步。然后本地代码切到dev，同步远端的dev分支（git checkout -B dev origin/dev），这个时候你本地的代码就是远端dev最新的代码；然后去merge你第一步推到远端的feature代码（git merge origin/feature-xxx），解决冲突以后，往远端dev推送。
    这样既保证了自己开发分支代码的干净，也将自己的需求推送到了远端dev。
    

开发中的冲突，在需求分工的时候，尽量不重叠