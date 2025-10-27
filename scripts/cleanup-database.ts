import { PrismaClient } from "../server/generated/prisma";
import { getCollection } from "../server/catalog/functions";

const prisma = new PrismaClient();

/**
 * Script para limpiar completamente la base de datos:
 * Elimina TODAS las filas de TODAS las tablas
 * 1. Elimina todas las tablas de datos (inspo, favorites, likes, etc.)
 * 2. Elimina todos los items
 * 3. Elimina todas las marcas
 * 4. Elimina todos los clientes
 * 5. Elimina todos los archivos
 * 6. Elimina todos los usuarios
 * 7. Elimina todas las tablas de autenticación
 * 8. Limpia Weaviate
 */
async function cleanupDatabase() {
  console.log("🧹 Iniciando limpieza COMPLETA de la base de datos...");
  console.log("⚠️  ESTO ELIMINARÁ TODOS LOS DATOS PERMANENTEMENTE");

  try {
    // Paso 1: Eliminar tablas de datos relacionados con inpo
    console.log("📦 Eliminando todos los inspo...");
    const deletedInspos = await prisma.inspoItems.deleteMany();
    console.log(`✅ Eliminados ${deletedInspos.count} inspo`);

    // Paso 2: Eliminar todos los items
    console.log("📦 Eliminando todos los items...");
    const deletedItems = await prisma.item.deleteMany();
    console.log(`✅ Eliminados ${deletedItems.count} items`);

    // Paso 3: Eliminar marcas
    console.log("🏪 Eliminando marcas...");
    const deletedBrands = await prisma.brand.deleteMany();
    console.log(`✅ Eliminados ${deletedBrands.count} marcas`);

    // Paso 4: Eliminar clientes
    console.log("👤 Eliminando clientes...");
    const deletedClients = await prisma.client.deleteMany();
    console.log(`✅ Eliminados ${deletedClients.count} clientes`);

    // Paso 5: Eliminar archivos
    console.log("📁 Eliminando todos los archivos...");
    const deletedFiles = await prisma.files.deleteMany();
    console.log(`✅ Eliminados ${deletedFiles.count} archivos`);

    // Paso 6: Eliminar registros de progreso
    console.log("🔄 Eliminando registros de progreso...");
    const deletedRegisterProgress =
      await prisma.registerInProgress.deleteMany();
    console.log(
      `✅ Eliminados ${deletedRegisterProgress.count} registros de progreso`
    );

    const deletedResetProgress =
      await prisma.resetPasswordInProgress.deleteMany();
    console.log(
      `✅ Eliminados ${deletedResetProgress.count} registros de reset`
    );

    // Paso 7: Eliminar cuentas y sesiones
    console.log("🔐 Eliminando cuentas...");
    const deletedAccounts = await prisma.account.deleteMany();
    console.log(`✅ Eliminados ${deletedAccounts.count} cuentas`);

    console.log("📱 Eliminando sesiones...");
    const deletedSessions = await prisma.session.deleteMany();
    console.log(`✅ Eliminados ${deletedSessions.count} sesiones`);

    // Paso 8: Eliminar verificaciones
    console.log("✅ Eliminando verificaciones...");
    const deletedVerifications = await prisma.verification.deleteMany();
    console.log(`✅ Eliminados ${deletedVerifications.count} verificaciones`);

    // Paso 9: Eliminar usuarios (debe ser el último por las foreign keys)
    console.log("👥 Eliminando usuarios...");
    const deletedUsers = await prisma.user.deleteMany();
    console.log(`✅ Eliminados ${deletedUsers.count} usuarios`);

    // Paso 10: Limpiar Weaviate
    console.log("🔍 Limpiando Weaviate...");
    await clearAllWeaviateData();

    console.log("🎉 ¡LIMPIEZA COMPLETA TERMINADA!");
    console.log("🗂️ La base de datos está completamente vacía");
  } catch (error) {
    console.error("❌ Error durante la limpieza:", error);
    throw error;
  }
}

/**
 * Limpia todos los datos de Weaviate
 */
async function clearAllWeaviateData() {
  try {
    const collectionRes = await getCollection();

    if (collectionRes.error) {
      console.error(
        "❌ Error obteniendo la colección de Weaviate:",
        collectionRes.details
      );
      return;
    }

    const collection = collectionRes.collection;

    // Obtener todos los objetos de Weaviate
    const result = await collection.query.fetchObjects({
      limit: 1000, // Aumentamos el límite para obtener más objetos por batch
    });

    const objects = result.objects;
    console.log(`🔍 Encontrados ${objects.length} objetos en Weaviate`);

    // Eliminar todos los objetos
    let deletedCount = 0;
    for (const obj of objects) {
      if (obj.uuid) {
        try {
          await collection.data.deleteById(obj.uuid);
          deletedCount++;
          console.log(`🗑️ Eliminado objeto ${obj.uuid} de Weaviate`);
        } catch (err) {
          console.error(`❌ Error eliminando objeto ${obj.uuid}:`, err);
        }
      }
    }

    console.log(`✅ Eliminados ${deletedCount} objetos de Weaviate`);

    // Si hay más objetos (paginación), continuar eliminando
    if (objects.length === 1000) {
      console.log("🔄 Hay más objetos, continuando con la eliminación...");
      await clearAllWeaviateData(); // Recursión para manejar paginación
    }
  } catch (error) {
    console.error("❌ Error limpiando Weaviate:", error);
    throw error;
  }
}

// Ejecutar el proceso
async function main() {
  console.log("Starting database cleanup...");
  await cleanupDatabase();
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
