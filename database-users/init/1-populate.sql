USE cherrypick_db;

-- Usuario de prueba ya registrado
INSERT INTO
    users (name, email, date_of_birth)
VALUES (
        'Pedro Pérez',
        'p@gmail.com',
        '1990-01-01'
    );

INSERT INTO
    brands (name, email, url, logo_url)
VALUES (
        'Zara',
        'cherrypick.brand.example@gmail.com',
        'https://www.tiendanapoli.com/',
        'https://acdn-us.mitiendanube.com/stores/001/126/411/themes/common/logo-370616887-1714614837-ea0cb70511e0a8ae27a0b2d64e56ecad1714614838.png?0'
    );