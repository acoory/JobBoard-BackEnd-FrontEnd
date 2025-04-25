-- Insertion d'entreprises exemples
INSERT INTO companie (name, email, password, logo, role)
VALUES
    ('TechInnovate', 'contact@techinnovate.fr', '$2b$10$7fVhjuXu.KZNcWm/pM5n5.KhzEwEceU1qZCQqVGx7r71EiRzOsIuq', 'https://example.com/logos/techinnovate.png', 'ROLE_COMPANIE'),
    ('EcoSolutions', 'recrutement@ecosolutions.fr', '$2b$10$7fVhjuXu.KZNcWm/pM5n5.KhzEwEceU1qZCQqVGx7r71EiRzOsIuq', 'https://example.com/logos/ecosolutions.png', 'ROLE_COMPANIE'),
    ('MediConsult', 'careers@mediconsult.fr', '$2b$10$7fVhjuXu.KZNcWm/pM5n5.KhzEwEceU1qZCQqVGx7r71EiRzOsIuq', 'https://example.com/logos/mediconsult.png', 'ROLE_COMPANIE'),
    ('BuildPro', 'emploi@buildpro.fr', '$2b$10$7fVhjuXu.KZNcWm/pM5n5.KhzEwEceU1qZCQqVGx7r71EiRzOsIuq', 'https://example.com/logos/buildpro.png', 'ROLE_COMPANIE'),
    ('DataSphere', 'jobs@datasphere.fr', '$2b$10$7fVhjuXu.KZNcWm/pM5n5.KhzEwEceU1qZCQqVGx7r71EiRzOsIuq', 'https://example.com/logos/datasphere.png', 'ROLE_COMPANIE');

-- Insertion d'annonces exemples
INSERT INTO advertisement (title, title_filter, companie_id, description, location, type, salarie, companie_name, created_at, avantage, phrase_accroche, nbrePost)
VALUES
    (
        'Développeur Full-Stack JavaScript',
        'dev,javascript,fullstack',
        1,
        'Nous recherchons un développeur Full-Stack JavaScript pour rejoindre notre équipe de développement web. Vous travaillerez sur des projets innovants en utilisant les technologies modernes comme React, Node.js, et MongoDB.\n\nResponsabilités:\n- Développer des applications web réactives et performantes\n- Collaborer avec les équipes produit et design\n- Participer aux revues de code et à l''amélioration continue\n- Mettre en œuvre les bonnes pratiques de développement\n\nProfil recherché:\n- 3+ ans d''expérience en développement web\n- Maîtrise de JavaScript, React et Node.js\n- Expérience avec les bases de données NoSQL et SQL\n- Connaissance des principes de CI/CD',
        'Paris',
        'CDI',
        '45000€ - 60000€ annuel',
        'TechInnovate',
        NOW(),
        'Télétravail partiel, Tickets restaurant, Mutuelle familiale prise en charge à 80%, Formation continue, Évènements d''entreprise réguliers',
        'Rejoignez une startup dynamique en pleine croissance où votre impact sera immédiat !',
        2
    ),
    (
        'Ingénieur DevOps / Cloud',
        'devops,cloud,aws',
        1,
        'Dans le cadre de notre expansion, nous recherchons un Ingénieur DevOps pour renforcer notre équipe infrastructure. Vous serez responsable de la mise en place et de la maintenance de notre infrastructure cloud.\n\nResponsabilités:\n- Construire et maintenir notre infrastructure sur AWS\n- Automatiser les déploiements et la configuration\n- Mettre en œuvre les meilleures pratiques de sécurité\n- Optimiser les performances et la stabilité\n\nProfil recherché:\n- 2+ ans d''expérience en tant que DevOps\n- Maîtrise des technologies cloud (AWS, Azure ou GCP)\n- Expérience avec Docker, Kubernetes, Terraform\n- Compétences en scripting (Python, Bash)',
        'Lyon',
        'CDI',
        '50000€ - 65000€ annuel',
        'TechInnovate',
        NOW(),
        'Télétravail à 100%, Prime annuelle, Horaires flexibles, Équipement de dernière génération',
        'Venez façonner l''infrastructure qui permettra à nos applications d''évoluer à l''échelle mondiale !',
        1
    ),
    (
        'Responsable Développement Durable',
        'environnement,RSE,developpement-durable',
        2,
        'EcoSolutions recherche un Responsable Développement Durable pour piloter sa stratégie RSE. Vous serez au cœur de notre engagement environnemental et social.\n\nResponsabilités:\n- Élaborer et mettre en œuvre la stratégie RSE\n- Définir des KPIs et suivre les progrès\n- Coordonner les initiatives environnementales\n- Sensibiliser les équipes aux enjeux du développement durable\n\nProfil recherché:\n- Formation supérieure en environnement ou développement durable\n- 5+ ans d''expérience dans des fonctions similaires\n- Connaissance approfondie des normes et réglementations\n- Capacité à fédérer autour de projets innovants',
        'Nantes',
        'CDI',
        '55000€ - 70000€ annuel',
        'EcoSolutions',
        NOW(),
        'Voiture de fonction hybride, Participation à des conférences internationales, Jours de congés supplémentaires',
        'Donnez du sens à votre carrière en contribuant à un avenir plus durable !',
        1
    ),
    (
        'Médecin Généraliste',
        'médecin,santé',
        3,
        'MediConsult recherche un médecin généraliste pour son nouveau centre médical. Vous rejoindrez une équipe pluridisciplinaire au service des patients.\n\nResponsabilités:\n- Consultations médicales généralistes\n- Suivi des patients et coordination avec spécialistes\n- Participation aux réunions d''équipe\n- Veille médicale et formation continue\n\nProfil recherché:\n- Doctorat en médecine avec spécialisation en médecine générale\n- Inscription à l''Ordre des Médecins\n- Expérience en cabinet ou centre médical\n- Excellent relationnel et écoute',
        'Bordeaux',
        'CDI',
        '75000€ - 90000€ annuel',
        'MediConsult',
        NOW(),
        'Planning adapté, Cabinet entièrement équipé, Secrétariat médical, Formation continue prise en charge',
        'Exercez votre passion pour la médecine dans un environnement innovant centré sur le patient !',
        2
    ),
    (
        'Chef de Chantier',
        'construction,btp',
        4,
        'BuildPro recrute un Chef de Chantier expérimenté pour superviser nos projets de construction résidentielle. Vous serez le garant de la qualité et du respect des délais.\n\nResponsabilités:\n- Coordonner les équipes sur le terrain\n- Assurer le suivi technique et financier\n- Veiller au respect des normes de sécurité\n- Gérer les relations avec les clients et fournisseurs\n\nProfil recherché:\n- Formation en génie civil ou bâtiment\n- 7+ ans d''expérience dans la construction\n- Maîtrise des techniques de construction\n- Leadership et gestion d''équipe',
        'Marseille',
        'CDI',
        '45000€ - 55000€ annuel',
        'BuildPro',
        NOW(),
        'Prime de performance, Véhicule de fonction, Téléphone professionnel, Évolution vers des postes de direction',
        'Construisez l''avenir avec nous en dirigeant des projets résidentiels innovants !',
        1
    ),
    (
        'Data Scientist',
        'data,IA,machine-learning',
        5,
        'DataSphere recherche un Data Scientist talentueux pour exploiter nos données et développer des modèles prédictifs innovants.\n\nResponsabilités:\n- Analyser de grands volumes de données\n- Développer des algorithmes de machine learning\n- Collaborer avec les équipes produit et business\n- Participer à la création de solutions d''IA\n\nProfil recherché:\n- Master ou PhD en Data Science, Mathématiques ou domaine connexe\n- Expertise en Python et frameworks ML (TensorFlow, PyTorch)\n- Expérience avec les techniques de data mining\n- Connaissance des problématiques business',
        'Toulouse',
        'CDI',
        '60000€ - 75000€ annuel',
        'DataSphere',
        NOW(),
        'Télétravail partiel, Budget formation illimité, Bureaux modernes, Conférences internationales',
        'Transformez des données complexes en insights business qui façonneront le futur de nos clients !',
        2
    ),
    (
        'Alternance Marketing Digital',
        'marketing,alternance,digital',
        2,
        'EcoSolutions propose une alternance en Marketing Digital pour accompagner le développement de sa communication. Une opportunité unique d''apprendre dans un secteur innovant.\n\nMissions:\n- Gestion des réseaux sociaux\n- Création de contenu engageant\n- Analyse des performances digitales\n- Participation aux campagnes marketing\n\nProfil recherché:\n- Formation supérieure en marketing/communication\n- Intérêt pour les enjeux environnementaux\n- Créativité et rigueur\n- Maîtrise des outils digitaux',
        'Nantes',
        'Alternance',
        'Selon convention + avantages',
        'EcoSolutions',
        NOW(),
        'Formation continue, Possibilité d''embauche, Équipe dynamique, Projets à impact positif',
        'Développez vos compétences en marketing tout en contribuant à un monde plus durable !',
        1
    ),
    (
        'Développeur Mobile Flutter',
        'dev,mobile,flutter',
        5,
        'Nous recherchons un développeur mobile passionné pour participer à la création de nos applications cross-platform avec Flutter.\n\nResponsabilités:\n- Développer des applications mobiles performantes\n- Implémenter des interfaces utilisateur attrayantes\n- Optimiser les performances des applications\n- Collaborer avec les designers et l''équipe backend\n\nProfil recherché:\n- 2+ ans d''expérience en développement mobile\n- Maîtrise de Flutter et Dart\n- Connaissance de Firebase et des services cloud\n- Portfolio de projets mobiles',
        'Remote',
        'CDI',
        '45000€ - 55000€ annuel',
        'DataSphere',
        NOW(),
        '100% télétravail, Horaires flexibles, Matériel fourni, Évènements d''équipe',
        'Concevez des applications mobiles utilisées par des milliers d''utilisateurs chaque jour !',
        1
    );

-- Mot de passe pour les utilisateurs: "MotDePasse123" (hashé avec bcrypt) 