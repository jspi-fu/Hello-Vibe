---
title: Agent Skills
summary: Agent Skills 的详细解析与推荐配置
new: false
---

!!! tip "学习建议"
    对于前两章的高级配置内容，或许你还可以"不动脑子跟着做"，毕竟我们都不太可能自己开发一个 `IDE 插件` 或 `MCP 工具`。

    但从本章开始，请打起十二分精神去**知道、理解和应用**，因为它们的配置没有标准答案，完全根据你的个人需求定制，并且……你拥有极大的创造权。

本章节将从日常使用的角度，帮你理解什么是 Skills，什么时候该用它，以及怎么写一个好用的 Skill，用简单让你直观感受 Skills 的效果。最后，还有笔者自用的 Skills 推荐。

> Skills 就是 Skill 的复数。

> 如果你自信地说"我已经非常了解 Skills 了"，那可以直接跳转到[学长倾情推荐](#学长倾情推荐)开始阅读。

## Skills 是什么
---
大家常看到"一句话解释"开头的博客，但今天我们换个角度，从 Agent 和 MCP 这两个概念说起。

### 为什么需要 Agent？

传统软件开发里，如果要搭一个电商平台，得先划分用户模块、商品模块、订单模块，流程是预先设计好的。想加个购物车功能？得中断原有流程，大规模重构代码。

Agent 的做法不一样。它不关心平台该有哪些模块，只关心一件事：用户说"我要买商品"，最后能不能"成功付款买到商品"。至于中间用 Java 还是 Python，数据存数据库还是 Excel，订单用系统处理还是飞书表格——这些细节 Agent 不在乎。

**说白了，Agent 是为面向目标的任务而生的。** 在今天这个需求多变的时代，我们更在意目标是否达成，而不是具体怎么实现。

---

### 为什么需要 MCP？

在[《MCP工具》](../06_高级配置/02_MCP工具.md)章节已经详细解释，这里再简单总结一下。

传统电商开发经常要集成第三方服务：短信验证、人脸识别、微信支付、物流查询。这些功能通过调用 API 实现，有明确的授权和调用规则。

Agent 也能调用这些能力，但如果不是完全基于代码，怎么实现人脸识别？MCP（Model Context Protocol）就是干这个的。**你可以把 MCP 理解为专门为 AI 设计的"API"，让 AI 能像传统软件一样调用外部服务。**

---

### 为什么需要 Skills？

AI 除了通过 MCP 使用外部能力，我们还可以把重复性的工作打包成工具包，大家都能用。这个工具包就是 Skills。

举个例子：你需要在应用里做文件上传功能。自己从头写当然可以，但如果不擅长界面设计，做出来的组件可能很丑，要花大量时间调样式。但如果有人已经做了一个功能完善、界面美观的上传组件并分享出来，你就可以直接拿来用，不用在不擅长的领域里挣扎。

这就是 Skills 的价值。

---

### 三个功能的定位

- **Agent**：面向目标的执行者。你给目标，它自主规划流程、选择工具去完成，不受限于传统模块化思维。
- **MCP**：AI 调用外部能力的通讯器。像传统项目里的第三方 API，让 Agent 能接入支付、识别等外部服务。
- **Skills**：可供重复使用的能力包。无论是"发送邮件"还是"文件上传"，这些成熟功能都可以封装成 Skill，让 Agent 和 MCP 像使用工具一样直接调用。

**Skills 通过固定的规则和标准化的能力，保证输出结果的稳定和一致。**

假设你要搭一个网站，需要用户系统。可以直接用现成的"用户鉴权 Skill"接入登录验证，再用"手机验证码注册 Skill"搞定注册流程。

这就是 Skills 带来的便利。想象一下，未来社区里有成千上万个公开分享的 Skills，我们可以即取即用，开发工作会变得方便很多。

## 什么时候该用 Skills
---
任何新功能都不是万金油，要在合适的场景使用。当你需要一个**可以被重复使用、并按需自动调用**的能力时，Skills 就是最佳选择。

创建 Skills 之前，先问自己两个问题：这件事未来会重复做吗？用一套标准化的指令来完成，效果会不会更好？

### 适合用 Skills 的场景

- 同一个指令你已经手动输入过很多次
- 需要跨越多次对话，始终保持相同的输出风格、格式或标准
- 有一套明确的多步骤工作流程需要严格执行
- 想把团队的最佳实践（代码规范、品牌指南、测试流程、数据分析方法等）固化下来

---

### 场景举例

#### 场景一：稳定输出高质量结果

如果你需要智能体每次都按你的标准输出，例如统一设计规范、执行团队标准、保持品牌一致性、确保代码符合约定等场景都很适合。

与其指望智能体"记住"你的偏好，不如把要求打包成 Skills，让输出结果稳定可控。

比如：用 frontend-design Skill 优化网页前端设计

<p align="center">
  <img src="/assets/images/06_高级配置/e1fa15337a91447c83c90e5e4e35f503.jpeg" alt="">
</p>

#### 场景二：自动化重复性工作流

测试框架、代码规范检查、常规数据分析、那些躲不掉的日常流程……都可以把 SOP 变成可复用的 Skills，让 AI 替你完成。

示例：用 ux-designer Skills 生成线框图

<p align="center">
  <img src="/assets/images/06_高级配置/77b7c602175d44b695755ecb9c4ba0fa.png" alt="">
</p>

#### 场景三：沉淀与共享 Skills

Skill 不只是提升个人效率的工具，更是将专业能力规模化、与团队共享的好方式。

- 把成熟的工作流程封装成 Skill，团队成员无需反复沟通流程细节，直接调用即可
- 将团队的设计规范、代码规范或品牌指南制作成 Skill，确保整个团队的输出风格一致
- 你可以在社区中发现、构建并共享你的 Skill，让优秀的能力跨越不同的使用者和场景

## Skills 和其他功能怎么选
---
TRAE 中有多种方式引导 AI 理解你的意图。Skill 和其他功能之间应该怎么选？

/// tab | Prompt vs Skills
Prompt 是一次性的指令。如果你为了同一个目的，反复输入了三遍以上的 Prompt，那就应该考虑把它沉淀为一个 Skill。
///

/// tab | Rules vs Skills
Rules 是全局生效的，一旦设置，会在整个对话过程中持续占用 AI 的上下文窗口。

如果 Rules 文件变得越来越臃肿，不妨把与具体工作流程相关的指令迁移到 Skill 中。Rules 里只保留轻量级的全局偏好设置，比如你喜欢的代码风格、沟通语言等。
///

/// tab | Context vs Skills
Context 通常指 Workspace 内共享的知识库或文档。AI 在对话开始时就会读取这些内容，同样会占用上下文窗口。

Skill 是结构化的、可执行的指令，只在被需要时主动触发。因此，Skill 更适合封装可复用的工作流程和行为指令，Context 更适合提供背景信息和知识参考。
///

/// tab | Sub Agent vs Skills
Sub Agent 可以看作专注于特定领域的"专职员工"，Skills 则是可随处迁移的"能力包"，能被不同的智能体在不同的场景下复用。

如果多个 Sub Agent 都需要某项同样的能力，最好的做法是将这项能力抽象成一个 Skill，供所有智能体按需调用。
///

### 总结一下

- Rules、Context 和 Sub Agent 的指令通常会持续占用宝贵的上下文窗口
- Skills 则是按需加载，不仅节省资源（Token），也让 AI 的每一次行动都更加专注和高效

## Skills 的编写结构
---
一个 Skill 本质上就是一个包含 `SKILL.md` 文件的文件夹。这个文件用 Markdown 格式编写，像一份使用说明书，告诉 AI 这个 Skill 是做什么的、应该怎么用。

由于采用标准的 Markdown 格式，创建、阅读和分享都很方便。

### 标准文件结构

唯一必需的是 `Skill.md` 文件，其他都是可选的，根据你的 Skill 需要来决定。

```
your-Skill/
├── SKILL.md          # 必需：Skill 的使用说明
├── README.md         # 可选：项目说明
├── examples/         # 可选：示例文件
├── templates/        # 可选：模板文件
└── scripts/          # 可选：辅助脚本
```

## 在 AI IDE 中使用 Skills
---
**使用 Skills 的黄金法则是「先跑起来，再慢慢优化」。你的第一个版本不需要追求完美。**

1. 先创建一个只包含核心功能的基础版本
2. 用一个真实的任务来测试它
3. 观察输出结果，看看哪里不尽如人意
4. 针对发现的问题，优化和补充你的指令
5. 重复以上步骤，不断迭代

**一个好用的 Skill，一定是在实际使用中反复打磨出来的。先让它能用，再追求好用。**

你可以选择导入他人的 Skill 或者自己创建一个。导入后也可以根据实际需求进行修改。

### 导入社区 Agent Skills

你可以从 GitHub 等平台找到海量的现成 Skill，直接下载并导入使用。

/// tab | 手动下载与管理
以 Trae 为例，**导入步骤：**

1. 从社区找到你需要的 Skill（比如 [Example Agent Skills](https://github.com/anthropics/skills)）
2. 下载包含 `SKILL.md` 的文件夹
3. 在 TRAE 中导入：设置 → 规则和技能 → 技能 → 创建

你可以直接使用已有的 Skills，也可以根据自己的需求修改。
///

/// tab | 使用 Skills 管理工具
以 Vercel 出品的 Skills.sh 为例，**导入步骤：**

1. 打开 [Skills.sh](https://skills.sh)
2. 找到你需要的 Skill，点击进入详情页
3. 在命令行中输入对应指令，跟随指引即可完成导入（支持一键导入30+主流AI编程平台）

<p align="center">
  <img src="/assets/images/06_高级配置/1d801a3c0b354a87ab41ee5c105eebde.png" alt="">
</p>
///

---

### 创建你自己的 Skills

一个 Skill 由以下几部分组成：

- **名称**：为你的 Skill 起一个清晰易懂的名字
- **描述**：简单说明这个 Skill 是做什么的，以及在什么情况下应该使用它
- **指令**（可选）：如果任务比较复杂，可以在这里提供详细的、分步骤的指令

对于一些简单的任务，一个 Skill 甚至只需要名称和描述就足够了。只有当你的工作流需要特定的步骤或输出格式时，才需要逐步添加更详细的指令。

/// tab | 在对话中创建

最简单的方式是直接和 AI IDE 对话。

> 最佳实践：你已经安装了[`skill-creator`技能](https://skills.sh/anthropics/skills/skill-creator)技能，它可以帮助你快速创建、更新符合标准的 Skill。
> 如果还没有安装，请在命令行内输入以下命令：
> ```bash
> npx skills add https://github.com/anthropics/skills --skill skill-creator
> ```

描述你的需求，AI 会帮你生成 Skill。比如：

- "创建一个 Skill，帮我检查代码的性能问题"
- "做一个生成 CSS 组件的 Skill，要符合我们的品牌规范"
- "建一个 Skill，用来规范我的数据分析报告"

///

/// tab | 手动创建

如果你想要添加更详细的工作流、指令及工具调用，可以用 Markdown 格式手动编写 Skill。

**基础 `Skill.md` 模板：**

```markdown
name: Skill 名称
description: Skill 的描述，说明它做什么、什么时候用

# 指令

在这里写具体的指令，告诉 AI 如何执行这个 Skill。

## 步骤 1
---
详细说明第一步做什么。

## 步骤 2
---
详细说明第二步做什么。

## 输出格式
---
说明期望的输出格式。
```

///

## 如何调用你的 Skills
---
/// tab | 显性调用

显性调用就是直接在指令中明确告诉 AI 使用哪一个 Skill。这种方式可以让你精准地控制 AI 的行为，确保输出结果的稳定性。

**示例：**

- "用 codemap Skill 总结一下这个代码分支做了哪些修改"
- "请使用 Frontend Design Skill 来构建这个 UI 组件"
- "用 CSV Skill 帮我处理一下这个数据集"

当你明确知道应该使用哪个 Skill，并且希望得到稳定、可预期的结果时，推荐使用显性调用。

///

/// tab | 隐性调用

隐性调用完全依赖 AI 的自主判断。AI 会根据你当前的任务描述，以及每个 Skill 中"何时使用"的描述，自动决定是否以及调用哪个 Skill。

例如，假设你创建了一个名为 Code Review 的 Skill，触发条件是"当用户请求代码反馈时"。那么当你向 AI 提出以下问题时：

- "你觉得这个函数写得怎么样？"
- "帮我 review 一下这个合并请求（PR）"
- "这段代码有什么潜在的问题吗？"

AI 会自动识别出你的意图，并调用 Code Review Skill 来回答，整个过程无需你手动指定。

///

!!! tip "如何选择「显性」还是「隐性」"
    当任务复杂、关键或需要高度稳定的输出时，建议采用显性调用。

## 一起来实操
---
我们以创建一个"多彩输出"的 Skill 为例。

这个技能主要是为了让 AI 在回复时，根据内容情况修改文字颜色，便于直接看到关键点。功能比较简单，先让大家感受一下 Skill 的魅力。

操作版本：Trae cn

### 1. 在 TRAE 中打开 Skills 创建面板

<p align="center">
  <img src="/assets/images/06_高级配置/3e8136b36378429692c4aa54d7dbf2da.png" alt="">
</p>

---

### 2. 创建所需的 Skills

- **技能名称**：你的技能叫什么名字，将来调用时能看到
- **描述**：这个技能的说明，做什么用、有什么用
- **指令**：最重要的地方，写技能怎么实现

如果你不太清楚指令该怎么写，有个小技巧：先把写好了技能名称和描述的界面截图，然后将图片发给一个能够识别图片的多模态模型（如 Doubao-Seed-Coder），并对它说"你好，我想制作一个 Skill，名称和描述如图片所示，但我不擅长写指令，你来帮我写一下吧"。

<p align="center">
  <img src="/assets/images/06_高级配置/01fcaa93659448c0bfa05fb52f2dcf51.png" alt="">
</p>

---

### 3. 查看创建的 Skills

创建完成后，回到文件目录。你会发现根目录下的 `.trae` 文件夹里，系统自动创建了一个 `skills` 目录，并在其中生成了一个名为"多彩输出"的子目录。这个子目录里包含一个 `SKILL.md` 文件。**这个文件的内容，正是由我们刚刚填写的技能名称、描述和指令生成的。**

## 学长倾情推荐
---
**Skills 列表**：

| Skill 名称 | 作用 | 分类 |
|-----------|------|------|
| [find-skills](#find-skills) | 在开放 Agent Skills 生态中搜索和安装技能 | 技能管理 |
| [skill-creator](#skill-creator) | 创建新技能、修改和优化现有技能 | 技能开发 |
| [baoyu-url-to-markdown](#baoyu-url-to-markdown) | 通过 Chrome CDP 抓取网页并转换为 Markdown | 内容处理 |
| [baoyu-format-markdown](#baoyu-format-markdown) | 格式化 Markdown 文件，添加 frontmatter 和排版 | 内容处理 |
| [vercel-react-best-practices](#vercel-react-best-practices) | Vercel 官方的 React/Next.js 性能优化指南 | 开发规范 |
| [ui-ux-pro-max](#ui-ux-pro-max) | 提供专业的 UI/UX 设计智能和组件库 | 设计工具 |
| [code-review-excellence](#code-review-excellence) | 代码审查最佳实践，将审查转化为知识共享 | 开发规范 |
| [humanizer-zh](#humanizer-zh) | 去除文本中的 AI 生成痕迹，使其更自然 | 内容处理 |

### 一、技能管理

#### [find-skills](https://skills.sh/vercel-labs/skills/find-skills)

由 Vercel 官方发布的技能管理工具，帮助用户在开放 Agent Skills 生态中发现和安装技能。登顶 24h 安装榜榜首，日均安装量突破 10k+。

**核心功能**：

- 交互式搜索技能：`npx skills find react`
- 一键安装技能到任意 Agent
- 跨平台技能同步管理

**安装命令**：
```bash
npx skills add https://github.com/vercel-labs/skills --skill find-skills
```

#### [skill-creator](https://skills.sh/anthropics/skills/skill-creator)

Anthropic 官方出品的技能创建工具，帮助开发者创建新技能、修改和优化现有技能，并支持运行评估测试技能性能。

**核心功能**：

- 从零创建新技能
- 更新和优化现有技能
- 运行 evals 测试技能性能
- 基准测试与方差分析

**安装命令**：
```bash
npx skills add https://github.com/anthropics/skills --skill skill-creator
```

---

### 二、内容处理

#### [baoyu-url-to-markdown](https://skills.sh/jimliu/baoyu-skills/baoyu-url-to-markdown)

通过 Chrome CDP（Chrome DevTools Protocol）抓取任意 URL 的网页内容，并将其转换为干净的 Markdown 格式。支持自动捕获和等待用户信号两种模式。

**核心功能**：

- 自动捕获页面加载后的内容
- 等待用户模式（处理需要登录的页面）
- 输出 YAML frontmatter 元数据（url、title、description、author 等）

**安装命令**：
```bash
npx skills add https://github.com/jimliu/baoyu-skills --skill baoyu-url-to-markdown
```

#### [baoyu-format-markdown](https://skills.sh/jimliu/baoyu-skills/baoyu-format-markdown)

将纯文本或 Markdown 文件格式化为结构良好的 Markdown 文档，添加 frontmatter、标题、摘要、加粗、列表和代码块等。

**核心功能**：

- 自动添加 frontmatter 元数据
- 优化排版和格式
- 支持 CJK（中日韩）字符的友好处理
- 自动添加中英文间距

**安装命令**：
```bash
npx skills add https://github.com/jimliu/baoyu-skills --skill baoyu-format-markdown
```

#### [humanizer-zh](https://skills.sh/op7418/humanizer-zh/humanizer-zh)

专门用于去除中文 AI 生成文本痕迹的工具，基于维基百科的"AI 写作特征"综合指南，让文本听起来更自然、更像人类书写。

**检测并修复的 AI 模式**：

- 夸大的象征意义
- 宣传性语言
- 以 -ing 结尾的肤浅分析
- 模糊的归因
- 破折号过度使用
- 三段式法则
- AI 词汇、否定式排比
- 过多的连接性短语

**安装命令**：
```bash
npx skills add https://github.com/op7418/humanizer-zh --skill humanizer-zh
```

---

### 三、开发规范

#### [vercel-react-best-practices](https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices)

Vercel 工程团队维护的 React 和 Next.js 性能优化指南，包含 57 条规则，分为 8 个类别，按影响力优先级排序。

**涵盖内容**：

- 数据获取优化（消除瀑布流）
- 打包体积优化
- React 缓存策略
- JavaScript 微优化
- 组件渲染优化

**适用场景**：

- 编写 React/Next.js 代码
- 代码审查和重构
- 性能优化任务

**安装命令**：
```bash
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
```

#### [code-review-excellence](https://skills.sh/wshobson/agents/code-review-excellence)

将代码审查从"把关"转变为"知识共享"的技能，提供建设性反馈、系统化分析和协作改进的方法论。

**核心原则**：

- 建立团队文化
- 改进设计和架构
- 执行编码规范
- 跨团队知识共享
- 确保代码可维护性

**适用场景**：

- 审查 Pull Request
- 建立团队审查标准
- 指导初级开发者
- 进行架构审查

**安装命令**：
```bash
npx skills add https://github.com/wshobson/agents --skill code-review-excellence
```

---

### 四、设计工具

#### [ui-ux-pro-max](https://skills.sh/nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max)

提供专业的 UI/UX 设计智能，支持 67 种设计风格、21 种配色方案、57 种字体配对、20 种图表类型，覆盖 13 个技术栈。

**支持的技术栈**：

- React / Next.js / Vue / Svelte
- SwiftUI / React Native / Flutter
- Tailwind CSS / shadcn/ui / Jetpack Compose

**设计风格示例**：

- Glassmorphism（玻璃拟态）
- Claymorphism（粘土拟态）
- Minimalism（极简主义）
- Brutalism（粗野主义）
- Neumorphism（新拟态）
- Bento Grid（便当盒布局）

**安装命令**：
```bash
npx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max
```

## 获取更多 Skills
---
推荐一下我最常用的 Skills 检索平台：

- [skills.sh](https://skills.sh/)—— 最权威的 Skills 官方目录。由 Vercel 团队维护，支持一键安装（`npx skills add`），兼容 Claude Code、Codex、Cursor 等主流 AI 编程工具。提供 Skills 排行榜和趋势分析，发现热门技能的首选平台。
- [skillsmp.com](https://skillsmp.com/zh)—— 最全的 Skills 中文市场。已收录超过 38 万个来自 GitHub 的开源 Skills，支持 AI 语义搜索和关键词搜索。提供分类浏览、热度排序、质量过滤（自动过滤低星项目），是中文用户发现 Skills 的最佳选择。
- [LobeHub Skills Marketplace](https://lobehub.com/skills)—— 全球最大的 Skills 市场之一，收录超过 10 万个 Skills。支持多语言（含中文），提供详细的 Skill 分类和评分系统，可直接查看 SKILL.md 源码和安装命令。
- [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)—— 精心整理的 300+ Claude Code Skills 合集，资源来自官方开发团队和社区。兼容 Codex、Antigravity、Gemini CLI、Cursor 等多种平台。

你也可以探索学长的自用仓库：[Customized Skills](https://gitee.com/ye_sheng0839/customized-skills)