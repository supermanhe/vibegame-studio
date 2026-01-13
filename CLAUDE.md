# VibeGame Studio - 游戏策划案智能生成

本项目是一个基于 Claude Code 的游戏策划案智能生成工具。

## 项目说明

这是一个多 Agent 协作系统，用于将模糊的游戏创意转化为完整的策划案文档。

## 知识库

在生成策划案时，请参考 `docs/` 目录下的文档：
- `docs/my-designs/` - 历史策划案（作为设计风格参考）
- `docs/my-designs/new/数值设计/` - 数值表格参考
- `docs/my-designs/new/策划配表/` - 配表格式参考
- `docs/my-designs/new/战斗/` - 怪物AI脚本参考
- `docs/references/` - 行业参考资料

## Agent 角色定义

本项目包含以下 Agent 角色（通过 /skill 调用）：

### /producer - 制作人（统筹者）

**职责**：
- 定义核心愿景和玩法支柱
- 分发任务给其他策划角色
- Review 各角色产出
- 整合最终总策划案

**输出**：
- `output/producer/[游戏名]-愿景.md`
- `output/[游戏名]-总策划案.md`

### /system-designer - 系统策划

**职责**：
- 设计核心玩法循环
- 规划系统模块架构
- 设计用户流程

**依赖**：制作人愿景文档
**输出**：`output/system/[游戏名]-系统架构.md`

### /numerical-designer - 数值策划

**职责**：
- 设计经济系统
- 设计成长曲线
- 平衡性验证

**依赖**：系统架构文档
**输出**：`output/numerical/[游戏名]-数值设计.md`

### /worldview-designer - 世界观策划

**职责**：
- 设计世界背景
- 设计角色设定
- 设计剧情框架

**依赖**：制作人愿景文档（可与系统策划并行）
**输出**：`output/worldview/[游戏名]-世界观.md`

### /combat-designer - 战斗策划

**职责**：
- 设计战斗模式
- 设计技能系统
- 设计怪物AI和动作帧表

**依赖**：系统架构文档
**输出**：`output/combat/[游戏名]-战斗设计.md`

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

## 输出目录结构

```
output/
├── [游戏名]-总策划案.md      # 制作人最终输出
├── producer/
│   └── [游戏名]-愿景.md      # 制作人初步产出
├── system/
│   └── [游戏名]-系统架构.md
├── numerical/
│   └── [游戏名]-数值设计.md
├── worldview/
│   └── [游戏名]-世界观.md
└── combat/
    └── [游戏名]-战斗设计.md
```

## 使用方式

1. 输入游戏创意，调用 `/producer` 定义愿景
2. 并行调用 `/system-designer` 和 `/worldview-designer`
3. 系统架构完成后，并行调用 `/numerical-designer` 和 `/combat-designer`
4. 再次调用 `/producer` 进行 Review 和整合
5. 最终输出完整策划案

## 中文输出

请使用中文进行所有输出和文档编写。
