# VibeGame Studio

AI 驱动的游戏策划案智能生成工具。

将你模糊的游戏创意，转化为完整的策划案文档。

## 快速开始

在 Claude Code 中打开本项目目录：

```bash
cd Vibegame-studio
```

然后使用 Skills 生成策划案：

```bash
# 第一步：制作人分析创意，定义愿景
/producer 一款结合 Roguelike 和塔防的手游

# 第二步：系统策划和世界观策划（可并行）
/system-designer
/worldview-designer

# 第三步：数值策划和战斗策划（依赖系统架构，可并行）
/numerical-designer
/combat-designer

# 第四步：制作人整合输出总策划案
/producer
```

## 知识库

在 `docs/` 目录下添加你的参考文档，AI 会参考这些文档生成更专业的策划案：

```
docs/
├── my-designs/      # 历史策划案（设计风格参考）
│   └── xxx-策划案.md
└── references/      # 行业参考资料
    └── roguelike-设计要点.md
```

## Skills（Agent 角色）

| 命令 | 角色 | 职责 |
|------|------|------|
| `/producer` | 游戏制作人 | 定义核心愿景、分发任务、整合输出 |
| `/system-designer` | 系统策划 | 设计系统架构和核心循环 |
| `/worldview-designer` | 世界观策划 | 设计世界背景、角色、剧情 |
| `/numerical-designer` | 数值策划 | 设计经济系统和成长曲线 |
| `/combat-designer` | 战斗策划 | 设计战斗系统和怪物AI |

## 工作流程

```
/producer（定大方向）
         │
    ┌────┼────┐
    ↓         ↓
/worldview  /system-designer ←── 可并行
              │
         ┌────┴────┐
         ↓         ↓
    /numerical  /combat-designer ←── 可并行
              │
              ↓
       /producer（Review & 整合）
              ↓
         总策划案
```

## 输出示例

生成的策划案会保存到 `output/` 目录：

```
output/
├── [游戏名]-总策划案.md      # 最终输出
├── producer/
│   └── [游戏名]-愿景.md
├── system/
│   └── [游戏名]-系统架构.md
├── numerical/
│   └── [游戏名]-数值设计.md
├── worldview/
│   └── [游戏名]-世界观.md
└── combat/
    └── [游戏名]-战斗设计.md
```

## 目录结构

```
vibegame-studio/
├── .claude/
│   └── skills/              # Skills 定义（Agent 角色）
│       ├── producer/
│       ├── system-designer/
│       ├── numerical-designer/
│       ├── worldview-designer/
│       └── combat-designer/
├── docs/                    # 知识库文档
├── output/                  # 生成的策划案
├── CLAUDE.md                # Claude Code 配置
└── README.md
```

## 后续扩展

- [ ] 添加白盒原型生成
- [ ] 添加 Web 界面
- [ ] 添加 RAG 向量检索

## 作者

William

---

Made with Claude Code
