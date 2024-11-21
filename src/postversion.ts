import {
  addPackageFiles,
  checkout,
  push,
  pullRequest,
} from "./postVersion/index.js";

export async function postversion(): Promise<void> {
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