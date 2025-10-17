import { PrismaClient } from "../server/generated/prisma";

const prisma = new PrismaClient();

/**
 * Script para crear los items de inspiración:
 * - Items de primavera (spring)
 */
async function seedInspiration() {
  console.log("✨ Iniciando creación de items de inspiración...");

  try {
    // Create inspiration items
    const inspoItems = [
      {
        itemUuid: "7ba7b827-9dad-11d1-80b4-00c04fd430c8",
        category: "spring",
        index: 0,
      },
      {
        itemUuid: "6ba7b833-9dad-11d1-80b4-00c04fd430c8",
        category: "spring",
        index: 1,
      },
      {
        itemUuid: "6ba7b834-9dad-11d1-80b4-00c04fd430c8",
        category: "spring",
        index: 2,
      },
      {
        itemUuid: "7ba7b828-9dad-11d1-80b4-00c04fd430c8",
        category: "spring",
        index: 3,
      },
    ];

    let createdCount = 0;
    for (const inspoItem of inspoItems) {
      // Check if item already exists by itemUuid
      const existingItem = await prisma.inspoItems.findFirst({
        where: { itemUuid: inspoItem.itemUuid },
      });

      if (!existingItem) {
        await prisma.inspoItems.create({
          data: inspoItem,
        });
        createdCount++;
        console.log(`✅ Item de inspiración creado: ${inspoItem.itemUuid}`);
      } else {
        console.log(`⏭️ Item ya existe: ${inspoItem.itemUuid}`);
      }
    }

    console.log(
      `✅ Items de inspiración creados: ${createdCount}/${inspoItems.length}`
    );
    console.log("🎉 Seed de inspiración completado exitosamente!");
  } catch (error) {
    console.error("❌ Error durante el seed de inspiración:", error);
    throw error;
  }
}

// Ejecutar el proceso
async function main() {
  console.log("Starting inspiration seed...");
  await seedInspiration();
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
