/**
 * VibeGame Studio - API 版本主程序
 *
 * 当你想给其他人用时，启用这个文件：
 * 1. 获取 Claude API Key
 * 2. 设置环境变量 ANTHROPIC_API_KEY
 * 3. 运行 npm run generate "你的游戏创意"
 */

import Anthropic from "@anthropic-ai/sdk";
import { agents, AgentType, AgentConfig } from "./agents/index.js";
import * as fs from "fs/promises";
import * as path from "path";

// 初始化 Claude 客户端
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * 调用单个 Agent
 */
async function callAgent(
  agent: AgentConfig,
  userMessage: string,
  context: string = ""
): Promise<string> {
  console.log(`\n🎮 [${agent.role}] 开始工作...`);

  const messages: Anthropic.MessageParam[] = [];

  // 如果有上下文（前面 Agent 的输出），加入对话
  if (context) {
    messages.push({
      role: "user",
      content: `以下是之前的设计产出，请基于此继续：\n\n${context}`,
    });
    messages.push({
      role: "assistant",
      content: "好的，我已经了解之前的设计内容，请继续。",
    });
  }

  // 用户的新请求
  messages.push({
    role: "user",
    content: userMessage,
  });

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: agent.systemPrompt,
    messages: messages,
  });

  const result =
    response.content[0].type === "text" ? response.content[0].text : "";

  console.log(`✅ [${agent.role}] 完成`);

  return result;
}

/**
 * 运行完整的策划案生成流程
 */
export async function generateGameDesign(gameIdea: string): Promise<string> {
  console.log("🚀 VibeGame Studio 启动");
  console.log(`📝 游戏创意: ${gameIdea}\n`);

  // 阶段 1: 制作人分析
  const producerOutput = await callAgent(
    agents.producer,
    `请分析这个游戏创意并提炼玩法支柱：\n\n${gameIdea}`
  );

  // 阶段 2: 系统策划设计
  const systemDesignerOutput = await callAgent(
    agents["system-designer"],
    "请基于玩法支柱设计系统架构",
    producerOutput
  );

  // 阶段 3: 主策划整合
  const leadDesignerOutput = await callAgent(
    agents["lead-designer"],
    "请 Review 并整合所有设计，输出完整策划案",
    `## 制作人产出\n${producerOutput}\n\n## 系统策划产出\n${systemDesignerOutput}`
  );

  // 保存到文件
  const timestamp = new Date().toISOString().split("T")[0];
  const fileName = `游戏策划案-${timestamp}.md`;
  const outputPath = path.join(process.cwd(), "output", fileName);

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, leadDesignerOutput, "utf-8");

  console.log(`\n📄 策划案已保存到: ${outputPath}`);

  return leadDesignerOutput;
}

// 如果直接运行此文件
if (process.argv[1]?.endsWith("index.ts") || process.argv[1]?.endsWith("index.js")) {
  const gameIdea = process.argv[2] || "一款结合 Roguelike 和塔防的手游";
  generateGameDesign(gameIdea).catch(console.error);
}
