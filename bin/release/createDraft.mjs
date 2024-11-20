import { execa } from "execa";
import { getTagVersion } from "../getTagVersion.mjs";

/**
 * Create a draft release
 */
export async function createDraft() {
  const tag = await getTagVersion();
  await execa("gh", [
    "release",
    "create",
    tag,
    "--generate-notes",
    "--verify-tag",
    "--draft",
  ]);
}