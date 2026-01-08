# VibeGame Studio

AI 驱动的游戏策划案智能生成工具。

将你模糊的游戏创意，转化为完整的策划案文档。

## 快速开始

### 方式一：Claude Code 模式（推荐）

无需 API Key，直接在 Claude Code 中使用：

```bash
# 在这个项目目录下打开 Claude Code
cd Vibegame-studio

# 一键生成完整策划案
/generate 一款结合 Roguelike 和塔防的手游

# 或者分步调用各 Agent
/producer 一款结合 Roguelike 和塔防的手游    # 制作人：提炼玩法支柱
/system-designer                              # 系统策划：设计系统架构
/lead-designer                                # 主策划：整合输出策划案
```

### 方式二：API 模式（给其他人用）

需要 Claude API Key：

```bash
# 1. 安装依赖
npm install

# 2. 设置环境变量
set ANTHROPIC_API_KEY=your-api-key

# 3. 生成策划案
npm run generate "一款结合 Roguelike 和塔防的手游"
```

## 知识库

在 `docs/` 目录下添加你的参考文档，AI 会参考这些文档生成更专业的策划案：

```
docs/
├── my-designs/      # 你的历史策划案
│   └── xxx-策划案.md
└── references/      # 行业参考资料
    └── roguelike-设计要点.md
```

## Agent 角色

| 命令 | 角色 | 职责 |
|------|------|------|
| `/producer` | 游戏制作人 | 提炼核心玩法支柱和游戏愿景 |
| `/system-designer` | 系统策划 | 设计系统架构和核心循环 |
| `/lead-designer` | 主策划 | Review 并输出完整策划案 |
| `/generate` | 协调器 | 一键执行完整流程 |

## 输出示例

生成的策划案会保存到 `output/` 目录，包含：

- 核心愿景和玩法支柱
- 系统架构图（Mermaid）
- 核心玩法循环
- 用户流程设计
- 主策划 Review 意见
- 风险提示和建议

## 目录结构

```
vibegame-studio/
├── .claude/commands/    # 自定义 Skills（Agent 定义）
│   ├── generate.md      # 一键生成
│   ├── producer.md      # 制作人
│   ├── system-designer.md # 系统策划
│   └── lead-designer.md # 主策划
├── src/                 # API 版本源码
│   ├── agents/          # Agent 配置
│   ├── cli.ts           # CLI 入口
│   └── index.ts         # 主程序
├── docs/                # 知识库文档
├── output/              # 生成的策划案
├── CLAUDE.md            # Claude Code 配置
└── package.json
```

## 后续扩展

- [ ] 添加数值策划 Agent
- [ ] 添加战斗策划 Agent
- [ ] 添加白盒原型生成
- [ ] 添加 Web 界面
- [ ] 添加 RAG 向量检索

## 作者

William

---

Made with ❤️ and Claude
