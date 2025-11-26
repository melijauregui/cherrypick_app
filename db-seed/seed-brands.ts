import { PrismaClient } from "../server/generated/prisma";

const prisma = new PrismaClient();

/**
 * Script para crear las marcas de prueba:
 * - Tienda Napoli
 * - Charo Store
 */
async function seedBrands() {
  console.log("🏪 Iniciando creación de marcas...");

  try {
    const user1 = await prisma.user.upsert({
      where: { id: "ca8cce7e-792a-11f0-b577-0242ac120003" },
      update: {},
      create: {
        id: "ca8cce7e-792a-11f0-b577-0242ac120003",
        name: "Girls Club",
        email: "girlsclub@gmail.com",
        emailVerified: true,
        userType: "brand",
      },
    });

    const user2 = await prisma.user.upsert({
      where: { id: "ca8ce0ae-792a-11f0-b577-0242ac120004" },
      update: {},
      create: {
        id: "ca8ce0ae-792a-11f0-b577-0242ac120004",
        name: "Social Club",
        email: "socialclub@gmail.com",
        emailVerified: true,
        userType: "brand",
      },
    });

    // Create users first
    const user3 = await prisma.user.upsert({
      where: { id: "ca8cce7e-792a-11f0-b577-0242ac120002" },
      update: {},
      create: {
        id: "ca8cce7e-792a-11f0-b577-0242ac120002",
        name: "Cherry",
        email: "cherrypick.brand.example@gmail.com",
        emailVerified: true,
        userType: "brand",
      },
    });

    const user4 = await prisma.user.upsert({
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

    const user5 = await prisma.user.upsert({
      where: { id: "ca8cce7e-792a-11f0-b577-0242ac120005" },
      update: {},
      create: {
        id: "ca8cce7e-792a-11f0-b577-0242ac120005",
        name: "Rocialy",
        email: "rocaly@gmail.com",
        emailVerified: true,
        userType: "brand",
      },
    });

    console.log("✅ Usuarios creados:", {
      user1: user1.name,
      user2: user2.name,
      user3: user3.name,
      user4: user4.name,
      user5: user5.name,
    });

    const logo1 = await prisma.files.upsert({
      where: { id: "ca8cce7e-792a-11f0-b577-0242ac120003" },
      update: {},
      create: {
        id: "ca8cce7e-792a-11f0-b577-0242ac120003",
        name: "girls-club-logo",
        contentType: "image/jpeg",
        bucket: "brand-logos",
        url: "https://i.pinimg.com/736x/8e/d9/2a/8ed92ae00c1239dd4833e03574dc0995.jpg",
        uploadUrl:
          "https://i.pinimg.com/736x/8e/d9/2a/8ed92ae00c1239dd4833e03574dc0995.jpg",
        metadata: { source: "external", type: "logo" },
      },
    });

    const logo2 = await prisma.files.upsert({
      where: { id: "ca8ce0ae-792a-11f0-b577-0242ac120004" },
      update: {},
      create: {
        id: "ca8ce0ae-792a-11f0-b577-0242ac120004",
        name: "social-club-logo",
        contentType: "image/jpeg",
        bucket: "brand-logos",
        url: "https://i.pinimg.com/736x/a1/6f/f0/a16ff04a49fd681c8c6e55d4dd4be822.jpg",
        uploadUrl:
          "https://i.pinimg.com/736x/a1/6f/f0/a16ff04a49fd681c8c6e55d4dd4be822.jpg",
        metadata: { source: "external", type: "logo" },
      },
    });

    // Create Files records for logos
    const logo3 = await prisma.files.upsert({
      where: { id: "ca8cce7e-792a-11f0-b577-0242ac120002" },
      update: {},
      create: {
        id: "ca8cce7e-792a-11f0-b577-0242ac120002",
        name: "cherry-logo",
        contentType: "image/jpeg",
        bucket: "brand-logos",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYawVvetccM3qEY3ckWzktZOSdsNtEj-7bKA&s",
        uploadUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYawVvetccM3qEY3ckWzktZOSdsNtEj-7bKA&s",
        metadata: { source: "external", type: "logo" },
      },
    });

    const logo4 = await prisma.files.upsert({
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

    const logo5 = await prisma.files.upsert({
      where: { id: "ca8cce7e-792a-11f0-b577-0242ac120005" },
      update: {},
      create: {
        id: "ca8cce7e-792a-11f0-b577-0242ac120005",
        name: "rocaly-logo",
        contentType: "image/jpeg",
        bucket: "brand-logos",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVI0gDD_IFZFsNyXkxs1kPSJy3MYdgzkZJ5g&s",
        uploadUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVI0gDD_IFZFsNyXkxs1kPSJy3MYdgzkZJ5g&s",
        metadata: { source: "external", type: "logo" },
      },
    });

    console.log("✅ Logos creados:", {
      logo1: logo1.name,
      logo2: logo2.name,
      logo3: logo3.name,
      logo4: logo4.name,
      logo5: logo5.name,
    });

    const brand1 = await prisma.brand.upsert({
      where: { userId: "ca8cce7e-792a-11f0-b577-0242ac120003" },
      update: {},
      create: {
        userId: "ca8cce7e-792a-11f0-b577-0242ac120003",
        name: "girls club",
        description: `Girls Club dirigido a mujeres con estilo.
Solamente compra online.
Envíos a todo el país`,
        url: "https://girlsclub.click/",
        logoId: "ca8cce7e-792a-11f0-b577-0242ac120003",
      },
    });

    const brand2 = await prisma.brand.upsert({
      where: { userId: "ca8ce0ae-792a-11f0-b577-0242ac120004" },
      update: {},
      create: {
        userId: "ca8ce0ae-792a-11f0-b577-0242ac120004",
        name: "social club",
        description: `3 cuotas sin interés |25%OFF transf/eft
Envíos a todo el país & Pick up San Isidro📍`,
        url: "https://www.thesocialhub.co/es/",
        logoId: "ca8ce0ae-792a-11f0-b577-0242ac120004",
      },
    });

    const brand3 = await prisma.brand.upsert({
      where: { userId: "ca8cce7e-792a-11f0-b577-0242ac120002" },
      update: {},
      create: {
        userId: "ca8cce7e-792a-11f0-b577-0242ac120002",
        name: "cherry",
        description: `10% off abonando con transferencia
3 cuotas sin interés con tarj bancarias
Envíos a todo el país
Malabia 1574 , Palermo Soho
Lun a sab: 11 a 19 hs`,
        url: "https://www.shopcherry.com.ar/",
        logoId: "ca8cce7e-792a-11f0-b577-0242ac120002",
      },
    });

    const brand4 = await prisma.brand.upsert({
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

    const brand5 = await prisma.brand.upsert({
      where: { userId: "ca8cce7e-792a-11f0-b577-0242ac120005" },
      update: {},
      create: {
        userId: "ca8cce7e-792a-11f0-b577-0242ac120005",
        name: "rocaly",
        description: `📍Tucumán a todo el país
• CENTRO: gral paz 576 | piso 15-1
• YB: mercato- moreno y diego de villarroel
• GET THE NEW DROP`,
        url: "https://www.rocaly.com.ar/",
        logoId: "ca8cce7e-792a-11f0-b577-0242ac120005",
      },
    });

    console.log("✅ Marcas creadas:", {
      brand1: brand1.name,
      brand2: brand2.name,
      brand3: brand3.name,
      brand4: brand4.name,
      brand5: brand5.name,
    });

    console.log("🎉 Seed de marcas completado exitosamente!");
  } catch (error) {
    console.error("❌ Error durante el seed de marcas:", error);
    throw error;
  }
}

// Ejecutar el proceso
async function main() {
  console.log("Starting brand seed...");
  await seedBrands();
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
