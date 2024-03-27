import { execSync } from "child_process";

const name = process.argv[2]; // Get the name argument

if (!name) {
  console.error("Please provide a name for the function");
  process.exit(1);
}


// Your migration command
const command: string = `bun supabase functions deploy ${name}`;

// Execute the command
execSync(command, { stdio: "inherit" });
console.log(`Function deployed: ${name}`);
