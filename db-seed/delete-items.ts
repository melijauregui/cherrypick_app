import { PrismaClient } from "../server/generated/prisma";
import { getCollection } from "../server/catalog/functions";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function deleteWeaviateItemsByUUIDs(uuids: string[]) {
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

        let deletedCount = 0;

        for (const uuid of uuids) {
            try {
                await collection.data.deleteById(uuid);
                deletedCount++;
                console.log(`🗑️ Eliminado objeto ${uuid} de Weaviate`);
            } catch (err) {
                console.error(`❌ Error eliminando objeto ${uuid}:`, err);
            }
        }

        console.log(`✅ Eliminados ${deletedCount} objetos de Weaviate`);
    } catch (error) {
        console.error("❌ Error eliminando objetos específicos en Weaviate:", error);
        throw error;
    }
}

async function deletePrismaItemsByUUIDs(uuids: string[]) {
    let deleted = 0;

    for (const uuid of uuids) {
        try {
            await prisma.item.delete({
                where: { id: uuid },
            });
            deleted++;
            console.log(`🗑️ Eliminado item ${uuid} en Prisma`);
        } catch (error) {
            console.error(`❌ Error eliminando item ${uuid} en Prisma:`, error);
        }
    }

    console.log(`✅ Eliminados ${deleted} items en Prisma`);
}

async function compareAndClean(fileAUrl: string, fileBUrl: string) {
    const fileAPath = path.join(process.cwd(), fileAUrl);
    const fileBPath = path.join(process.cwd(), fileBUrl);

    const fileA = JSON.parse(fs.readFileSync(fileAPath, "utf8"));
    const fileB = JSON.parse(fs.readFileSync(fileBPath, "utf8"));

    const seenNames = new Map<string, string>();
    const duplicates: string[] = [];

    fileA.forEach((item: any) => {
        if (seenNames.has(item.name)) {
            duplicates.push(item.uuid);
            console.log("Duplicate found in:", fileAUrl, item.name);
        } else {
            seenNames.set(item.name, item.uuid);
        }
    });

    fileB.forEach((item: any) => {
        if (seenNames.has(item.name)) {
            duplicates.push(item.uuid);
            console.log("Duplicate found in:", fileBUrl, item.name);
        } else {
            seenNames.set(item.name, item.uuid);
        }
    });

    await deleteWeaviateItemsByUUIDs(duplicates);
    await deletePrismaItemsByUUIDs(duplicates);
    console.log("✅ Limpieza completada");
}

async function main() {
    /* await compareAndClean(
        "db-seed/scrapping/rocaly/rocaly-body-tops-sample.json",
        "db-seed/scrapping/rocaly/rocaly-remeras-sample.json",
    ); */

    const badUUIDs = [
        "6e39216c-de28-480c-9e5e-d90999c07a85",
        "6ba7b830-9dad-11d1-80b4-00c04fd430c8"
    ];
    await deleteWeaviateItemsByUUIDs(badUUIDs);
    await deletePrismaItemsByUUIDs(badUUIDs);
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
