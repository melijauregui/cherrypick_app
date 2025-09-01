-- PostgreSQL populate script for CherryPick
-- This script inserts initial data for testing

-- Usuario de prueba ya registrado
INSERT INTO "Client" (name, email, "dateOfBirth", preferences)
VALUES (
    'Pedro Pérez',
    'p@gmail.com',
    '1990-01-01'::timestamp,
    '["minimalist", "sporty"]'::jsonb
);

INSERT INTO "Brand" (id, email, name, description, url, "logoUrl")
VALUES (
    'ca8cce7e-792a-11f0-b577-0242ac120002'::uuid,
    'cherrypick.brand.example@gmail.com',
    'tienda napoli',
    '10% off abonando con transferencia
3 cuotas sin interés con tarj bancarias
Envíos a todo el país
Malabia 1574 , Palermo Soho
Lun a sab: 11 a 19 hs',
    'https://www.tiendanapoli.com/',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj1uqWFGzt3iIfOyeOcputEeV7OeOgAjFiBkVOtD43PHCqGXdl0ABRrSSVumRY44FbXWw&usqp=CAU'
);

INSERT INTO "Brand" (id, email, name, description, url, "logoUrl")
VALUES (
    'ca8ce0ae-792a-11f0-b577-0242ac120002'::uuid,
    'charostoreok@gmail.com',
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
