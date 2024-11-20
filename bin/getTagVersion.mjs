import { execa } from "execa";

/**
 * get current version with git describe
 * @returns {string} The tag version
 */
export async function getTagVersion() {
  const result = await execa("git", ["describe", "--tags", "--abbrev=0"]);
  return result.stdout;
}

/**
 * create a branch name based on current tag
 * @returns {Promise<string>} The branch name to be created
 */
export async function getTagBranchName() {
  const result = await getTagVersion();
  return `version/${result.stdout}`;
}