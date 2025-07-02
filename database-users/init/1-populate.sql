SET NAMES utf8mb4;

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
    brands (email, name, description, url, logo_url)
VALUES (
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

    INSERT INTO
    brands (email, name, description, url, logo_url)
VALUES (
        'charostoreok@gmail.com',
        'charo',
        'Info vía WhatsApp 📲 1161428031
Stores:
España 3012 Florencio varela
Calle 13 4777 Berazategui
Brown 509 Quilmes
Av 844 2509 Solano',
        'www.charostoreok.com',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvjwlliXGANYoquuhEsRukCFXHeXqJ7TKCGQ&s'
    );


