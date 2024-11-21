import { Command } from "commander";
import { postversion } from "./postversion.js";
import { preversion } from "./preversion.js";
import { release } from "./release.js";

const program = new Command();

program
  .option("--preversion", "preversion hook")
  .option("--postversion", "postversion hook")
  .option("--release", "release hook")
  .option("--dry-run", "skip commit and tag");

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
  switch (true) {
    case options.preversion:
      await preversion();
      break;

    case options.postversion:
      await postversion();
      break;

    case options.release:
      await release();
      break;
  }
};

runCommand();
