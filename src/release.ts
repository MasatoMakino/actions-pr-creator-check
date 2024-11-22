import { CommandOptions } from "CommandOptions.js";
import {
  checkMerged,
  checkTagExists,
  pushTags,
  createDraft,
  openDraft,
} from "./release/index.js";

export async function release(option: CommandOptions): Promise<void> {
  try {
    if (option.dryRun) {
      console.log("Dry run enabled");
      return;
    }
    await checkMerged();
    await checkTagExists();
    await pushTags();
    await createDraft();
    await openDraft();
  } catch (e) {
    throw e;
  }
}
