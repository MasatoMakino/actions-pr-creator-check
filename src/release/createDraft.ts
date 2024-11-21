import { execa } from "execa";
import { getTagVersion } from "../getTagVersion.js";

/**
 * Create a draft release
 */
export async function createDraft(): Promise<void> {
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
