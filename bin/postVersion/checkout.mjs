import { execa } from "execa";
import { getTagBranchName } from "../getTagVersion.mjs";

/**
 * Checkout to a new branch with version/tag name
 */
export async function checkout() {
  const resultBranchName = await getTagBranchName();
  await execa("git", ["checkout", "-b", resultBranchName]);
}
