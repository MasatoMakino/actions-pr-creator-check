import {
  addPackageFiles,
  checkout,
  push,
  pullRequest,
} from "./postVersion/index.mjs";
import { checkTagExists, pushTags } from "./release/index.mjs";

export async function postversion() {
  try {
    await checkTagExists();

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
