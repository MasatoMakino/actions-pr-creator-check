import { execa } from "execa";
import { getTagBranchName } from "../getTagVersion.mjs";

/**
 * Push the tags to origin
 */
export async function pushTags() {
  const branchName = await getTagBranchName();
  await execa("git", ["push", "--tags", "origin", branchName]);
}