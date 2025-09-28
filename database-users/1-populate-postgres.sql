-- PostgreSQL populate script for CherryPick
-- This script inserts initial data for testing

-- Insert users first
INSERT INTO "user" (id, name, email, "emailVerified", "userType")
VALUES 
    ('ca8cce7e-792a-11f0-b577-0242ac120002', 'Tienda Napoli', 'cherrypick.brand.example@gmail.com', true, 'brand'),
    ('ca8ce0ae-792a-11f0-b577-0242ac120002', 'Charo Store', 'charostoreok@gmail.com', true, 'brand');


-- Insert brand data
INSERT INTO "Brand" ("userId", name, description, url, "logoUrl")
VALUES (
    'ca8cce7e-792a-11f0-b577-0242ac120002',
    'tienda napoli',
    '10% off abonando con transferencia
3 cuotas sin interés con tarj bancarias
Envíos a todo el país
Malabia 1574 , Palermo Soho
Lun a sab: 11 a 19 hs',
    'https://www.tiendanapoli.com/',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj1uqWFGzt3iIfOyeOcputEeV7OeOgAjFiBkVOtD43PHCqGXdl0ABRrSSVumRY44FbXWw&usqp=CAU'
);

INSERT INTO "Brand" ("userId", name, description, url, "logoUrl")
VALUES (
    'ca8ce0ae-792a-11f0-b577-0242ac120002',
    'charo',
    'Info vía WhatsApp 📲 1161428031
Stores:
España 3012 Florencio varela
Calle 13 4777 Berazategui
Brown 509 Quilmes
Av 844 2509 Solano',
    'https://www.charostoreok.com/',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvjwlliXGANYoquuhEsRukCFXHeXqJ7TKCGQ&s'
);


-- Insert inspiration items
INSERT INTO "InspoItems" ("itemUuid", "category", "index")
VALUES  ('46d53a96-e697-4ac9-92f9-f90313cd8931', 'spring', 0),   
        ('958a6478-f6a7-4da9-a255-97d852a3e6de', 'spring', 1),
        ('b4166c0e-21ea-4864-bc2b-55faf6bae889', 'spring', 2),
        ('15580818-3f2f-46ec-b910-8e8a7735874a', 'spring', 3);