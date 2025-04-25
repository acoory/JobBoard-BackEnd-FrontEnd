-- Insertion d'utilisateurs exemples (candidats)
INSERT INTO people (name, firstname, email, password, adress, postalcode, city, tel, cv, profilPicture, role)
VALUES
    (
        'Martin', 
        'Sophie', 
        'sophie.martin@email.com', 
        '$2b$10$7fVhjuXu.KZNcWm/pM5n5.KhzEwEceU1qZCQqVGx7r71EiRzOsIuq', 
        '15 rue des Lilas', 
        '75011', 
        'Paris', 
        '0612345678', 
        'https://example.com/cv/sophiemartin.pdf', 
        'https://example.com/profile/sophiemartin.jpg', 
        'ROLE_USER'
    ),
    (
        'Dubois', 
        'Thomas', 
        'thomas.dubois@email.com', 
        '$2b$10$7fVhjuXu.KZNcWm/pM5n5.KhzEwEceU1qZCQqVGx7r71EiRzOsIuq', 
        '8 avenue Victor Hugo', 
        '69003', 
        'Lyon', 
        '0687654321', 
        'https://example.com/cv/thomasdubois.pdf', 
        'https://example.com/profile/thomasdubois.jpg', 
        'ROLE_USER'
    ),
    (
        'Leroy', 
        'Emma', 
        'emma.leroy@email.com', 
        '$2b$10$7fVhjuXu.KZNcWm/pM5n5.KhzEwEceU1qZCQqVGx7r71EiRzOsIuq', 
        '22 boulevard de la Mer', 
        '44000', 
        'Nantes', 
        '0698765432', 
        'https://example.com/cv/emmaleroy.pdf', 
        'https://example.com/profile/emmaleroy.jpg', 
        'ROLE_USER'
    ),
    (
        'Petit', 
        'Lucas', 
        'lucas.petit@email.com', 
        '$2b$10$7fVhjuXu.KZNcWm/pM5n5.KhzEwEceU1qZCQqVGx7r71EiRzOsIuq', 
        '5 rue du Commerce', 
        '33000', 
        'Bordeaux', 
        '0623456789', 
        'https://example.com/cv/lucaspetit.pdf', 
        'https://example.com/profile/lucaspetit.jpg', 
        'ROLE_USER'
    ),
    (
        'Garcia', 
        'Léa', 
        'lea.garcia@email.com', 
        '$2b$10$7fVhjuXu.KZNcWm/pM5n5.KhzEwEceU1qZCQqVGx7r71EiRzOsIuq', 
        '17 rue des Oliviers', 
        '13006', 
        'Marseille', 
        '0678901234', 
        'https://example.com/cv/leagarcia.pdf', 
        'https://example.com/profile/leagarcia.jpg', 
        'ROLE_USER'
    );

-- Insertion de candidatures exemples
INSERT INTO jobapplication (people_id, advertisement_id, motivation, status)
VALUES
    (
        1, 
        1, 
        'Passionnée de développement web et forte de 4 ans d''expérience, je souhaite mettre mes compétences au service de votre entreprise innovante. Mes projets précédents sur React et Node.js correspondent parfaitement au profil recherché.', 
        'En attente'
    ),
    (
        2, 
        5, 
        'Avec mon expérience dans la gestion de chantiers résidentiels et commerciaux, je suis particulièrement intéressé par ce poste qui correspond à mes compétences et à mes aspirations professionnelles.', 
        'Entretien programmé'
    ),
    (
        3, 
        3, 
        'Diplômée en management environnemental et passionnée par les enjeux de développement durable, je souhaite contribuer à votre stratégie RSE innovante qui correspond parfaitement à mes valeurs et mon parcours.', 
        'En attente'
    ),
    (
        4, 
        6, 
        'Titulaire d''un Master en Data Science et avec 3 ans d''expérience dans l''analyse de données, je suis vivement intéressé par cette opportunité qui me permettrait d''appliquer mes connaissances en IA à des problématiques business concrètes.', 
        'Acceptée'
    ),
    (
        5, 
        2, 
        'Ingénieure DevOps avec une solide expérience AWS et en automatisation, je suis particulièrement intéressée par cette opportunité qui me permettrait de contribuer à la scalabilité de vos infrastructures.', 
        'Refusée'
    ),
    (
        1, 
        8, 
        'Ayant récemment développé des applications mobiles avec Flutter, je suis très intéressé par ce poste qui me permettrait d''approfondir mes compétences dans un contexte professionnel stimulant.', 
        'En attente'
    );

-- Insertion de favoris exemples
INSERT INTO favoris (people_id, advertisement_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 5),
    (3, 3),
    (3, 7),
    (4, 6),
    (5, 2),
    (5, 8);

-- Mot de passe pour tous les utilisateurs: "MotDePasse123" (hashé avec bcrypt) 