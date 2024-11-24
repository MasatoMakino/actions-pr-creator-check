import { CommandOptions } from "CommandOptions.js";
import { execa } from "execa";

export async function preversion(options: CommandOptions): Promise<void> {
  await execa("git", ["fetch", "origin", options.defaultBranch]);
  await execa("git", ["checkout", options.defaultBranch]);
  await execa("git", ["pull", "origin", options.defaultBranch]);
  await execa("npm", ["ci"]);

  if (options.dryRun) {
    console.log("Dry run enabled. Skipping tests");
    return;
  } else {
    const resultTest = await execa("npm", ["test"]);
    console.log(resultTest.stdout);
  }
}
