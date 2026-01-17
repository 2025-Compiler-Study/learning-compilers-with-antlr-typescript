import { readFileSync } from "fs";
import { calculateWithVisitor } from "../helper";
import { Readable } from "stream";
import { text } from "stream/consumers";

const main = async () => {
  const args = process.argv.slice(2);

  if (args.length === 0 || !args[0]) {
    console.error("Usage: npm run calc3:run <file.cp>");
    process.exit(1);
  }

  const filePath = args[0];

  try {
    const code = readFileSync(filePath, "utf-8");
    const stdinData = await text(process.stdin);
    const stdin = Readable.from([stdinData]);

    calculateWithVisitor(code, stdin, process.stdout);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error("Unknown error occurred");
    }
    process.exit(1);
  }
};

main();
