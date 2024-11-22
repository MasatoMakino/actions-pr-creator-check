import { CommandOptions } from "CommandOptions.js";
import { execa } from "execa";

export async function preversion(options: CommandOptions): Promise<void> {
  await execa("git", ["checkout", "main"]);
  await execa("git", ["pull", "origin", "main"]);
  await execa("npm", ["ci"]);

  if (options.dryRun) {
    console.log("Dry run enabled. Skipping tests");
    return;
  } else {
    const resultTest = await execa("npm", ["test"]);
    console.log(resultTest.stdout);
  }
}
