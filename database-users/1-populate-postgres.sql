-- PostgreSQL populate script for CherryPick
-- This script inserts initial data for testing

-- Insert users first
INSERT INTO
    "user" (
        id,
        name,
        email,
        "emailVerified",
        "userType"
    )
VALUES (
        'ca8cce7e-792a-11f0-b577-0242ac120002',
        'Tienda Napoli',
        'cherrypick.brand.example@gmail.com',
        true,
        'brand'
    ),
    (
        'ca8ce0ae-792a-11f0-b577-0242ac120002',
        'Charo Store',
        'charostoreok@gmail.com',
        true,
        'brand'
    );

-- Insert brand data
INSERT INTO
    "Brand" (
        "userId",
        name,
        description,
        url,
        "logoUrl"
    )
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

INSERT INTO
    "Brand" (
        "userId",
        name,
        description,
        url,
        "logoUrl"
    )
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
INSERT INTO
    "InspoItems" (
        "itemUuid",
        "category",
        "index"
    )
VALUES (
        'a0ace1ee-5705-40ba-8356-40c2019c206f',
        'spring',
        0
    ),
    (
        'fe0fb761-2aec-48e3-8951-2caa9ceb7818',
        'spring',
        1
    ),
    (
        '1889c3f3-38ba-4b1b-8165-b6d320b4266f',
        'spring',
        2
    ),
    (
        'a18f70ae-b12b-4783-bb04-fc64455f2cd5',
        'spring',
        3
    );