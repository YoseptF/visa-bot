import { execSync } from "child_process";

const name = process.argv[2]; // Get the name argument
const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, ""); // Create a timestamp

if (!name) {
  console.error("Please provide a name for the migration");
  process.exit(1);
}

// Construct the filename
const filename: string = `${timestamp}_${name}.sql`;

// Your migration command
const command: string = `bun --silent prisma migrate diff --from-schema-datasource ./supabase/schema.prisma --to-schema-datamodel ./supabase/schema.prisma --script > ./supabase/migrations/${filename}`;

// Execute the command
execSync(command, { stdio: "inherit" });
console.log(`Migration created: ${filename}`);
