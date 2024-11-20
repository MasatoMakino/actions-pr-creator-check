import {
  checkMerged,
  checkTagExists,
  pushTags,
  createDraft,
  openDraft,
} from "./release/index.mjs";

export async function release() {
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
