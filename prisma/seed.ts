import { PrismaClient } from "../server/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Create users first
  const user1 = await prisma.user.upsert({
    where: { id: "ca8cce7e-792a-11f0-b577-0242ac120002" },
    update: {},
    create: {
      id: "ca8cce7e-792a-11f0-b577-0242ac120002",
      name: "Tienda Napoli",
      email: "cherrypick.brand.example@gmail.com",
      emailVerified: true,
      userType: "brand",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { id: "ca8ce0ae-792a-11f0-b577-0242ac120002" },
    update: {},
    create: {
      id: "ca8ce0ae-792a-11f0-b577-0242ac120002",
      name: "Charo Store",
      email: "charostoreok@gmail.com",
      emailVerified: true,
      userType: "brand",
    },
  });

  console.log("✅ Users created:", { user1: user1.name, user2: user2.name });

  // Create Files records for logos
  const logo1 = await prisma.files.upsert({
    where: { id: "ca8cce7e-792a-11f0-b577-0242ac120002" },
    update: {},
    create: {
      id: "ca8cce7e-792a-11f0-b577-0242ac120002",
      name: "tienda-napoli-logo",
      contentType: "image/jpeg",
      bucket: "brand-logos",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj1uqWFGzt3iIfOyeOcputEeV7OeOgAjFiBkVOtD43PHCqGXdl0ABRrSSVumRY44FbXWw&usqp=CAU",
      uploadUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj1uqWFGzt3iIfOyeOcputEeV7OeOgAjFiBkVOtD43PHCqGXdl0ABRrSSVumRY44FbXWw&usqp=CAU",
      metadata: { source: "external", type: "logo" },
    },
  });

  const logo2 = await prisma.files.upsert({
    where: { id: "ca8ce0ae-792a-11f0-b577-0242ac120002" },
    update: {},
    create: {
      id: "ca8ce0ae-792a-11f0-b577-0242ac120002",
      name: "charo-store-logo",
      contentType: "image/jpeg",
      bucket: "brand-logos",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvjwlliXGANYoquuhEsRukCFXHeXqJ7TKCGQ&s",
      uploadUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvjwlliXGANYoquuhEsRukCFXHeXqJ7TKCGQ&s",
      metadata: { source: "external", type: "logo" },
    },
  });

  // Create brands
  const brand1 = await prisma.brand.upsert({
    where: { userId: "ca8cce7e-792a-11f0-b577-0242ac120002" },
    update: {},
    create: {
      userId: "ca8cce7e-792a-11f0-b577-0242ac120002",
      name: "tienda napoli",
      description: `10% off abonando con transferencia
3 cuotas sin interés con tarj bancarias
Envíos a todo el país
Malabia 1574 , Palermo Soho
Lun a sab: 11 a 19 hs`,
      url: "https://www.tiendanapoli.com/",
      logoId: "ca8cce7e-792a-11f0-b577-0242ac120002",
    },
  });

  const brand2 = await prisma.brand.upsert({
    where: { userId: "ca8ce0ae-792a-11f0-b577-0242ac120002" },
    update: {},
    create: {
      userId: "ca8ce0ae-792a-11f0-b577-0242ac120002",
      name: "charo",
      description: `Info vía WhatsApp 📲 1161428031
Stores:
España 3012 Florencio varela
Calle 13 4777 Berazategui
Brown 509 Quilmes
Av 844 2509 Solano`,
      url: "https://www.charostoreok.com/",
      logoId: "ca8ce0ae-792a-11f0-b577-0242ac120002",
    },
  });

  console.log("✅ Brands created:", {
    brand1: brand1.name,
    brand2: brand2.name,
  });

  // Create inspiration items
  const inspoItems = [
    {
      itemUuid: "46d53a96-e697-4ac9-92f9-f90313cd8931",
      category: "spring",
      index: 0,
    },
    {
      itemUuid: "958a6478-f6a7-4da9-a255-97d852a3e6de",
      category: "spring",
      index: 1,
    },
    {
      itemUuid: "b4166c0e-21ea-4864-bc2b-55faf6bae889",
      category: "spring",
      index: 2,
    },
    {
      itemUuid: "15580818-3f2f-46ec-b910-8e8a7735874a",
      category: "spring",
      index: 3,
    },
  ];

  for (const inspoItem of inspoItems) {
    // Check if item already exists by itemUuid
    const existingItem = await prisma.inspoItems.findFirst({
      where: { itemUuid: inspoItem.itemUuid },
    });

    if (!existingItem) {
      await prisma.inspoItems.create({
        data: inspoItem,
      });
    }
  }

  console.log("✅ Inspiration items created:", inspoItems.length);

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch(e => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
