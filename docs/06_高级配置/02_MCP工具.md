---
title: MCP工具
summary: MCP 工具的介绍与推荐配置
new: false
---

## 什么是MCP工具，有什么作用？
---
MCP（Model Context Protocol） 是一个开放协议，用来标准化「**大模型 ↔ 外部世界（工具 / 数据 / 应用） 之间如何说话与协作**」。

它就像插在你电脑上的拓展坞，下面这张图很好地展示了 MCP 的作用：

<p align="center">
  <img src="https://pic.yupi.icu/1/mcp.png" alt="" />
</p>

有了 MCP，大模型就可以：

- 读写文件、本地项目代码
- 访问数据库、搜索引擎、内部 API
- 调用自动化脚本、测试、构建流水线
- 在受控范围内操作你的本地/企业系统

一句话总结：
<p align="center"><strong>MCP 让模型从「只能说」变成「能干活」</strong></p>

## MCP 配置方法
---
**前置要求**：已经在本地安装了 `Node.js`、`npm` 和 `npx`。如果还没有安装，请参考 [Node.js 安装及环境配置超详细教程（以 win11 为例）](https://zhuanlan.zhihu.com/p/2004975759790477711)、[配置Trae的MCP保姆级教程](https://blog.csdn.net/m0_67581821/article/details/147853296) 完成。

### 开始配置

/// tab | 从市场添加

MCP 市场中提供了社区中热门的 MCP Server，你可以选择需要的 MCP Server 进行添加。

1. 在 AI 侧边对话框的右上角，点击 **设置** 图标
2. 选择 **MCP** 页签
3. 点击 **+ 添加 MCP Servers** 按钮；或点击右上角的 **+ 添加** 按钮，然后在菜单中选择 **从市场添加**
    - 你将进入 MCP 市场

<p align="center">
  <img src="https://trae-forum-cdn.trae.com.cn/optimized/1X/67c159c9d2f259f65f077e8b931736e71fadf306_2_553x500.png" alt="" />
</p>

4. 在 MCP 市场中找到所需的 MCP Server
5. 点击右侧的 **+** 按钮
6. 在弹窗中填入 MCP Server 的配置信息

!!! note "提示"
    对于标记为 "Local" 的 MCP Server，需要在本地安装 NPX 或 UVX 后才能使用；配置内容中的 env 信息（例如 API Key、Token、Access Key 等字段）须替换为真实信息。

7. 点击 **确认** 按钮

///

/// tab | 手动添加

如果在市场中无法找到想要的 MCP Server，或者想使用自己开发的 MCP Server，则需要手动添加。

1. 在 AI 侧边对话框的右上角，点击 **设置** 图标，然后在菜单中选择 **MCP**
    - 界面上显示 **MCP** 页签
2. 点击右上角的 **+ 添加** 按钮，然后在菜单中选择 **手动添加**
    - 界面上显示 **手动配置** 窗口

<p align="center">
  <img src="https://trae-forum-cdn.trae.com.cn/optimized/1X/ad1898dda6e243a390af2b0e011b8341cc4d1aea_2_444x500.jpeg" alt="" />
</p>

3. 填入 MCP Server 的配置内容
    - 若你希望添加一个全新的 MCP Server，将 JSON 配置内容填入输入框中，然后点击 **确认** 按钮。该 MCP Server 将被添加至 MCP 列表中
    - 若你已在其他 IDE 中配置了 MCP Server，并希望在 TRAE 中复用。你可以点击 **原始配置（JSON）** 按钮，然后将 MCP Server 的 JSON 配置内容粘贴至 TRAE 的 mcp.json 文件中。粘贴完成后，MCP 列表中将自动添加相应的 MCP Server

///

---

### 在智能体中使用 MCP

将 MCP Server 添加至智能体，让其调用 MCP Server 中的工具来更好地处理你的需求。

#### 内置智能体：Builder with MCP

Builder with MCP 是 TRAE 的内置智能体，所有已配置的 MCP Server 都将被自动添加至该智能体，且不可编辑。

#### 自定义智能体

你可以将 MCP Server 添加到自定义智能体中，然后由智能体自动调用 MCP Server 中的工具来完成任务。

**直接在 MCP Server 列表中将 MCP Server 添加至智能体，步骤如下：**

1. 前往 MCP Server 列表
2. 点击目标 MCP Sever 右侧的 **+** 按钮
3. 在列表中勾选需要添加该 MCP Server 的智能体
4. 点击 **确认** 按钮

<p align="center">
  <img src="https://trae-forum-cdn.trae.com.cn/optimized/1X/12d8db7cf9012512332f3815c5b53dc47172bae2_2_690x436.png" alt="" />
</p>

如果你还没有创建自定义智能体，则可以在创建时为它添加所需的 MCP Server，如下图所示。

<p align="center">
  <img src="/assets/images/06_高级配置/05a7b42bd0e4497a9cc266abc4e0faa3.jpeg" alt="" />
</p>

## 学长倾情推荐（按需配置即可）
---
**MCP列表**：

| MCP 名称 | 作用 | 分类 |
|---------|------|------|
| [Github MCP](#github-mcp) | 访问 GitHub 仓库、Issues、PR 等资源 | 开发工具 |
| [Exa MCP](#exa-mcp) | AI 优化的网页/代码搜索，实时获取网络信息 | 搜索工具 |
| [Memory MCP](#memory-mcp) | 基于知识图谱的持久化记忆，跨对话记住用户信息 | 记忆工具 |
| [Context7 MCP](#context7-mcp) | 提供最新版本特定的代码文档和示例 | 搜索工具 |
| [Supabase MCP](#supabase-mcp) | 执行 SQL、管理数据表、应用数据库迁移 | 数据库 |
| [Magic UI MCP](#magic-ui-mcp) | 提供丰富的 UI 组件库和酷炫动画效果 | UI 组件 |

### 一、开发工具

#### [Github MCP](https://github.com/github/github-mcp-server)

GitHub 官方 MCP Server，让 AI 助手能够访问 GitHub 的代码仓库、用户信息、Issues、Pull Requests 等资源。支持搜索代码、浏览仓库、获取文件内容等功能。

**安装配置**：
```json
{
  "mcpServers": {
    "github": {
      "url": "https://api.githubcopilot.com/mcp/",
      "headers": {
        "Authorization": "Bearer YOUR_GITHUB_PAT"
      }
    }
  }
}
```

---

### 二、搜索工具

#### [Exa MCP](https://github.com/exa-labs/exa-mcp-server)

连接 AI 助手到 Exa 的搜索能力，提供网页搜索、代码搜索和公司研究功能。支持实时网络搜索和内容抓取，为 AI 提供最新、高质量的网络信息。

**安装配置**：
```json
{
  "mcpServers": {
    "exa": {
      "url": "https://mcp.exa.ai/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_EXA_API_KEY"
      }
    }
  }
}
```

#### [Context7 MCP](https://github.com/upstash/context7)

为 AI 编码助手提供最新、版本特定的代码文档和示例。降低大模型幻觉率，直接从源码获取最新的库文档和代码示例。

**安装配置**：
```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

---

### 三、记忆工具

#### [Memory MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/memory)

基于本地知识图谱的持久化记忆服务器。通过实体、关系和观察值的存储，让 Trae 等智能体能够记住用户跨对话的信息。

<p align="center">
  <img src="https://pic4.zhimg.com/v2-cda6910e7dac6ea2b92d3501efa10359_1440w.jpg" alt="" />
</p>

**安装配置**：
```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

---

### 四、数据库/后端服务

#### [Supabase MCP](https://github.com/supabase-community/supabase-mcp)

<p align="center">
  <img src="/assets/images/06_高级配置/133c95398a6e413390bbd3209ffc44fa.png" alt="" />
</p>

连接 AI 助手到 Supabase 平台，支持执行 SQL 查询、管理数据表、应用数据库迁移、获取项目配置等数据库/后端操作。

/// details | Supabase 是做什么的？
简单来说，Supabase是一个开源的、完整的后端服务方案：

- PostgreSQL数据库（而非NoSQL）
- 实时订阅
- 认证与用户管理
- 自动生成的API
- 存储解决方案
- 仪表板管理界面

开源、免费、功能全面，这对于个人开发者来说极其友好。
更多使用方式可以参考 [【告别后端, 免费全栈开发神器Supabase零基础入门教程】](https://www.bilibili.com/video/BV1GD7GzUExH/?share_source=copy_web&vd_source=39dd48f9ecc791d05c72fa418e828edb)、[【AI编程适配｜Supabase全解析(云服务+本地部署)+PostgreSQL高级特性实战】](https://blog.csdn.net/m0_59012280/article/details/158467556)。
///

**安装配置**：
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "your_access_token"
      }
    }
  }
}
```

---

### 五、UI 组件

#### [Magic UI MCP](https://github.com/magicuidesign/mcp)

Magic UI 官方 MCP Server，在 shadcn-ui 基础上提供了更加酷炫的动效、更加庞大的开源社区，使用 MCP 可以直接让 AI IDE 访问所有 Magic UI 组件，从而以最小错误生成代码。

<p align="center">
  <img src="/assets/images/06_高级配置/d3b92aa52f8c44b6b4f9e0b07e427308.jpeg" alt="" />
</p>

**安装配置**：
```json
{
  "mcpServers": {
    "magicui": {
      "command": "npx",
      "args": ["-y", "@magicuidesign/mcp@latest"]
    }
  }
}
```

配置完成后，可以直接通过自然语言让 AI 调用任何 Magic UI 组件，例如：
> 你："添加模糊淡出文本动画效果"
> AI："当然可以！我将使用 Magic UI 提供的模糊淡出文本动画组件。"

!!! note "提示"
  主流的 UI 组件库都已经配备了对于的 MCP 服务器，可以在其官网上寻找支持。

## ​获取更多 MCP
---
推荐一下我最常用的 MCP 检索平台：

- [mcp.so](https://mcp.so)—— 全球最火的 MCP 平台。分类清晰、支持中文，直接复制安装命令；且能看评论，避免踩坑。
- [mcphub.com](https://mcphub.com)—— 最全最专业的MCP大本营。聚合了 3.2 万+ MCP，并做了分类整理。约 500 个常用优质 MCP 已实现自主托管，几乎无需设置即可在线直接使用，适合新手用户和开发者体验；提供了完善的交互体验​：在聊天框里就能直接使用mcp
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers)：精选小而美的 MCP，分类清晰，直达 GitHub，无冗余信息，易于查找。适合想快速找到“靠谱 MCP”、不想被信息过载的用户
- [cursor社区MCP](https://cursor.directory/mcp)：cursor微社区内的mcp推荐，有许多新东西，适合喜欢探索尝鲜、能接受bug的开发者。
​