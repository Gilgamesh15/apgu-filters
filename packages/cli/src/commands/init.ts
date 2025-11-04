import prompts from "prompts";
import chalk from "chalk";
import ora from "ora";
import { execa } from "execa";
import fs from "fs-extra";
import path from "path";

export async function init() {
  console.log(chalk.bold("\nWelcome to apgu-filters! 🎉\n"));

  // Check if package.json exists
  const packageJsonPath = path.join(process.cwd(), "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    console.error(chalk.red("❌ No package.json found. Please run this command in a project directory."));
    process.exit(1);
  }

  // Ask user questions
  const response = await prompts([
    {
      type: "confirm",
      name: "installDeps",
      message: "Would you like to install apgu-filters?",
      initial: true
    },
    {
      type: (prev) => prev ? "select" : null,
      name: "packageManager",
      message: "Which package manager do you use?",
      choices: [
        { title: "npm", value: "npm" },
        { title: "yarn", value: "yarn" },
        { title: "pnpm", value: "pnpm" },
        { title: "bun", value: "bun" }
      ],
      initial: 0
    }
  ]);

  if (!response.installDeps) {
    console.log(chalk.yellow("\n⚠️  Please install apgu-filters manually:"));
    console.log(chalk.cyan("  npm install apgu-filters\n"));
    return;
  }

  // Install dependencies
  const spinner = ora("Installing apgu-filters...").start();

  try {
    const installCmd = getInstallCommand(response.packageManager);
    await execa(installCmd.command, installCmd.args, {
      cwd: process.cwd(),
      stdio: "inherit"
    });

    spinner.succeed("apgu-filters installed successfully!");
  } catch (error) {
    spinner.fail("Failed to install apgu-filters");
    console.error(chalk.red(error));
    process.exit(1);
  }

  console.log(chalk.green("\n✨ Setup complete!"));
  console.log(chalk.cyan("\nNext steps:"));
  console.log(chalk.cyan("  1. Make sure you have shadcn/ui installed in your project"));
  console.log(chalk.cyan("  2. Run: npx apgu-filters add basic"));
  console.log(chalk.cyan("  3. Check out the documentation for usage examples\n"));
}

function getInstallCommand(packageManager: string) {
  switch (packageManager) {
    case "yarn":
      return { command: "yarn", args: ["add", "apgu-filters"] };
    case "pnpm":
      return { command: "pnpm", args: ["add", "apgu-filters"] };
    case "bun":
      return { command: "bun", args: ["add", "apgu-filters"] };
    default:
      return { command: "npm", args: ["install", "apgu-filters"] };
  }
}
