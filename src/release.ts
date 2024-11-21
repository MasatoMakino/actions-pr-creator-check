import {
  checkMerged,
  checkTagExists,
  pushTags,
  createDraft,
  openDraft,
} from "./release/index.js";

export async function release(): Promise<void> {
  try {
    await checkMerged();
    await checkTagExists();
    await pushTags();
    await createDraft();
    await openDraft();
  } catch (e) {
    throw e;
  }
}

release();
