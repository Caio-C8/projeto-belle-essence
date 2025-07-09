import { spawn } from "child_process";
import { join, dirname } from "path";
import { cwd } from "process";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __dirname = dirname(fileURLToPath(import.meta.url));

const log = {
  info: (msg) => console.log(chalk.blue("[INFO]"), msg),
  success: (msg) => console.log(chalk.green("[✔]"), msg),
  error: (msg) => console.log(chalk.red("[✖]"), msg),
  section: (msg) => console.log(chalk.bold.yellow(`\n==> ${msg}`)),
};

const run = (command, args, path, label = "") => {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      cwd: path,
      shell: true,
    });

    proc.stdout.on("data", (data) => {
      process.stdout.write(chalk.gray(`[${label}] `) + data.toString());
    });

    proc.stderr.on("data", (data) => {
      process.stderr.write(chalk.red(`[${label} ERROR] `) + data.toString());
    });

    proc.on("close", (code) => {
      if (code !== 0) reject(new Error(`${label} exited with code ${code}`));
      else resolve();
    });
  });
};

const runInBackground = (command, args, path, label = "") => {
  const proc = spawn(command, args, {
    cwd: path,
    shell: true,
  });

  proc.stdout.on("data", (data) => {
    process.stdout.write(chalk.green(`[${label}] `) + data.toString());
  });

  proc.stderr.on("data", (data) => {
    process.stderr.write(chalk.red(`[${label} ERROR] `) + data.toString());
  });
};

const frontendPath = join(__dirname, "frontend");
const backendPath = join(__dirname, "backend");

log.section("Instalando dependências...");
await Promise.all([
  run("npm", ["install"], frontendPath, "frontend"),
  run("npm", ["install"], backendPath, "backend"),
]);

log.section("Iniciando servidores...");
runInBackground("npm", ["run", "dev"], frontendPath, "frontend");
runInBackground("npm", ["run", "dev"], backendPath, "backend");
