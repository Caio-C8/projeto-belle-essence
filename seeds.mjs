import { spawn } from "child_process";
import { join, dirname } from "path";
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
      if (code !== 0) {
        log.error(`${label} terminou com erro (código ${code})`);
        reject(new Error(`${label} exited with code ${code}`));
      } else {
        log.success(`${label} finalizado com sucesso`);
        resolve();
      }
    });
  });
};

const backendPath = join(__dirname, "backend");

log.section("Executando seeds do backend...");
await run("npm", ["run", "seed:all"], backendPath, "seed");

log.success("🌱 Seeds finalizados com sucesso!");
