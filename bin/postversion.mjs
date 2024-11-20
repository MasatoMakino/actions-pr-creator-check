import {
  addPackageFiles,
  checkout,
  push,
  pullRequest,
} from "./postVersion/index.mjs";
import { pushTags } from "./release/index.mjs";

export async function postversion() {
  try {
    await addPackageFiles();
    await checkout();
    await push();
    await pushTags();
    await pullRequest();
  } catch (e) {
    throw e;
  }
}

postversion();
