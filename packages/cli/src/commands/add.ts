import prompts from "prompts";
import chalk from "chalk";
import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const AVAILABLE_COMPONENTS = {
  basic: {
    name: "Basic Filters",
    description: "Simple filter component with basic styling",
    files: ["filters.tsx"],
    templateDir: "filters/basic"
  },
  admin: {
    name: "Admin Template",
    description: "Advanced filter components with predicates and comparators",
    files: ["base-components.tsx", "comparators.tsx", "string-predicate.tsx"],
    templateDir: "filters/admin"
  }
};

export async function add(component?: string, options?: { path?: string }) {
  console.log(chalk.bold("\nAdd apgu-filters component\n"));

  // If no component specified, prompt user
  if (!component) {
    const response = await prompts({
      type: "select",
      name: "component",
      message: "Which component would you like to add?",
      choices: Object.entries(AVAILABLE_COMPONENTS).map(([key, value]) => ({
        title: value.name,
        description: value.description,
        value: key
      }))
    });

    if (!response.component) {
      console.log(chalk.yellow("No component selected."));
      process.exit(0);
    }

    component = response.component;
  }

  const selectedComponent = AVAILABLE_COMPONENTS[component as keyof typeof AVAILABLE_COMPONENTS];

  if (!selectedComponent) {
    console.error(chalk.red(`❌ Unknown component: ${component}`));
    console.log(chalk.cyan("\nAvailable components:"));
    Object.entries(AVAILABLE_COMPONENTS).forEach(([key, value]) => {
      console.log(chalk.cyan(`  - ${key}: ${value.description}`));
    });
    process.exit(1);
  }

  // Determine target path
  let targetPath = options?.path || "./src/components/filters";

  const pathResponse = await prompts({
    type: "text",
    name: "path",
    message: "Where should we add the component?",
    initial: targetPath
  });

  if (!pathResponse.path) {
    console.log(chalk.yellow("No path specified."));
    process.exit(0);
  }

  targetPath = pathResponse.path;

  // Create target directory
  const fullTargetPath = path.join(process.cwd(), targetPath);
  await fs.ensureDir(fullTargetPath);

  // Copy files
  const spinner = ora(`Adding ${selectedComponent.name}...`).start();

  try {
    // Get the templates directory
    // When built, templates are at the root level of the package
    const templatesDir = path.join(__dirname, "../../templates", selectedComponent.templateDir);

    for (const file of selectedComponent.files) {
      const sourcePath = path.join(templatesDir, file);
      const destPath = path.join(fullTargetPath, file);

      if (fs.existsSync(destPath)) {
        spinner.warn(`File already exists: ${destPath}`);

        const overwrite = await prompts({
          type: "confirm",
          name: "value",
          message: `Overwrite ${file}?`,
          initial: false
        });

        if (!overwrite.value) {
          continue;
        }
      }

      await fs.copy(sourcePath, destPath);
    }

    spinner.succeed(`${selectedComponent.name} added successfully!`);

    console.log(chalk.green("\n✨ Component added!"));
    console.log(chalk.cyan(`\nFiles created in: ${chalk.bold(targetPath)}`));
    selectedComponent.files.forEach((file) => {
      console.log(chalk.gray(`  - ${file}`));
    });

    console.log(chalk.cyan("\nNext steps:"));
    console.log(chalk.cyan("  1. Import and use the component in your app"));
    console.log(chalk.cyan("  2. Customize the components to match your design"));
    console.log(chalk.cyan("  3. Make sure you have the required shadcn components installed\n"));

    if (component === "admin") {
      console.log(chalk.yellow("Required shadcn components:"));
      console.log(chalk.yellow("  - button"));
      console.log(chalk.yellow("  - select"));
      console.log(chalk.yellow("  - input"));
      console.log(chalk.yellow("\nInstall with: npx shadcn@latest add button select input\n"));
    } else {
      console.log(chalk.yellow("Required shadcn components:"));
      console.log(chalk.yellow("  - button"));
      console.log(chalk.yellow("  - select"));
      console.log(chalk.yellow("\nInstall with: npx shadcn@latest add button select\n"));
    }
  } catch (error) {
    spinner.fail(`Failed to add ${selectedComponent.name}`);
    console.error(chalk.red(error));
    process.exit(1);
  }
}
