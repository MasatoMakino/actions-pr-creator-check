import {
  addPackageFiles,
  checkout,
  push,
  pullRequest,
} from "./postVersion/index.mjs";

export async function postversion() {
  try {
    await addPackageFiles();
    await checkout();
    await push();
    await pullRequest();
  } catch (e) {
    throw e;
  }
}

postversion();
