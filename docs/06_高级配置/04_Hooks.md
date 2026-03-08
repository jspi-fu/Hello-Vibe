---
title: Hooks
summary: Hooks 的介绍、构造方法与应用场景
new: false
---

!!! info "使用说明"
    Hooks 是 Claude Code 的高级功能，需要在 `settings.json` 中开启 `hooks.enabled` 才能使用。

    目前主流的 AI IDE 中，只有 Cursor 支持直接复用 Claude Code Hooks。

    对于 Trae，可以通过编辑 `.trae/workflows.yaml` 来配置类似功能，详情参考 [Trae 高级功能](https://ykzm.cn/zh/guides/advanced-features.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B7%A5%E4%BD%9C%E6%B5%81)。

> Hooks 就是 Hook 的复数，代指的是一个东西。

## 什么是 Hooks？
---
Claude Code 中的 Hooks 本质上是用户定义的 Shell 命令，它能够在 Claude Code 生命周期的各个"关键节点"自动执行。

**用通俗的话来说**：如果将 Claude Code 的工作流程比作一条繁忙的高速公路，那么 Hooks 就是沿途设置的智能交通信号灯，能够在预设的关键路口进行流量控制、安全检查和信息收集等操作。

## 为什么需要 Hooks？
---
假设没有 Hooks，你想让 Claude Code 在每次编辑文件后都自动格式化代码，你就需要在每次对话时都主动提示它。但有了 Hooks，这个过程就变成了自动化的。

在 Claude Code 中，Hooks 提供了确定性的控制机制，通过将规则和流程编码为应用程序级代码而非提示指令，Hooks 能够保证命令按预期执行，而不是依赖 LLM 的选择来运行它们。

## Hooks 的常见应用场景
---
Hooks 的应用场景非常灵活且广泛，以下是一些常见的应用示例：

| 应用场景 | 具体功能示例 |
| --- | --- |
| 智能通知系统 | • 当 Claude Code 需要你的输入时，自动发送桌面通知<br>• 集成邮件提醒、Slack 消息等 |
| 自动代码格式化 | • 每次文件编辑后自动运行 prettier 格式化 .ts 文件<br>• 对 .go 文件运行 gofmt<br>• 自动修复 markdown 文件格式问题 |
| 日志记录与审计| • 跟踪和记录所有执行的命令<br>• 用于合规性检查和调试分析 |
| 代码质量反馈 | • 当 Claude Code 生成不符合代码库约定的代码时提供自动反馈<br>• 集成代码检查工具和测试框架 |
| 安全与权限控制 | • 阻止对生产文件或敏感目录的修改<br>• 实施自定义的安全策略 |

## 如何创建一个 Hook？
---
这里从最简单的例子开始，创建一个用于记录 Claude Code 运行命令的 Hook。

**步骤 1：打开 Hook 配置**

在 Claude Code 中运行 `/hooks` 斜杠命令，选择创建 `PreToolUse` 类型的 Hook。

<p align="center">
  <img src="/assets/images/06_高级配置/13caee50b232405c8a0d39c64d644ecd.jpeg" alt="">
</p>

!!! tip "小贴士"
    `PreToolUse` 表示 "在工具使用之前"，这个 Hook 会在 Claude Code 执行任何工具之前被触发。除此之外，Claude Code 还支持创建多种不同的 Hook 类型，我将在下一部分内容展开介绍。

**步骤 2：添加匹配器**

<p align="center">
  <img src="/assets/images/06_高级配置/b29054364fe94dbd8cacedd4fa26bb91.jpeg" alt="">
</p>

选择 `+ Add new matcher…` 并输入 `Bash`。这表示该 Hook 只会在 Claude Code 要执行 Bash 工具时触发。

<p align="center">
  <img src="/assets/images/06_高级配置/372d37e8dced468fb1e0fd417f66e66c.jpeg" alt="">
</p>

!!! tip "小贴士"
    matcher 可以输入 `*` 来匹配所有工具。

**步骤 3：添加 Hook 命令**

<p align="center">
  <img src="/assets/images/06_高级配置/9bb097adbf3e45dcba43743d6dacd904.jpeg" alt="">
</p>

选择 `+ Add new hook…` 并输入以下命令：

```bash
jq -r '"\(.tool_input.command) - \(.tool_input.description // "No description")"' >> ~/.claude/bash-command-log.txt
```

<p align="center">
  <img src="/assets/images/06_高级配置/75892e9629a840699eb32dd395a0b2c5.jpeg" alt="">
</p>

!!! info "命令解析"

    1. `jq -r`：`jq` 是一个强大的 JSON 处理工具。
        - `-r` 参数表示解析 JSON 数据后输出为字符串。
    2. jq 工具的过滤表达式：`'"\(.tool_input.command) - \(.tool_input.description // "No description")"'`。
        - `\(.tool_input.command)`：提取 JSON 中的命令名称。
        - `\(.tool_input.description // "No description")`：提取命令描述，如果没有描述则展示 "No description"。
    3. `>> ~/.claude/bash-command-log.txt`：将结果追加到用户主目录下的 `.claude/bash-command-log.txt` 文件中。

**步骤 4：保存配置**

选择 `User settings` 作为存储位置，那么这个 Hook 的配置将会被保存到用户级配置 `~/.claude/settings.json` 中，它将在全局生效并应用到所有项目。**这里仅简单提及下，在后续章节我会详细介绍 Hook 配置的存储位置和优先级。**

<p align="center">
  <img src="/assets/images/06_高级配置/47f10eedcbd3429384683b0a7e4b2e8c.jpeg" alt="">
</p>

**步骤 5：测试创建的 Hook**

使用 Claude Code 运行简单的命令，比如 `ls`，当执行命令时，这个 Hook 会被触发并执行以下操作：

1.  接收 Claude Code 传递的 JSON 数据，例如：
    ```json
    {
      "tool_input": {
        "command": "ls -la",
        "description": "列出当前目录的详细信息"
      }
    }
    ```

2.  `jq` 工具依照过滤表达式 `'"\(.tool_input.command) - \(.tool_input.description // "No description")"'`，提取 JSON 数据中的关键信息并格式化为字符串，生成类似这样的日志记录：
    ```text
    ls -la - 列出当前目录的详细信息
    ```

3.  追加到日志文件 `.claude/bash-command-log.txt`，保存完整的命令执行历史记录。

执行命令后检查记录的日志文件：

```bash
cat ~/claude_commands.log
```

你应该能看到类似这样的记录：

```text
ls -la - 列出当前目录的详细信息
```

## Hooks 的类型
---
现在你已经成功创建了第一个 Hook，相信你对 Hooks 已经有了一个初步的认识和理解。

下面让我们来了解 Claude Code 支持的所有 Hook 类型。每种类型代表 Claude Code 会在不同的时机触发 Hook，就像不同的 "节点" 一样。

### 调用工具类 Hooks

#### PreToolUse - 调用工具前

**触发时机**：在 Claude Code 执行任何工具之前运行 Hook。

**常见匹配器（匹配条件）**：

- `Task` - 子代理任务
- `Bash` - Shell 命令
- `Glob` - 文件模式匹配
- `Grep` - 内容搜索
- `Read` - 文件读取
- `Edit`、`MultiEdit` - 文件编辑
- `Write` - 文件写入
- `WebFetch`、`WebSearch` - Web 操作
- `*` - 匹配任何工具，你也可以使用空字符串（""）或留空 matcher。

!!! info "常见应用场景"
    记录即将执行的操作、检查操作的权限、预处理工作

#### PostToolUse - 调用工具后

**触发时机**：在 Claude Code 执行工具之后运行 Hook。

!!! info "常见应用场景"
    清理临时文件、验证执行工具的结果是否正确、自动格式化刚刚修改的代码

**实际例子**：

```bash
# 自动格式化刚刚修改的 TypeScript 文件
find . -name "*.ts" -newer /tmp/last_format -exec prettier --write {} \;
touch /tmp/last_format
```

---

### 用户交互类 Hooks

#### UserPromptSubmit - 用户提交提示时

**触发时机**：当用户提交提示时（大模型开始处理之前）运行 Hook。

!!! info "常见应用场景"
    对用户的输入进行验证或预处理

#### Notification - 发送通知时

**触发时机**：当 Claude Code 发送通知时运行。

**一般出现以下情况时会发送通知**：

1. **Claude 需要权限使用工具**："Claude needs your permission to use Bash"
2. **提示输入已空闲至少60秒**："Claude is waiting for your input"

---

### 会话生命周期类 Hooks

#### SessionStart - 会话开始时

**触发时机**：当 Claude Code 启动新的会话或恢复会话时运行 Hook。

**匹配器（匹配条件/开始方式）**：

- `startup` - 启动会话时运行
- `resume` - 通过 `--resume`、`--continue` 或 `/resume` 命令恢复会话时运行
- `clear` - 通过 `/clear` 清除会话记录时运行
- `compact` - 自动或主动执行 `/compact` 命令压缩上下文时运行

!!! info "常见应用场景"
    加载开发上下文（如现有问题或代码库的最近更改）、初始化环境

#### SessionEnd - 会话结束时

**触发时机**：当 Claude Code 会话结束时运行 Hook。

**匹配器（匹配条件/结束原因）**：

- `clear` - 通过 `/clear` 清除会话记录时运行
- `logout` - 用户注销时运行
- `prompt_input_exit` - 当 Claude Code 正在等待用户输入的时候退出会话
- `other` - 因其他情况以致退出会话时

!!! info "常见应用场景"
    统计会话信息、保存会话记录

---

### 任务完成类 Hooks

#### Stop - 主代理任务停止时

**触发时机**：当 Claude Code 主代理完成任务时运行 Hook，如果是由于用户中断导致的停止，则不会运行。

#### SubagentStop - 子代理任务停止时

**触发时机**：当 Claude Code 通过 Task 工具调用相应的子代理完成任务时运行 Hook。

---

### 系统事件类 Hooks

#### PreCompact - 压缩上下文前处理

**触发时机**：当 Claude Code 即将执行压缩上下文操作之前运行 Hook。

**匹配器（匹配条件/压缩方式）**：

- `manual` - 主动执行 `/compact` 命令，Claude Code 开始压缩上下文之前。
- `auto` - Claude Code 自动压缩上下文之前。

## 如何选择合适的 Hooks 类型？
---
选择合适的 Hooks 类型就像选择在 "合适的时机" 做事：

*   **想在 Claude Code "动手"前做准备** → 选择 `PreToolUse`
*   **想在 Claude Code "完成工作"后收尾** → 选择 `PostToolUse`
*   **想在开始对话时进行初始化** → 选择 `SessionStart`
*   **想在结束对话时 "整理环境"** → 选择 `SessionEnd`
*   **想在收到通知时做额外处理** → 选择 `Notification`

## 详解 Hooks 配置
---
在前面已经介绍了如何创建一个 Hook，下面将详细解读 Hooks 的配置方式。

### Hooks 配置文件的存储位置和优先级

Hooks 的配置文件可以存储在以下位置，不同的位置有着不同的优先级：

| 配置类型 | 配置文件位置 | 使用场景 | 应用举例 |
| --- | --- | --- | --- |
| 用户级配置 | `~/.claude/settings.json` | • 所有项目中都使用的 Hooks<br>• 个人习惯和偏好设置<br>• 通用的工具和流程 | • 自动格式化代码<br>• 记录操作日志 |
| 项目级配置 | `.claude/settings.json` | • 特定项目的特殊需求<br>• 团队协作的统一规范<br>• 项目特有的工作流程 | • 特定的测试流程<br>• 项目特有的代码检查 |
| 本地项目配置 | `.claude/settings.local.json` | • 个人在项目中的特殊配置<br>• 不想影响团队其他成员的设置 | • 本地调试配置<br>• 个人工作流定制 |

Hooks 配置遵循优先覆盖原则：本地项目配置具有最高优先级，可以覆盖其他所有配置；项目级配置具有中等优先级，可以覆盖用户级配置；用户级配置具有最低优先级，能够全局生效但会被其他配置覆盖。

---

### Hooks 的 JSON 格式配置

在 `settings.json` 文件中，Hooks 的配置使用 JSON 格式表示，像是一个结构化的清单。**Hooks 按触发时机和匹配器进行组织**，每个匹配器可以有多个 Hook，这里举例一个 `PreToolUse` 类的 Hook 配置：

```json
{
  "hooks": {                    // 所有 hook 配置的根节点
    "PreToolUse": [             // Hook 事件类型（在工具使用前触发）
      {
        "matcher": "Bash",      // 匹配器（这里是 "Bash"，表示只匹配 Bash 命令）
        "hooks": [              // 具体要执行的 hook 列表
          {
            "type": "command",  // Hook 执行的任务类型（目前只支持 "command"）
            "command": "python3 $CLAUDE_PROJECT_DIR/.claude/hooks/my_script.py",  // Hook 要执行的 Shell 命令
            "timeout": 30       // 超时时间（可选）
          }
        ]
      }
    ]
  }
}
```

!!! info "逐项解释这个配置"

    - **`hooks`**：所有 Hooks 配置的根节点
    - **`PreToolUse`**：Hooks 的类型（触发时机）
    - **`matcher`**：Hooks 的匹配器（匹配条件）
    - **具体执行列表**：
        - **`type`**：执行的任务类型（目前只支持 `"command"`）
        - **`command`**：执行的 Shell 命令，可以使用系统环境变量
        - **`timeout`**：超时时间（秒），防止 Hook 执行时间过长

---

### Hooks 的匹配条件 — matcher

匹配器（matcher）是 Hooks 的 "匹配条件"，决定是否执行 Hook。`matcher` 字段需要填写匹配的工具名称，注意区分大小写：

| 匹配类型 | 示例 | 含义 |
| --- | --- | --- |
| 精确匹配 | `"matcher": "Write"` | 只有当 Claude Code 要使用 Write 工具时才触发 |
| 正则表达式匹配 | `"matcher": "Edit\\|Write"` | 当 Claude Code 使用 Edit 或 Write 工具时都会触发 |
| 正则表达式匹配 | `"matcher": "Notebook.*"` | 匹配所有以 "Notebook" 开头的工具 |
| 通配符匹配 | `"matcher": "*"` | Claude Code 使用 any 工具都会触发 |

!!! tip "小贴士"
    目前 `matcher` 字段仅适用于 `PreToolUse` 和 `PostToolUse`。对于像 `UserPromptSubmit`、`Notification`、`Stop` 和 `SubagentStop` 这样不需要匹配器的事件，您可以省略 `matcher` 字段。

## Hooks 的标准输入（stdin）
---
Hooks 通过标准输入（stdin）接收 Claude Code 提供的特殊信息（包含会话信息和 Hooks 事件特定数据的 JSON 数据），就像接收 "参数" 一样，传递信息的结构大致如下：

/// details | 📖 点击查看通用输入结构
```json
{
  // 会话信息
  "session_id": "string",           // 会话 ID
  "transcript_path": "string",      // 会话 JSON 文件路径
  "cwd": "string",                  // Hook 被调用时的当前工作目录

  // Hook 事件特定数据
  "hook_event_name": "string"
  // ...
}
```
///

### PreToolUse 输入

这里以 `PreToolUse` 类 Hooks 事件为例，展示 Claude Code 提供的特殊信息，其中 `tool_input` 的 JSON Schema 取决于调用的工具。

/// details | 💻 查看 PreToolUse 输入示例
```json
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "PreToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.txt",
    "content": "file content"
  }
}
```
///

---

### PostToolUse 输入

`tool_input` 和 `tool_response` 的 JSON Schema 取决于调用的工具。

/// details | 💻 查看 PostToolUse 输入示例
```json
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "PostToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.txt",
    "content": "file content"
  },
  "tool_response": {
    "filePath": "/path/to/file.txt",
    "success": true
  }
}
```
///

---

### Notification 输入

/// details | 💻 查看 Notification 输入示例
```json
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "Notification",
  "message": "Task completed successfully"
}
```
///

---

### UserPromptSubmit 输入

/// details | 💻 查看 UserPromptSubmit 输入示例
```json
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "UserPromptSubmit",
  "prompt": "Write a function to calculate the factorial of a number"
}
```
///

---

### Stop 和 SubagentStop 输入

当 Claude Code 已经由于停止 Hook 而继续时 `stop_hook_active` 为 true。检查此值或处理记录以防止 Claude Code 无限运行。

/// details | 💻 查看 Stop 输入示例
```json
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "hook_event_name": "Stop",
  "stop_hook_active": true
}
```
///

---

### PreCompact 输入

!!! info "custom_instructions 字段来源"

    - **主动压缩（`manual`）**：当用户主动使用 `/compact` 命令时传递的自定义指令。
    - **自动压缩（`auto`）**：系统自动压缩时，此字段通常为空。

/// details | 💻 查看 PreCompact 输入示例
```json
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "hook_event_name": "PreCompact",
  "trigger": "manual",
  "custom_instructions": ""
}
```
///

---

### SessionStart 输入

/// details | 💻 查看 SessionStart 输入示例
```json
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "hook_event_name": "SessionStart",
  "source": "startup"
}
```
///

---

### SessionEnd 输入

/// details | 💻 查看 SessionEnd 输入示例
```json
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "SessionEnd",
  "reason": "exit"
}
```
///

## Hooks 的标准输出（stdout/stderr）
---
Hooks 有两种不同的输出方式来返回信息给 Claude Code。输出的信息包含了**控制 Claude Code 行为的指示**以及**向 Claude Code 和用户的显式反馈**。

### 输出方式一：返回退出错误码

**Hooks 不仅可以执行操作，还可以控制 Claude Code 是否继续执行，这一功能通过"退出状态码"实现。**

| 退出状态码 | 含义 | 行为 |
| --- | --- | --- |
| `exit 0` | 成功 | stdout 会展示给用户（transcript 模式），且部分事件会将其添加到上下文 |
| `exit 2` | 阻塞错误 | stderr 会由 Claude Code 处理，Claude 会根据事件类型决定下一步行为 |
| `exit 其他`| 非阻塞错误 | stderr 会展示给用户，Claude Code 继续执行 |

**对于不同 Hooks 事件类型，返回退出状态码 2 时 Claude Code 的行为：**

| Hooks 事件类型 | 行为 |
| --- | --- |
| PreToolUse | 阻止工具调用，向 Claude Code 展示 stderr |
| PostToolUse | 工具调用后，向 Claude Code 展示 stderr |
| Notification | Claude Code 不会作任何处理，仅向用户展示 stderr |
| UserPromptSubmit | 阻止提示处理，擦除提示，仅向用户展示 stderr |
| Stop/SubagentStop | 阻止停止，向 Claude Code (或其子代理) 展示 stderr |
| 其他 (PreCompact等) | Claude Code 不会作任何处理，仅向用户展示 stderr |

/// details | 💻 示例：Bash 命令校验器 (Python)
```python
#!/usr/bin/env python3
import json
import re
import sys

# 定义校验规则，每条规则由（正则表达式模式，提示信息）元组组成
VALIDATION_RULES = [
  (
    r"\bgrep\b(?!.*\|)",
    "建议使用 'rg'（ripgrep）替代 'grep'，性能更好且功能更丰富",
  ),
  (
    r"\bfind\s+\S+\s+-name\b",
    "建议使用 'rg --files | rg pattern' 或 'rg --files -g pattern' 替代 'find -name'，性能更优",
  ),
]

def validate_command(command: str) -> list[str]:
  # 校验命令，返回所有不符合规则的提示信息
  issues = []
  for pattern, message in VALIDATION_RULES:
    if re.search(pattern, command):
      issues.append(message)
  return issues

try:
  # 从标准输入读取并解析JSON数据
  input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
  print(f"错误：无效的JSON输入：{e}", file=sys.stderr)
  sys.exit(1)

tool_name = input_data.get("tool_name", "")
tool_input = input_data.get("tool_input", {})
command = tool_input.get("command", "")

# 仅当工具名称为 Bash 且命令不为空时才进行校验
if tool_name != "Bash" or not command:
  sys.exit(1)

# 校验命令
issues = validate_command(command)

if issues:
  # 输出所有校验不通过的提示信息到标准错误
  for message in issues:
    print(f"• {message}", file=sys.stderr)
  # 退出码2：阻止工具调用，并将错误信息反馈给Claude
  sys.exit(2)
```
///

---

### 输出方式二：返回结构化的 JSON 数据

除了返回错误状态码，hook 还可以返回结构化的 JSON 数据到 stdout，以实现更复杂的控制。

#### 通用 JSON 字段

所有 hook 类型都可以包含这些可选字段：

```json
{
  "continue": true, // Claude 是否应该在 hook 执行后继续（默认：true）
  "stopReason": "string", // 当 continue 为 false 时展示的消息

  "suppressOutput": true, // 在 transcript 模式中隐藏 stdout（默认：false）
  "systemMessage": "string" // 向用户展示的可选警告消息
}
```

!!! info "控制行为说明"
    如果 `continue` 为 false，Claude Code 会在 hooks 运行后停止处理。

    *   对于 `PreToolUse`，这与 `"permissionDecision": "deny"` 不同，后者仅阻止特定工具调用并向 Claude Code 提供自动反馈。
    *   对于 `PostToolUse`，这与 `"decision": "block"` 不同，后者向 Claude 提供自动反馈。
    *   对于 `UserPromptSubmit`，这防止提示被处理。
    *   对于 `Stop` 和 `SubagentStop`，这优先于任何 `"decision": "block"` 输出。

    `stopReason` 会根据 `continue` 向用户展示停止的原因，不向 Claude Code 展示。

#### PreToolUse 调用工具前的决策控制

**`PreToolUse` hooks 可以通过输出的参数来控制 Claude Code 是否继续调用工具。** 其中 `permissionDecision` 决定了权限处理方式，所以也被称为**权限决策**，而 `permissionDecisionReason` 则是根据不同的权限决策向不同的对象（用户或 Claude Code）展示相应的原因说明。

| `permissionDecision` | 功能描述 | `permissionDecisionReason` 展示对象 |
| --- | --- | --- |
| `"allow"` | 绕过权限系统 | 仅向用户展示 |
| `"deny"` | 防止调用工具 | 向 Claude Code 展示 |
| `"ask"` | 要求用户进一步确认是否调用工具 | 仅向用户展示 |

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow" | "deny" | "ask",
    "permissionDecisionReason": "My reason here"
  }
}
```

!!! note "注意"
    `PreToolUse` hooks 的 `decision` 和 `reason` 字段已弃用。请使用 `hookSpecificOutput.permissionDecision` 和 `hookSpecificOutput.permissionDecisionReason`。弃用的字段 `"approve"` 和 `"block"` 分别映射到 `"allow"` 和 `"deny"`。

/// details | 💻 示例 — PreToolUse 与批准 (Python)
```python
#!/usr/bin/env python3
import json
import sys

# 从 stdin 加载 input
try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)

tool_name = input_data.get("tool_name", "")
tool_input = input_data.get("tool_input", {})

# 示例：自动批准文档文件的文件读取
if tool_name == "Read":
    file_path = tool_input.get("file_path", "")
    if file_path.endswith((".md", ".mdx", ".txt", ".json")):
        # 使用 JSON 输出自动批准工具调用
        output = {
            "decision": "approve",
            "reason": "Documentation file auto-approved",
            "suppressOutput": True  # 不在 transcript 模式中展示
        }
        print(json.dumps(output))
        sys.exit(0)

# 对于其他情况，让正常的权限流程继续
sys.exit(0)
```
///

#### PostToolUse 工具执行后的决策控制

**`PostToolUse` hooks 可以在工具执行后向 Claude Code 提供工具反馈的信息。** 其中 `decision` 决定了工具执行后的反馈方式，当 `decision` 为 `"block"` 时，`reason` 会自动作为提示信息传递给 Claude Code；当为 `undefined` 时，`reason` 则会被忽略。

| `decision` | 功能描述 | `reason` 处理方式 |
| --- | --- | --- |
| `"block"` | 用 `reason` 提示 Claude Code | 向 Claude Code 展示原因 |
| `undefined`| 什么都不做 | 被忽略 |

*   通过 `hookSpecificOutput.additionalContext` 参数可以在工具执行后为 Claude Code 添加要考虑的上下文。

```json
{
  "decision": "block" | undefined,
  "reason": "Explanation for decision",
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "Additional information for Claude"
  }
}
```

!!! info "具体行为说明"

    1. **`decision: "block"`**
        - Claude Code 会继续正常工作，不会停止。如果需要真正停止 Claude Code 的 work，应该使用 `"continue": false` 参数。
        - `reason` 中的信息会作为反馈传递给 Claude Code。
        - Claude Code 会根据反馈信息调整后续行为。
        - 适用于需要告知 Claude Code 工具执行结果 or 异常原因的场景。
    2. **`decision: undefined`**
        - 什么都不做，静默执行。
        - `reason` 字段被完全忽略。
        - 适用于仅需要记录或监控，不需要向 Claude Code 反馈信息的场景。

/// details | 💻 示例 — PostToolUse 与代码 quality 检查 (Python)
```python
#!/usr/bin/env python3
import json
import sys
import subprocess

# 从 stdin 加载 input
try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)

tool_name = input_data.get("tool_name", "")
tool_input = input_data.get("tool_input", {})

# 示例：Python 文件编辑后自动运行代码风格检查
if tool_name == "Edit" and tool_input.get("file_path", "").endswith(".py"):
    file_path = tool_input.get("file_path")

    # 运行 flake8 检查代码风格
    try:
        result = subprocess.run(["flake8", file_path], 
                              capture_output=True, text=True)

        if result.returncode != 0:
            # 代码风格检查失败，向 Claude Code 反馈
            output = {
                "decision": "block",
                "reason": f"代码风格检查失败：\n{result.stdout}\n请修复这些问题后再继续。",
                "hookSpecificOutput": {
                    "hookEventName": "PostToolUse",
                    "additionalContext": "建议运行 autopep8 自动修复格式问题"
                }
            }
            print(json.dumps(output))
            sys.exit(0)
        else:
            # 代码风格检查通过，提供正面反馈
            output = {
                "decision": "block",
                "reason": "代码风格检查通过，文件格式良好。",
                "hookSpecificOutput": {
                    "hookEventName": "PostToolUse"
                }
            }
            print(json.dumps(output))
            sys.exit(0)

    except FileNotFoundError:
        # flake8 未安装，静默通过
        sys.exit(0)

# 对于其他情况，不做任何处理
sys.exit(0)
```
///

#### UserPromptSubmit 用户提示时的决策控制

**`UserPromptSubmit` hooks 可以在用户提交提示时进行拦截和处理。** 其中 `decision` 决定了是否允许提示继续处理，当 `decision` 为 `"block"` 时，提示会被阻止并从上下文中擦除；当为 `undefined` 时，提示正常处理。

| `decision` | 功能描述 | `reason` 处理方式 |
| --- | --- | --- |
| `"block"` | 防止提示被处理，从上下文中擦除 | 向用户展示擦除的原因但不添加到上下文 |
| `undefined`| 允许提示正常处理 | 被忽略 |

*   通过 `hookSpecificOutput.additionalContext` 参数可以在 Claude Code 处理提示前添加额外的上下文信息。

```json
{
  "decision": "block" | undefined,
  "reason": "Explanation for decision",
  "hookSpecificOutput": {
    "hookEventName": "UserPromptSubmit",
    "additionalContext": "My additional context here"
  }
}
```

!!! info "具体行为说明"

    1. **`decision: "block"`**
        - 完全阻止 Claude Code 处理用户提示。
        - 提示的内容会从对话上下文中被擦除。
        - `reason` 信息仅向用户展示，不会展示给 Claude Code。
        - 适用于内容过滤、权限控制或提示验证失败的场景。
    2. **`decision: undefined`**
        - 允许 Claude Code 正常处理提示。
        - 可通过 `additionalContext` 为 Claude Code 添加额外信息。
        - 适用于提示增强、需额外上下文注入的场景。

/// details | 💻 示例 — UserPromptSubmit 与内容过滤 (Python)
```python
#!/usr/bin/env python3
import json
import sys
import re

# 从 stdin 加载 input
try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)

user_prompt = input_data.get("user_prompt", "")

# 敏感词列表
sensitive_words = ["password", "secret", "token", "api_key"]

# 检查是否包含敏感信息
for word in sensitive_words:
    if re.search(rf"\b{word}\b", user_prompt.lower()):
        # 阻止包含敏感信息的提示
        output = {
            "decision": "block",
            "reason": f"提示包含敏感信息 '{word}'，已被阻止处理。请移除敏感内容后重新提交。",
            "hookSpecificOutput": {
                "hookEventName": "UserPromptSubmit"
            }
        }
        print(json.dumps(output))
        sys.exit(0)

# 检查提示长度，如果过长则添加警告上下文
if len(user_prompt) > 1000:
    output = {
        "hookSpecificOutput": {
            "hookEventName": "UserPromptSubmit",
            "additionalContext": "注意：用户提交了一个较长的提示，请仔细阅读并确保理解所有要求。"
        }
    }
    print(json.dumps(output))
    sys.exit(0)

# 正常情况下不做任何处理
sys.exit(0)
```
///

#### Stop/SubagentStop 代理任务停止时的决策控制

**`Stop` 和 `SubagentStop` hooks 可以控制 Claude Code 是否允许停止工作。** 其中 `decision` 决定了是否允许停止，当 `decision` 为 `"block"` 时，Claude Code 会被要求继续工作，且必须提供 `reason` 告诉 Claude Code 为什么需要继续以及如何继续；当为 `undefined` 时，允许正常停止。

| `decision` | 功能描述 | `reason` 处理方式 |
| --- | --- | --- |
| `"block"` | 防止 Claude Code 停止，要求继续工作 | 向 Claude Code 展示继续工作的原因 |
| `undefined`| 允许 Claude Code 正常停止 | 被忽略 |

```json
{
  "decision": "block" | undefined,
  "reason": "Must be provided when Claude is blocked from stopping"
}
```

!!! info "具体行为说明"

    1. **`decision: "block"`**
        - 阻止 Claude Code 停止当前任务。
        - **必须提供 `reason` 告诉 Claude Code 为什么需要继续以及如何继续。**
        - Claude Code 会根据 `reason` 中的提示继续工作。
        - 适用于任务未完成、需要额外步骤的场景。
    2. **`decision: undefined`**
        - 允许 Claude Code 正常停止。
        - `reason` 字段被忽略。
        - 适用于任务已完成或可以正常结束的场景。

/// details | 💻 示例 — Stop 与任务完整性检查 (Python)
```python
#!/usr/bin/env python3
import json
import sys
import os

# 从 stdin 加载 input
try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)

# 检查项目是否有未提交的更改
try:
    result = os.system("git diff --quiet")
    has_uncommitted_changes = (result != 0)

    if has_uncommitted_changes:
        # 有未提交的更改，阻止停止
        output = {
            "decision": "block",
            "reason": "检测到未提交的代码更改。请先提交或暂存这些更改，然后运行测试确保代码质量，最后更新相关文档。"
        }
        print(json.dumps(output))
        sys.exit(0)

except:
    # 如果不是 git 仓库或其他错误，允许正常停止
    pass

# 检查是否有测试文件但没有运行测试
if os.path.exists("test") or os.path.exists("tests"):
    # 这里可以添加检查最近是否运行过测试的逻辑
    output = {
        "decision": "block",
        "reason": "项目包含测试文件。建议在结束前运行测试套件确保代码质量：npm test 或 python -m pytest"
    }
    print(json.dumps(output))
    sys.exit(0)

# 正常情况下允许停止
sys.exit(0)
```
///

#### SessionStart 会话开始时自动加载上下文

**`SessionStart` hooks 允许在会话开始时自动加载上下文信息。** 这个 hook 主要用于为 Claude Code 提供项目相关的背景信息、开发环境状态或其他有用的上下文。

```json
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "My additional context here"
  }
}
```

!!! info "具体行为说明"

    - **自动上下文注入**：通过 `additionalContext` 为 Claude Code 提供项目背景信息。
    - **多个 hooks 支持**：多个 `SessionStart` hooks 的 `additionalContext` 会被自动连接后添加到上下文中。
    - **会话初始化**：在每次新会话或恢复会话时都会自动执行。
    - **无决策控制**：`SessionStart` hooks 不支持 `decision` 字段，目前只能用于添加上下文。

**具体示例 — SessionStart 与项目上下文加载**

```python
#!/usr/bin/env python3
import json
import sys
import os
import subprocess
from datetime import datetime

# 从 stdin 加载输入
try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)

context_parts = []

# 添加项目基本信息
if os.path.exists("package.json"):
    context_parts.append("这是一个 Node.js 项目")
elif os.path.exists("requirements.txt") or os.path.exists("pyproject.toml"):
    context_parts.append("这是一个 Python 项目")
elif os.path.exists("Cargo.toml"):
    context_parts.append("这是一个 Rust 项目")

# 添加 Git 状态信息
try:
    result = subprocess.run(["git", "status", "--porcelain"], 
                          capture_output=True, text=True)
    if result.returncode == 0:
        if result.stdout.strip():
            context_parts.append("当前有未提交的更改")
        else:
            context_parts.append("工作目录是干净的")

        # 获取当前分支
        branch_result = subprocess.run(["git", "branch", "--show-current"], 
                                     capture_output=True, text=True)
        if branch_result.returncode == 0:
            branch = branch_result.stdout.strip()
            context_parts.append(f"当前分支：{branch}")
except:
    pass

# 添加最近的活动信息
if os.path.exists(".claude"):
    context_parts.append("项目已配置 Claude Code hooks")

# 添加时间信息
current_time = datetime.now().strftime("%Y-%m-%d %H:%M")
context_parts.append(f"会话开始时间：{current_time}")

# 构建上下文信息
if context_parts:
    additional_context = "项目状态概览：\n" + "\n".join(f"- {part}" for part in context_parts)

    output = {
        "hookSpecificOutput": {
            "hookEventName": "SessionStart",
            "additionalContext": additional_context
        }
    }
    print(json.dumps(output))

sys.exit(0)
```

#### SessionEnd 会话结束时自动运行

**`SessionEnd` hooks 在会话结束时就会自动运行，一般用于在会话结束前完成必要的收尾工作**，例如执行清理任务和数据保存。这类 hook 无法阻止会话终止，所以不需要向 Claude Code 传递任何参数。

**具体行为说明：** - **自动执行**：在每次会话结束时自动触发，无需用户干预。 - **无决策控制**：SessionEnd hooks 无法阻止会话终止，所以不需要输出 `decision` 等字段。 - **清理任务**：适用于临时文件清理、状态保存、日志记录等收尾工作。

**具体示例 — SessionEnd 与项目清理**

```python
#!/usr/bin/env python3
import json
import sys
import os
import shutil
import subprocess
from datetime import datetime

# 从 stdin 加载输入
try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)

# 清理临时文件
temp_dirs = [".tmp", "temp", "__pycache__", ".pytest_cache"]
for temp_dir in temp_dirs:
    if os.path.exists(temp_dir):
        try:
            shutil.rmtree(temp_dir)
            print(f"已清理临时目录: {temp_dir}", file=sys.stderr)
        except Exception as e:
            print(f"清理 {temp_dir} 时出错: {e}", file=sys.stderr)

# 清理临时文件
temp_patterns = ["*.tmp", "*.log", "*.pyc"]
for pattern in temp_patterns:
    try:
        result = subprocess.run(["find", ".", "-name", pattern, "-delete"], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print(f"已清理临时文件: {pattern}", file=sys.stderr)
    except:
        pass

# 保存会话统计信息
session_log = {
    "session_end_time": datetime.now().isoformat(),
    "project_path": os.getcwd(),
    "git_status": None
}

# 获取 Git 状态
try:
    result = subprocess.run(["git", "status", "--porcelain"], 
                          capture_output=True, text=True)
    if result.returncode == 0:
        session_log["git_status"] = "clean" if not result.stdout.strip() else "dirty"

        # 获取当前分支
        branch_result = subprocess.run(["git", "branch", "--show-current"], 
                                     capture_output=True, text=True)
        if branch_result.returncode == 0:
            session_log["current_branch"] = branch_result.stdout.strip()
except:
    pass

# 保存会话日志
log_dir = ".claude/logs"
os.makedirs(log_dir, exist_ok=True)
log_file = os.path.join(log_dir, f"session_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json")

try:
    with open(log_file, 'w', encoding='utf-8') as f:
        json.dump(session_log, f, indent=2, ensure_ascii=False)
    print(f"会话日志已保存: {log_file}", file=sys.stderr)
except Exception as e:
    print(f"保存会话日志时出错: {e}", file=sys.stderr)

# 输出标准响应
output = {
    "hookSpecificOutput": {
        "hookEventName": "SessionEnd"
    }
}
print(json.dumps(output))
sys.exit(0)
```

## Hooks 实战案例
---
### 案例 1：智能通知系统

**目标**：当 Claude Code 需要你的输入或确认时，发送桌面通知提醒你。
**难度**：⭐⭐
**适用系统**：macOS（其他系统需要自行更改通知命令）

/// details | 📄 点击查看详细配置与原理
**配置文件**：
```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude需要你的注意\" with title \"Claude Code\" sound name \"Glass\"'",
            "timeout": 10
          }
        ]
      }
    ]
  }
}
```

**工作原理**：

1. 监听所有 Claude Code 的通知事件
2. 使用 macOS 的 AppleScript 发送桌面通知

**效果**：当 Claude Code 需要你的输入或确认时，你会收到桌面通知和声音提醒。
///

---

### 案例 2：代码质量检查

**目标**：在 Claude Code 编辑 Python 文件后，自动运行代码风格检查。
**难度**：⭐⭐

/// details | 📄 点击查看详细配置与原理
**前提条件**：安装 `flake8`
```bash
pip install flake8
```

**配置文件**：
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "file=$(echo '$CLAUDE_TOOL_INPUT' | jq -r '.file_path // .path'); if [[ \"$file\" == *.py ]]; then echo '  检查Python代码风格...'; flake8 \"$file\" --max-line-length=88 || echo '⚠️  代码风格需要改进'; fi",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

**工作原理**：

1. 检查被编辑的文件是否是 Python 文件
2. 如果是，运行 `flake8` 进行代码风格检查
3. 显示检查结果，帮助维护代码质量

**效果**：每次 Claude Code 编辑 Python 文件后，你都会看到代码风格检查的结果。
///

---

### 案例 3：自动代码格式化

**目标**：每次 Claude Code 编辑 JavaScript 或 TypeScript 文件后自动格式化代码。
**难度**：⭐⭐⭐

/// details | 📄 点击查看详细配置与原理
**前提条件**：确保你的系统已安装 `prettier`
```bash
npm install -g prettier
```

**配置文件**：
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "if echo '$CLAUDE_TOOL_INPUT' | jq -r '.file_path // .path' | grep -E '\.(js|ts)$' > /dev/null; then file=$(echo '$CLAUDE_TOOL_INPUT' | jq -r '.file_path // .path'); echo '正在格式化: $file'; prettier --write \"$file\"; fi",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

**工作原理**：

1. 监听 Claude Code 的文件编辑操作
2. 检查被编辑的文件是否是 JS/TS 文件
3. 如果是，就用 `prettier` 自动格式化
4. 显示格式化的文件名

**效果**：每次 Claude Code 修改 JavaScript 或 TypeScript 文件后，代码会自动格式化变得整齐美观。
///

---

### 案例 4：文件保护系统

**目标**：防止 Claude Code 意外编辑你重要的配置文件或生产环境的文件。
**难度**：⭐⭐⭐

/// details | 📄 点击查看详细配置与原理
**配置文件**：
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "file=$(echo '$CLAUDE_TOOL_INPUT' | jq -r '.file_path // .path'); if echo \"$file\" | grep -E '(production|secrets|config\\.prod|\\.env\\.prod)'; then echo '错误：不能编辑受保护的文件' >&2; exit 2; fi",
            "timeout": 5
          }
        ]
      }
    ]
  }
}
```

**工作原理**：

1. 在 Claude Code 尝试编辑或写入文件之前检查文件路径
2. 如果文件路径包含敏感关键词（如 "production"、"secrets" 等），则阻止操作
3. 向 Claude Code 返回错误信息，说明为什么不能编辑该文件

**保护的文件类型**：

- 生产环境配置文件
- 密钥和秘密文件
- 生产环境变量文件

**效果**：当 Claude Code 尝试编辑这些敏感文件时，操作会被阻止，并显示友好的错误信息。
///

---

### 案例 5：项目自动备份系统

**目标**：每次会话结束时，自动备份重要的项目文件。
**难度**：⭐⭐⭐⭐

/// details | 📄 点击查看实现过程
**第一步：创建备份脚本**

创建文件 `~/.claude/hooks/backup_project.sh`：
```bash
#!/bin/bash

# 获取项目目录
PROJECT_DIR="$CLAUDE_PROJECT_DIR"
if [ -z "$PROJECT_DIR" ]; then
    PROJECT_DIR="$(pwd)"
fi

# 创建备份目录
BACKUP_DIR="$HOME/claude_backups/$(basename "$PROJECT_DIR")"
mkdir -p "$BACKUP_DIR"

# 生成时间戳
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.tar.gz"

# 备份重要文件（排除 node_modules 等大文件夹）
echo "正在备份项目到: $BACKUP_FILE"
tar -czf "$BACKUP_FILE" \
    --exclude="node_modules" \
    --exclude=".git" \
    --exclude="*.log" \
    --exclude="dist" \
    --exclude="build" \
    -C "$(dirname "$PROJECT_DIR")" \
    "$(basename "$PROJECT_DIR")"

echo "✅ 备份完成: $BACKUP_FILE"

# 只保留最近 5 个备份
ls -t "$BACKUP_DIR"/backup_*.tar.gz | tail -n +6 | xargs -r rm
echo "  清理了旧备份，保留最近 5 个"
```

**第二步：设置脚本权限**
```bash
chmod +x ~/.claude/hooks/backup_project.sh
```

**第三步：配置 Hook**
```json
{
  "hooks": {
    "SessionEnd": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/backup_project.sh",
            "timeout": 60
          }
        ]
      }
    ]
  }
}
```

**工作原理**：

1. 在每次 Claude Code 会话结束前触发
2. 自动打包项目文件（排除不必要的大文件夹）
3. 按时间戳命名备份文件
4. 自动清理，只保留最近 5 个备份

**效果**：每当结束与 Claude Code 的对话时，你的项目都会被自动备份到 `~/claude_backups/` 目录。
///

## 优化 Hooks 的最佳实践
---
掌握了 Hooks 的基本用法后，让我们进一步了解优化 Hooks 的最佳实践，让你的 Hooks 更稳定、更高效。

### 1. 让 Hooks 运行得更快

#### 1.1 尽可能使用简单快速的命令
```bash
# ❌ 不好的做法：耗时的操作
find / -name "*.log" -exec gzip {} \;  # 可能需要很长时间

# ✅ 好的做法：快速操作
echo "$(date): Hooks执行" >> ~/quick_log.txt
```

#### 1.2 设置合理的超时时间
```json
{
  "type": "command",
  "command": "your_command_here",
  "timeout": 10  // 10秒超时，防止Hooks卡住
}
```

#### 1.3 对于耗时操作，使用后台执行
```bash
# 将耗时任务放到后台
echo "开始备份..."
./backup_script.sh > /dev/null 2>&1 &  # &符号表示后台运行
echo "备份已启动"
```

---

### 2. 让 Hooks 更可靠

#### 2.1 检查依赖工具是否存在
```bash
#!/bin/bash

# 检查必需的工具
if ! command -v jq &> /dev/null; then
    echo "❌ 错误：需要安装jq工具" >&2
    echo "请运行：brew install jq" >&2
    exit 1
fi

if ! command -v prettier &> /dev/null; then
    echo "❌ 错误：需要安装prettier" >&2
    echo "请运行：npm install -g prettier" >&2
    exit 1
fi

echo "✅ 所有依赖都已安装"
```

#### 2.2 安全地处理 JSON 数据
```bash
# 先检查 JSON 是否有效
if ! echo "$CLAUDE_TOOL_INPUT" | jq . > /dev/null 2>&1; then
    echo "❌ 无效的 JSON 输入" >&2
    exit 1
fi

# 然后安全地提取数据
file_path=$(echo "$CLAUDE_TOOL_INPUT" | jq -r '.file_path // "unknown"')
if [ "$file_path" = "unknown" ]; then
    echo "⚠️  无法获取文件路径" >&2
    exit 1
fi
```

---

### 3. 让 Hooks 更安全

#### 3.1 验证文件路径的安全性
```bash
# 检查文件路径是否安全
file_path=$(echo "$CLAUDE_TOOL_INPUT" | jq -r '.file_path // .path')

# 防止路径遍历攻击
if [[ "$file_path" == *"../"* ]] || [[ "$file_path" == "/"* ]]; then
    echo "  不安全的文件路径：$file_path" >&2
    exit 2
fi

# 检查文件是否在允许的目录内
if [[ "$file_path" != "$CLAUDE_PROJECT_DIR"* ]]; then
    echo "  文件不在项目目录内：$file_path" >&2
    exit 2
fi
```

#### 3.2 检查文件权限
```bash
# 检查是否有写入权限
if [[ ! -w "$(dirname "$file_path")" ]]; then
    echo "  没有写入权限：$file_path" >&2
    exit 2
fi
```

---

### 4. 让 Hooks 更容易调试

#### 4.1 创建详细的日志
```bash
# 创建一个日志函数
log_message() {
    local level="$1"
    local message="$2"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$level] $message" >> ~/.claude/hooks_debug.log
}

# 使用日志函数
log_message "INFO" "Hooks 开始执行"
log_message "DEBUG" "处理文件：$file_path"
log_message "INFO" "Hooks 执行完成"
```

#### 4.2 保存 Hooks 的输入信息（用于调试）
```bash
# 只在调试模式下保存详细信息
if [ "$CLAUDE_DEBUG" = "true" ]; then
    echo "=== Hooks 调试信息 ===" >> ~/.claude/hooks_debug.log
    echo "时间：$(date)" >> ~/.claude/hooks_debug.log
    echo "项目目录：$CLAUDE_PROJECT_DIR" >> ~/.claude/hooks_debug.log
    echo "工具输入：$CLAUDE_TOOL_INPUT" >> ~/.claude/hooks_debug.log
    echo "==================" >> ~/.claude/hooks_debug.log
fi
```

---

### 5. 组织你的 Hooks 配置

#### 5.1 按环境分离配置
```bash
# 在 Hooks 中检查环境
if [ "$NODE_ENV" = "production" ]; then
    echo "  生产环境模式：启用严格检查"
    # 生产环境的严格检查
else
    echo " ️  开发环境模式：宽松检查"
    # 开发环境的宽松检查
fi
```

#### 5.2 使用配置文件

创建 `~/.claude/hooks_config.json`：
```json
{
  "notifications": {
    "enabled": true,
    "sound": "Glass"
  },
  "formatting": {
    "auto_format": true,
    "file_types": ["js", "ts", "py"]
  },
  "security": {
    "protected_paths": ["production", "secrets", ".env.prod"]
  }
}
```

然后在 Hooks 中读取配置：
```bash
# 读取配置
config_file="$HOME/.claude/hooks_config.json"
if [ -f "$config_file" ]; then
    auto_format=$(jq -r '.formatting.auto_format' "$config_file")
    if [ "$auto_format" = "true" ]; then
        echo "✅ 自动格式化已启用"
    fi
fi
```

## 通用 Hooks 模板
---
这个模板包含了错误处理、日志记录、调试支持等最佳实践，你可以基于它来编写自己的 Hooks。

/// details | 📄 点击查看 bash 模板代码
```bash
#!/bin/bash
# Hooks 模板 - 复制这个模板开始编写你的 Hooks

set -euo pipefail  # 严格模式

# 配置
LOG_FILE="$HOME/.claude/hooks.log"
DEBUG=${CLAUDE_DEBUG:-false}

# 日志函数
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# 调试函数
debug() {
    if [ "$DEBUG" = "true" ]; then
        log "DEBUG: $1"
    fi
}

# 主要逻辑开始
log "Hooks 开始执行"
debug "工具输入：$CLAUDE_TOOL_INPUT"

# 检查依赖
if ! command -v jq &> /dev/null; then
    log "ERROR: jq 未安装"
    exit 1
fi

# 解析输入
if ! echo "$CLAUDE_TOOL_INPUT" | jq . > /dev/null 2>&1; then
    log "ERROR: 无效的 JSON 输入"
    exit 1
fi

# 你的 Hooks 逻辑写在这里
# ...

log "Hooks 执行完成"
exit 0
```
///

## Hooks 常见问题
---
即使是最有经验的开发者，也会遇到 Hooks 不按预期工作的情况。别担心，这里有一份完整的故障排除指南。

/// details | ❓ 问题 1：Hooks 根本不执行
**症状**：你设置了 Hook，但它从来不运行。

**可能原因和解决方案**：

1. 检查匹配器是否正确
```bash
# 检查你的配置文件
cat ~/.claude/settings.json | jq '.hooks'

# 确认匹配器名称是否正确（区分大小写）
# 正确："Bash", "Edit", "Write"
# 错误："bash", "edit", "write"
```

2. 验证 JSON 语法
```bash
# 检查 JSON 是否有效
cat ~/.claude/settings.json | jq .

# 如果有语法错误，会显示错误信息
```

3. 确认配置文件位置
```bash
# 检查用户级配置
ls -la ~/.claude/settings.json

# 检查项目级配置
ls -la .claude/settings.json
```
///

/// details | ❓ 问题 2：Hooks 执行但失败了
**症状**：Hooks 开始执行，但中途出错。

**诊断步骤**：

1. 检查 Hooks 脚本权限
```bash
# 确保脚本可执行
chmod +x ~/.claude/hooks/your_script.sh
```

2. 手动测试 Hooks 脚本
```bash
# 模拟 Claude 的环境变量
export CLAUDE_TOOL_INPUT='{"file_path":"/path/to/test.js"}'
export CLAUDE_PROJECT_DIR="$(pwd)"

# 手动运行 Hook
bash ~/.claude/hooks/your_script.sh
```

3. 检查依赖工具
```bash
# 检查 Hooks 需要的工具是否安装
command -v jq || echo "jq 未安装"
command -v prettier || echo "prettier 未安装"
```
///

/// details | ❓ 问题 3：Hooks 运行太慢
**症状**：Hooks 执行时间很长，影响 Claude Code 的响应速度。

1. 添加超时设置
```json
{
  "type": "command",
  "command": "your_slow_command",
  "timeout": 10
}
```

2. 优化 Hooks 逻辑
```bash
# 避免全盘搜索
find / -name "*.log"  # ❌ 很慢
find . -maxdepth 2 -name "*.log"  # ✅ 更快
```

3. 使用后台处理
```bash
# 将耗时操作放到后台
long_running_task.sh &
echo "任务已启动"
```
///

## 写在最后
---
记住，一个好的 Hook 应该具备这些特质：

- **目标明确**：解决特定的问题，不做无关的事情
- **稳定可靠**：能够处理各种边界情况和错误
- **性能友好**：不影响正常的工作流程
- **易于维护**：代码清晰，配置简单

Hooks 系统的真正价值不在于炫技，而在于让 AI 编程变得更加可控、安全和高效。当你发现自己在重复做某些操作时，问问自己："这个能用 Hooks 实现自动化吗？"

相信通过这两篇文章的学习，你已经具备了设计和实现自己的 Hooks 系统的能力。现在，是时候在你的项目中实践这些知识，让 Claude Code 真正成为你的智能编程伙伴吧！