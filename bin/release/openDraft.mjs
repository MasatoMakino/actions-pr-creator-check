import { execa } from "execa";
import { getTagVersion } from "../getTagVersion.mjs";

/**
 * Open the draft release in the browser
 */
export async function openDraft() {
  const tag = await getTagVersion();
  await execa("gh", ["release", "view", tag, "--web"]);
}