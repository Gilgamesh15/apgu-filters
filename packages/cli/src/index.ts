#!/usr/bin/env node
import { Command } from "commander";
import { init } from "./commands/init";
import { add } from "./commands/add";

const program = new Command();

program
  .name("apgu-filters")
  .description("CLI tool to add apgu-filters components to your project")
  .version("1.0.0");

program
  .command("init")
  .description("Initialize apgu-filters in your project")
  .action(init);

program
  .command("add [component]")
  .description("Add a filter component to your project")
  .option("-p, --path <path>", "Custom path to add the component", "./src/components/filters")
  .action(add);

program.parse();
