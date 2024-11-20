import { execa } from "execa";
import { getTagVersion } from "../getTagVersion.mjs";

const tag = await getTagVersion();
await execa("gh", [
  "release",
  "create",
  tag,
  "--generate-notes",
  "--verify-tag",
  "--draft",
]);
