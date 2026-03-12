---
title: IDE插件
summary: 了解常用的 IDE 插件，提升 AI 编程的人工介入体验
new: false
---

## 什么是IDE插件，有什么作用？
---
IDE插件 ‌是集成开发环境（IDE）中的一个重要组成部分，它通过**扩展IDE的功能**来提高开发效率。IDE插件通常由第三方开发者开发，旨在提供额外的功能，如**代码编辑、调试、版本控制、构建自动化**等，以帮助开发人员更高效地完成编程任务‌。

在 AI IDE 到来后，许多插件变得没那么重要，毕竟 AI 可以处理大部分的代码生成和调试任务。但只要你还希望自己介入到编码过程中，今天学长推荐的插件就一定能“不负期待”。

## 插件安装方法
---
VScode 系 IDE（所有 AI IDE）都内置了一个方便的插件市场，你可以轻松搜索并安装插件，步骤如下：

1. 点击左侧栏的 Extensions（扩展） 图标，或使用快捷键 Ctrl+Shift+X 打开插件市场；
2. 在顶部的搜索框输入插件名称或关键词（如 "Python"、"Markdown"、"Git"）；
VScode 会展示相关插件的搜索结果。

3. 对于出现的多个备选插件，建议优先选择 **star 数较多、评分高 且 更新频率高** 的插件。这些插件通常经过大量用户的验证，功能较为稳定。可以点击插件名称查看详细描述、用户评价和更新历史，综合这些因素选择最适合的插件。
4. 找到需要的插件后，点击 Install（安装） 按钮；
5. 安装完成后插件会自动启用，通常无需重启 IDE。

<p align="center">
  <img src="/assets/images/06_高级配置/ee3c719f9ef2424267e2ca6f28503910.jpg" alt="" />
</p>

## 学长倾情推荐（按需配置即可）
---
**插件列表**：

| 插件名称 | 作用 | 分类 |
|---------|------|------|
| [vscode-icons](#vscode-icons) | 提供丰富的文件类型图标，让项目结构一目了然 | 文件图标 |
| [wakatime](#wakatime) | 编程时间及行为跟踪统计，生成详细编程报告 | 功能强化 |
| [Chinese (Simplified) Language Pack](#chinese-language-pack) | IDE 界面汉化，降低英文界面学习成本 | 功能强化 |
| [GitHub Pull requests](#github-pull-requests) | 在 VSCode 中查看和管理 GitHub 拉取请求和问题 | Git 集成 |
| [Git Graph](#git-graph) | Git 图形化显示和操作，可视化展示分支历史 | Git 集成 |
| [CodeStream](#codestream) | 团队协作开发、评审和讨论，支持多平台 | Git 集成 |
| [Image Preview](#image-preview) | 在代码行号旁预览图片，快速检查图片链接 | 效率提升 |
| [Regex Previewer](#regex-previewer) | 预览正则表达式效果，实时匹配测试 | 效率提升 |
| [Path Intellisense](#path-intellisense) | 自动补全文件路径，减少路径输入错误 | 效率提升 |
| [CSS Peek](#css-peek) | 按住 Ctrl 点击类名跳转到 CSS 定义 | 前端开发 |
| [Color Highlight](#color-highlight) | 高亮显示并可视化 CSS 颜色 | 前端开发 |
| [Sort lines](#sort-lines) | 对文本按字母、长度、数字等多种方式排序 | 数据分析 |
| [Data Preview](#data-preview) | 预览 CSV、JSON 等数据文件 | 数据分析 |

### 一、文件图标

#### [vscode-icons](#vscode-icons)

VSCode官方出品的图标库，提供丰富的文件类型图标，让项目结构一目了然，快速识别不同文件类型。

<p align="center">
  <img src="/assets/images/06_高级配置/70fa5ef050fac4b965a11008a200a198.png" alt="" />
</p>

<p align="center">
  <img src="/assets/images/06_高级配置/22b8972fb91c7d9bbff8e3f134d0cb38.gif" alt="" />
</p>

---

### 二、功能强化

#### [wakatime](https://marketplace.visualstudio.com/items?itemName=WakaTime.vscode-wakatime)

编程时间及行为跟踪统计，帮助你了解自己的编码习惯和时间分配，生成详细的编程报告，适合需要量化工作产出的开发者。

<p align="center">
  <img src="/assets/images/06_高级配置/d8ce1e58b9f26c52339993dd7d997442.png" alt="" />
</p>

<p align="center">
  <img src="/assets/images/06_高级配置/553ff501fb4f58c79b8cbc0b0572828c.png" alt="" />
</p>

#### [Chinese (Simplified) Language Pack for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hans)

IDE 汉化包，如果你使用 Cursor 等非国产编辑器，那么它一定在必装榜单上。将界面完全中文化，降低英文界面带来的学习成本。

<p align="center">
  <img src="/assets/images/06_高级配置/2544626902a5098e79168a3a1281b828.png" alt="" />
</p>

---

### 三、Git 集成插件

如果你还不熟悉 Git ，请参考 入门配置 部分上手基础图形化 Git 操作，等到你开始习惯使用 Git 来管理项目时再来看看这些插件。

#### [GitHub Pull requests](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)

在Visual Studio Code中查看和管理GitHub拉取请求和问题，无需切换浏览器即可完成代码审查，提升协作效率。

<p align="center">
  <img src="/assets/images/06_高级配置/4a45e2887969f1be09b490464d9a79b5.png" alt="" />
</p>

<p align="center">
  <img src="/assets/images/06_高级配置/1eda4e3443c4a9002e479a1bed97dd12.png" alt="" />
</p>

<p align="center">
  <img src="/assets/images/06_高级配置/9299a1fcdbdea16f0ad54d0f07b878cc.gif" alt="" />
</p>

#### [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)

Git 图形化显示和操作，以可视化方式展示分支历史，轻松理解复杂的分支合并关系，是学习和使用 Git 的利器。

<p align="center">
  <img src="/assets/images/06_高级配置/1f2e207737b008f4b2ecfaaa28c71794.png" alt="" />
</p>

<p align="center">
  <img src="/assets/images/06_高级配置/8a50286e4cdd20ccee093fc897ff7221.gif" alt="" />
</p>

#### [CodeStream](#codestream)

团队协作开发，评审，讨论。支持多种代码托管平台，让代码审查和团队沟通直接在编辑器中完成。

<p align="center">
  <img src="/assets/images/06_高级配置/7aa3bff587cca9a59c9801b3431ce499.png" alt="" />
</p>

<p align="center">
  <img src="/assets/images/06_高级配置/4363064929121a6727a7cb5fdecb93aa.gif" alt="" />
</p>

---

### 四、效率提升

#### [Image Preview](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview)

预览图片，便于快速检查图片链接是否正常。在代码行号旁直接显示图片缩略图，省去反复切换查看的麻烦。

<p align="center">
  <img src="/assets/images/06_高级配置/aecf7ef71ba90ff0c38d6c2357d6ec46.png" alt="" />
</p>

<p align="center">
  <img src="/assets/images/06_高级配置/27871a23ffaf4e414d625aa91c1823c9.png" alt="" />
</p>

#### [Regex Previewer](https://marketplace.visualstudio.com/items?itemName=chrmarti.regex)

预览正则表达式效果，实时匹配测试，避免正则表达式出错导致的调试困扰，是处理文本匹配的必备工具。

<p align="center">
  <img src="/assets/images/06_高级配置/b44d3e38231f97b76ed4648f0461bbb4.png" alt="" />
</p>

<p align="center">
  <img src="/assets/images/06_高级配置/a0239a4ab6b44df3f5af9704a538eacb.gif" alt="" />
</p>

#### [Path Intellisense](#path-intellisense)

在代码中输入 ./、../ 或 / 时，插件会自动列出当前工作区内匹配的文件和文件夹供你可视化选择，非常方便！大幅减少路径输入错误，提升文件引用效率。

<p align="center">
  <img src="/assets/images/06_高级配置/75829e8e80f39db37f6009ca5b3b1de2.gif" alt="" />
</p>

---

### 五、前端开发

#### [CSS Peek](https://www.cnblogs.com/joe235/p/13267973.html)

查看 css 定义，按住 Ctrl 点击类名即可跳转到对应的 CSS 定义，无需在文件间来回切换，大幅提升样式调试效率。

<p align="center">
  <img src="/assets/images/06_高级配置/33da76172d807b99074c072a35dc9feb.png" alt="" />
</p>

<p align="center">
  <img src="/assets/images/06_高级配置/d1835f02c02bf1833582bde2636f5dbe.gif" alt="" />
</p>

#### [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)

高亮显示并可视化修改 CSS 颜色，在代码中直接显示颜色块，直观预览颜色效果，支持多种颜色格式。

<p align="center">
  <img src="/assets/images/06_高级配置/0815bd2a35b3364865bde02295292188.png" alt="" />
</p>  

---

### 六、数据分析

#### [Sort lines](https://marketplace.visualstudio.com/items?itemName=Tyriar.sort-lines)

对当前文本排序，支持按字母、长度、数字等多种方式排序，处理列表数据时非常实用。

<p align="center">
  <img src="/assets/images/06_高级配置/7d212d573a4c538ad8c1283e950ed1c6.png" alt="" />
</p>

<p align="center">
  <img src="/assets/images/06_高级配置/f3f5b8b880a4aad611eea0de5124c207.gif" alt="" />
</p>

#### [Data Preview](#data-preview)

预览数据文件，支持 CSV、JSON 等格式，以表格形式直观展示数据内容，方便快速查看和验证数据。

<p align="center">
  <img src="/assets/images/06_高级配置/b80404cea95fdf2a062812df9c6a03f9.png" alt="" />
</p>

<p align="center">
  <img src="/assets/images/06_高级配置/f8492b4b24a5ed3fbf7c3619ec957a45.png" alt="" />
</p>

