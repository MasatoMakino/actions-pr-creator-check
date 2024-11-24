import { CommonCommandOptions } from "CommandOptions.js";
import {
  checkMerged,
  checkTagExists,
  pushTags,
  createDraft,
  openDraft,
} from "./release/index.js";

export async function release(options: CommonCommandOptions): Promise<void> {
  try {
    if (options.dryRun) {
      console.log("Dry run enabled");
      return;
    }
    await checkMerged(options.defaultBranch);
    await checkTagExists();
    await pushTags();
    await createDraft();
    await openDraft();
  } catch (e) {
    throw e;
  }
}
