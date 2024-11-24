import { Command } from "commander";
import { postversion } from "./postversion.js";
import { preversion } from "./preversion.js";
import { release } from "./release.js";

const program = new Command();

program
  .option("--preversion", "preversion hook")
  .option("--postversion", "postversion hook")
  .option("--release", "release hook")
  .option("--dry-run", "skip commit and tag", false)
  .option("--default-branch <defaultBranch>", "default branch name", "main")
  .option("--test-command <testCommand>", "test command", "npm test");

program.parse();

const options = program.opts();

if (options.preversion + options.postversion + options.release > 1) {
  throw new Error(
    "Only one of --preversion, --postversion, --release can be used",
  );
}

if (options.preversion + options.postversion + options.release === 0) {
  throw new Error("One of --preversion, --postversion, --release must be used");
}

const runCommand = async () => {
  const commandOption = {
    defaultBranch: options.defaultBranch,
    dryRun: options.dryRun,
    testCommand: options.testCommand,
  };
  switch (true) {
    case options.preversion:
      await preversion(commandOption);
      break;

    case options.postversion:
      await postversion(commandOption);
      break;

    case options.release:
      await release(commandOption);
      break;
  }
};

runCommand();
