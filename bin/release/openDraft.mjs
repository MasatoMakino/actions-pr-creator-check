import { execa } from "execa";
import { getTagVersion } from "../getTagVersion.mjs";

const tag = await getTagVersion();
await execa("gh", ["release", "view", tag, "--web"]);
