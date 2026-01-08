#!/usr/bin/env node
/**
 * VibeGame Studio CLI
 *
 * 使用方式：
 * - Claude Code 模式：直接在 Claude Code 中使用 /generate 命令
 * - API 模式：npm run generate "你的游戏创意"
 */

import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";

const program = new Command();

program
  .name("vibegame")
  .description("AI 驱动的游戏策划案智能生成工具")
  .version("0.1.0");

program
  .command("generate [idea]")
  .description("生成游戏策划案")
  .action(async (idea?: string) => {
    if (!idea) {
      console.log(chalk.yellow("请提供游戏创意，例如："));
      console.log(chalk.gray('  npm run generate "一款结合 Roguelike 和塔防的手游"'));
      console.log();
      console.log(chalk.cyan("或者在 Claude Code 中使用："));
      console.log(chalk.gray("  /generate 一款结合 Roguelike 和塔防的手游"));
      return;
    }

    // 检查是否有 API Key
    if (!process.env.ANTHROPIC_API_KEY) {
      console.log(chalk.yellow("\n⚠️  未检测到 ANTHROPIC_API_KEY"));
      console.log();
      console.log(chalk.cyan("你有两种使用方式："));
      console.log();
      console.log(chalk.white("1. Claude Code 模式（推荐，无需 API Key）："));
      console.log(chalk.gray("   在 Claude Code 中直接运行："));
      console.log(chalk.green(`   /generate ${idea}`));
      console.log();
      console.log(chalk.white("2. API 模式（需要 API Key）："));
      console.log(chalk.gray("   设置环境变量后运行："));
      console.log(chalk.green("   set ANTHROPIC_API_KEY=your-key"));
      console.log(chalk.green(`   npm run generate "${idea}"`));
      return;
    }

    // 有 API Key，使用 API 模式
    const spinner = ora("正在生成策划案...").start();

    try {
      const { generateGameDesign } = await import("./index.js");
      await generateGameDesign(idea);
      spinner.succeed("策划案生成完成！");
    } catch (error) {
      spinner.fail("生成失败");
      console.error(error);
    }
  });

program
  .command("info")
  .description("显示项目信息")
  .action(() => {
    console.log(chalk.cyan("\n🎮 VibeGame Studio"));
    console.log(chalk.gray("AI 驱动的游戏策划案智能生成工具\n"));

    console.log(chalk.white("可用的 Agent 角色："));
    console.log(chalk.yellow("  /producer") + " - 制作人：提炼玩法支柱");
    console.log(chalk.yellow("  /system-designer") + " - 系统策划：设计系统架构");
    console.log(chalk.yellow("  /lead-designer") + " - 主策划：整合输出策划案");
    console.log(chalk.yellow("  /generate") + " - 一键生成完整策划案");
    console.log();

    console.log(chalk.white("目录结构："));
    console.log(chalk.gray("  docs/my-designs/") + " - 你的历史策划案");
    console.log(chalk.gray("  docs/references/") + " - 行业参考资料");
    console.log(chalk.gray("  output/") + " - 生成的策划案");
  });

program.parse();
