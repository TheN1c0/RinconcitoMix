import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding administrators...");

  const admins = [
    { email: "nicojjj4@gmail.com", name: "Nicolás" },
    { email: "dayan13102000@gmail.com", name: "Dayan" }
  ];

  const defaultPassword = "Rincon2026!";
  const hashedPassword = hashPassword(defaultPassword);

  for (const admin of admins) {
    await prisma.user.upsert({
      where: { email: admin.email },
      update: {
        role: "ADMIN",
        password: hashedPassword,
        name: admin.name
      },
      create: {
        email: admin.email,
        name: admin.name,
        role: "ADMIN",
        password: hashedPassword
      }
    });
    console.log(`Admin ${admin.name} (${admin.email}) upserted successfully.`);
  }

  console.log("Admin seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
