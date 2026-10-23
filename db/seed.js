import db from "#db/client";
import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  for (let i = 1; i <= 12; i++) {
    const employee = {
      name: "Employee " + i,
      birthday: "1990-01-01",
      salary: Math.floor(Math.random() * 100000) + 30000,
    };
    await createEmployee(employee);
  }
}
