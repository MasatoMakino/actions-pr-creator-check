import { CommonCommandOptions } from "CommandOptions.js";
import {
  addPackageFiles,
  checkout,
  push,
  pullRequest,
} from "./postVersion/index.js";

export async function postversion(
  options: CommonCommandOptions,
): Promise<void> {
  try {
    if (options.dryRun) {
      console.log("Dry run enabled");
      return;
    } else {
      await addPackageFiles();
      await checkout();
      await push();
      await pullRequest(options.defaultBranch);
    }
  } catch (e) {
    throw e;
  }
}
