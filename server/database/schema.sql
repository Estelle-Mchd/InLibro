CREATE TABLE user (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstname VARCHAR(200),
  lastname VARCHAR(250),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') NOT NULL
);

CREATE TABLE book (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(300) NOT NULL,
  author VARCHAR(250) NOT NULL,
  publicationbookdate DATE NOT NULL,
  thematic ENUM('fantasy', 'suspense', 'romance', 'autobiographie', 'psychologie', 'mangas', 'histoire') NOT NULL,
  synopsis TEXT NOT NULL,
  publication_date DATE NOT NULL,
  cover_image_url VARCHAR(1000),
  user_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  UNIQUE(name, author),
  PRIMARY KEY(id)
);

CREATE TABLE reading_list (
  user_id INT UNSIGNED NOT NULL,
  book_id INT UNSIGNED NOT NULL,
  added_at DATE,
  PRIMARY KEY(user_id, book_id),
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES book(id) ON DELETE CASCADE
);

CREATE TABLE rating (
  user_id INT UNSIGNED NOT NULL,
  book_id INT UNSIGNED NOT NULL,
  rating TINYINT CHECK (rating BETWEEN 1 AND 5),
  rating_date DATE,
  PRIMARY KEY(user_id, book_id),
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES book(id) ON DELETE CASCADE
);

INSERT INTO user (firstname, lastname, email, password, role) VALUES
("Alice", "Durand", "alice.durand@example.com", "$argon2i$v=19$m=16,t=2,p=1$VXRBQTFXYmwza3FRTVlvcA$4tZMRN7fRG3VOzvleC3zZA", "user"),
("Bob", "Martin", "bob.martin@example.com", "$argon2i$v=19$m=16,t=2,p=1$Y2dMaUhRbEhHc2E2a01Obw$c4585H65RO+gIAkpWkgr0g", "user"),
("Samira", "Alarbi", "samira.alarbi@example.com", "$argon2i$v=19$m=16,t=2,p=1$MkpBZ3htUnE4Z0R2aWVPcw$Vw5cBoIYpsbp8Q897h5RNg", "user"),
("David", "Lemoine", "david.lemoine@example.com", "$argon2i$v=19$m=16,t=2,p=1$ZlY0TGNucnF1d2swZFREQg$oLQ51saOwxZk/ItmyUlqlQ", "user"),
("Emma", "Coco", "emma.coco@example.com", "$argon2i$v=19$m=16,t=2,p=1$a0ZxZmhYanFVakJIeWJLVw$v3f1wCJ64i772I2oVwYwXw", "user"),
("Estelle", "Michard", "MichardEstelleem@gmail.com", "$argon2i$v=19$m=16,t=2,p=1$SWttZzR3YW1JVjlkUkxyMw$3YHNJmQp3SC3eCQAq1v//w", "admin");

INSERT INTO book (name, author, publicationbookdate, thematic, synopsis, publication_date, cover_image_url, user_id) VALUES
("Harry Potter à l'école des sorciers", "J.K. Rowling", "1997-06-26", "fantasy", 
 "Harry découvre à 11 ans qu'il est un sorcier et intègre l'école de Poudlard où il vivra ses premières aventures magiques.", 
 "2025-06-26", "https://covers.openlibrary.org/b/id/7984916-L.jpg", 1),

("Da Vinci Code", "Dan Brown", "2003-03-18", "suspense", 
 "Un professeur de symbologie est entraîné dans une enquête mystérieuse mêlant art, religion et sociétés secrètes.", 
 "2025-03-18", "https://covers.openlibrary.org/b/id/10520480-M.jpg", 2),

("Orgueil et Préjugés", "Jane Austen", "1813-01-28", "romance", 
 "Elizabeth Bennet tente de naviguer entre les normes sociales de son époque et ses sentiments pour le mystérieux M. Darcy.", 
 "2025-01-28", "https://covers.openlibrary.org/b/id/15092533-M.jpg", 3),

("Une vie", "Simone Veil", "2007-10-01", "autobiographie", 
 "Témoignage bouleversant de l'ancienne ministre sur la Shoah, sa carrière politique et le combat des femmes.", 
 "2025-10-01", "https://images.epagine.fr/781/9782266329781_1_75.jpg", 4),

("L'Homme qui prenait sa femme pour un chapeau", "Oliver Sacks", "1985-01-01", "psychologie", 
 "Récits cliniques fascinants sur des patients atteints de troubles neurologiques singuliers.", 
 "2025-01-01", "https://media.gibert.com/media/catalog/product/cache/b1940cabebdcc55af9730bc15c397023/c/_/c_9782757840214-9782757840214_1.jpg", 5),

("Naruto, Tome 1 : Uzumaki Naruto", "Masashi Kishimoto", "1999-09-21", "mangas", 
 "Un jeune ninja rejeté par les siens rêve de devenir le plus grand Hokage du village.", 
 "2025-09-21", "https://m.media-amazon.com/images/I/71GsyZF5AyL._UF1000,1000_QL80_.jpg", 1),

("Sapiens : Une brève histoire de l'humanité", "Yuval Noah Harari", "2011-01-01", "histoire", 
 "Un voyage passionnant à travers l'histoire de l'espèce humaine, de l'âge de pierre à la révolution numérique.", 
 "2025-01-01", "https://m.media-amazon.com/images/I/61gvPmkGCtL._UF1000,1000_QL80_.jpg", 2),

("La Cité des nuages et des oiseaux", "Anthony Doerr", "2021-09-28", "fantasy",
 "Un roman ambitieux entre mythes, bibliothèques et transmission du savoir à travers les âges.", 
 "2025-09-28", "https://lepauledorion.com/wp-content/uploads/2022/09/img_20220906_190436546.jpg", 3),

("Un palais d’épines et de roses", "Sarah J. Maas", "2015-05-05", "fantasy",
 "Feyre est entraînée dans le royaume de Prythian où amour et trahison s’entrelacent. Une saga romantasy à succès.",
 "2025-05-05", "https://images.epagine.fr/595/9782732487595_1_75.jpg", 4),

("Le chant d’Achille", "Madeline Miller", "2011-09-20", "fantasy",
 "Une réinterprétation mythologique et romantique de la guerre de Troie, centrée sur l’amour entre Achille et Patrocle.", 
 "2025-09-20", "https://m.media-amazon.com/images/I/51mnS4Mr8BL._UF1000,1000_QL80_.jpg", 2),

("La Passe-Miroir : Les Fiancés de l’hiver", "Christelle Dabos", "2013-06-06", "fantasy",
 "Ophélie, dotée du pouvoir de lire les objets et de traverser les miroirs, est forcée d’unir son destin à un mystérieux fiancé.",
 "2025-06-06", "https://static.fnac-static.com/multimedia/PE/Images/FR/NR/c2/74/49/4814018/1540-1/tsp20241211081537/La-Pae-miroir.jpg", 1),

("Les damnés de la terre", "Frantz Fanon", "1961-01-01", "histoire",
 "Un ouvrage phare sur la décolonisation, la violence révolutionnaire et l’aliénation post-coloniale.", 
 "2025-01-01", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKRn4IRIOkFUu_s3wmQ03igkjntLdmbATNng&s", 5),

("Une histoire populaire des États-Unis", "Howard Zinn", "1980-01-01", "histoire",
 "Une relecture critique de l’histoire américaine vue par ses opprimés : esclaves, ouvriers, peuples autochtones.",
 "2025-01-01", "https://agone.org/wp-content/themes/yootheme/cache/e0/9782910846794-e062179b.jpeg", 2),

("Peau noire, masques blancs", "Frantz Fanon", "1952-01-01", "histoire",
 "Analyse de la construction raciale et identitaire des colonisés et des conséquences psychologiques du racisme.", 
 "2025-01-01", "https://m.media-amazon.com/images/I/71A8lSYhlGL.jpg", 3),

("Le ventre de l’Atlantique", "Fatou Diome", "2003-01-01", "histoire",
 "Une réflexion sur les illusions migratoires et les traces du colonialisme entre l’Afrique et l’Europe.", 
 "2025-01-01", "https://covers.openlibrary.org/b/id/10458594-L.jpg", 4),

("Avant toi", "Jojo Moyes", "2012-01-05", "romance",
 "Une jeune femme devient l’aide-soignante d’un homme paralysé. Une histoire poignante sur l’amour et les choix de vie.",
 "2025-01-05", "https://m.media-amazon.com/images/I/916mRAbK6FL._UF1000,1000_QL80_.jpg", 2),

("Et puis, Paulette...", "Barbara Constantine", "2012-04-01", "romance",
 "Des voisins solitaires décident de vivre ensemble. Une comédie douce sur la solidarité et les sentiments tardifs.",
 "2025-04-01", "https://m.media-amazon.com/images/I/61PlW5qO0nL._UF1000,1000_QL80_.jpg", 3),

("Devenir", "Michelle Obama", "2018-11-13", "autobiographie",
 "L’ex-Première Dame des États-Unis retrace son parcours personnel et politique avec sincérité.",
 "2025-11-13", "https://static.fnac-static.com/multimedia/PE/Images/FR/NR/bf/79/9a/10123711/1507-1/tsp20240105080532/Devenir.jpg", 1),

("Le lambeau", "Philippe Lançon", "2018-04-04", "autobiographie",
 "Le témoignage bouleversant d’un rescapé de l’attentat contre Charlie Hebdo, entre reconstruction physique et mentale.",
 "2025-04-04", "https://www.voir-de-pres.fr/app/uploads/2024/03/Couv-VDP-26-Le-Lambeau-VOL1-scaled.jpg", 5),

("Les mots sont des fenêtres (ou bien ce sont des murs)", "Marshall B. Rosenberg", "1999-01-01", "psychologie",
 "Introduction à la Communication Non Violente, pour mieux comprendre et désamorcer les conflits.",
 "2025-01-01", "https://m.media-amazon.com/images/I/61d0rzZtJRL._UF1000,1000_QL80_.jpg", 1),

("One Piece, Tome 1 : A l’aube d’une grande aventure", "Eiichiro Oda", "1997-07-22", "mangas",
 "Luffy rêve de devenir roi des pirates. Il part à la recherche du trésor légendaire : le One Piece.",
 "2025-07-22", "https://m.media-amazon.com/images/I/91t7YlWwGfL.jpg", 2),

("L’Attaque des Titans, Tome 1", "Hajime Isayama", "2009-03-17", "mangas",
 "Dans un monde assiégé par des Titans mangeurs d’hommes, Eren rêve de liberté.",
 "2025-03-17", "https://m.media-amazon.com/images/I/91tYV+R03kL.jpg", 5),

("Le Sang de la Cité", "Guillaume Chamanadjian", "2021-04-01", "fantasy",
 "Dans une cité divisée entre colline et port, un jeune coursier découvre qu'il est l'héritier d’un pouvoir ancien.",
 "2025-04-01", "https://m.media-amazon.com/images/I/71iYuEFHeRL._UF1000,1000_QL80_.jpg", 1),

("Iron Flame", "Rebecca Yarros", "2023-11-07", "fantasy",
 "Suite directe de Fourth Wing, ce tome poursuit l'entraînement magique de Violet dans une académie militaire mortelle.",
 "2025-11-07", "https://m.media-amazon.com/images/I/81CF48oIh+L._UF1000,1000_QL80_.jpg", 2),

("Twisted Love", "Ana Huang", "2021-04-29", "romance",
 "Une romance torride entre une jeune femme douce et le meilleur ami protecteur de son frère.",
 "2025-04-29", "https://m.media-amazon.com/images/I/71Ii6a7sajL.jpg", 3),

("Funny Story", "Emily Henry", "2024-04-23", "romance",
 "Une comédie romantique entre colocs qui décident de faire croire qu’ils sont en couple.",
 "2025-04-23", "https://m.media-amazon.com/images/I/81RsFAKnRfL.jpg", 4),

("Le Bug Humain", "Sébastien Bohler", "2019-09-05", "psychologie",
 "Une analyse de notre cerveau primitif face aux enjeux modernes (climat, addictions, société).",
 "2025-09-05", "https://m.media-amazon.com/images/I/91CoWQMbK7L._UF894,1000_QL80_.jpg", 5),

("12 Règles pour une vie", "Jordan B. Peterson", "2018-01-23", "psychologie",
 "Un guide philosophique et psychologique pour vivre avec plus de responsabilité et de sens.",
 "2025-01-23", "https://m.media-amazon.com/images/I/61785swUyfL._UF1000,1000_QL80_.jpg", 1),

("Je suis là", "Clélie Avit", "2015-05-07", "autobiographie",
 "L’histoire d’une femme dans le coma, consciente de tout ce qui l'entoure, mais incapable de bouger ou parler.",
 "2025-05-07", "https://m.media-amazon.com/images/I/81jthFilMhL._UF1000,1000_QL80_.jpg", 2),

("Le Serpent Majuscule", "Pierre Lemaitre", "2021-03-10", "suspense",
 "Une tueuse à gages atypique, cynique et drôle, traquée dans un Paris à la fois sombre et cocasse.",
 "2025-03-10", "https://fr.shopping.rakuten.com/photo/40663920030_L.jpg", 3),

("La Faille", "Franck Thilliez", "2024-05-02", "suspense",
 "Un thriller palpitant mêlant intelligence artificielle, manipulations scientifiques et mémoire effacée.",
 "2025-05-02", "https://m.media-amazon.com/images/I/51Y7WkAt2ZL.jpg", 4),

("La Plus Secrète Mémoire des hommes", "Mohamed Mbougar Sarr", "2021-08-19", "histoire",
 "Un jeune écrivain sénégalais enquête sur un mystérieux auteur disparu, entre fiction, mémoire et histoire.",
 "2025-08-19", "https://m.media-amazon.com/images/I/61f47xfM6PL.jpg", 5),

 ("Sapiens : Une brève histoire de l’humanité", "Yuval Noah Harari", "2014-09-04", "histoire",
 "Un essai captivant retraçant l’évolution de l’humanité, de l’âge de pierre à l’ère numérique.",
 "2025-09-04", "https://m.media-amazon.com/images/I/61SaNiLLX-L._UF1000,1000_QL80_.jpg", 1),

("L’Ordre du temps", "Carlo Rovelli", "2018-04-25", "histoire",
 "Un physicien raconte l’histoire du temps, de ses mystères et de notre perception de la réalité.",
 "2025-04-25", "https://m.media-amazon.com/images/I/71Zi0aS6RwL._UF1000,1000_QL80_.jpg", 2),

("Les Identités meurtrières", "Amin Maalouf", "1998-01-01", "histoire",
 "Réflexion brillante sur les conflits identitaires à travers l’histoire et leur poids dans le monde moderne.",
 "2025-01-01", "https://m.media-amazon.com/images/I/81p74vi5jJL._UF1000,1000_QL80_.jpg", 3),

 ("Système 1 / Système 2 : Les deux vitesses de la pensée", "Daniel Kahneman", "2011-10-25", "psychologie",
 "Une exploration des deux systèmes cognitifs qui influencent nos décisions : rapide et intuitif vs lent et réfléchi.",
 "2025-10-25", "https://m.media-amazon.com/images/I/61P9rCnogRL._UF1000,1000_QL80_.jpg", 4),

("Le Pouvoir du moment présent", "Eckhart Tolle", "1997-01-01", "psychologie",
 "Un guide vers la pleine conscience et la paix intérieure, en se reconnectant à l’instant présent.",
 "2025-01-01", "https://m.media-amazon.com/images/I/61rlFBxkt1L.jpg", 5),

 ("Jujutsu Kaisen - Tome 1", "Gege Akutami", "2018-07-04", "mangas",
 "Un lycéen absorbe une relique maudite pour sauver ses amis et intègre une école d’exorcistes.",
 "2025-07-04", "https://m.media-amazon.com/images/I/71+HW7-kq2L._UF1000,1000_QL80_.jpg", 2),

("Blue Lock - Tome 1", "Muneyuki Kaneshiro", "2018-08-01", "mangas",
 "Un centre de formation ultra-compétitif forme les meilleurs attaquants pour révolutionner le football japonais.",
 "2025-08-01", "https://m.media-amazon.com/images/I/81u9MRfdMBL.jpg", 3),

("Chainsaw Man - Tome 1", "Tatsuki Fujimoto", "2019-03-04", "mangas",
 "Denji, jeune tueur de démons fusionné avec sa tronçonneuse démoniaque, devient une arme vivante.",
 "2025-03-04", "https://m.media-amazon.com/images/I/81s8xJUzWGL.jpg", 4);

INSERT INTO reading_list (user_id, book_id, added_at) VALUES
(1, 1, "2024-01-10"),
(1, 10, "2024-02-12"),
(1, 21, "2024-03-01"),
(2, 2, "2024-01-05"),
(2, 7, "2024-02-01"),
(2, 20, "2024-03-20"),
(3, 3, "2024-01-15"),
(3, 14, "2024-02-10"),
(3, 16, "2024-03-15"),
(4, 4, "2024-01-20"),
(4, 9, "2024-02-18"),
(4, 19, "2024-03-22"),
(5, 5, "2024-01-08"),
(5, 13, "2024-02-15"),
(5, 22, "2024-03-25");

INSERT INTO rating (user_id, book_id, rating, rating_date) VALUES
(1, 1, 5, "2024-04-10"),
(1, 10, 4, "2024-04-15"),
(1, 21, 5, "2024-04-20"),
(2, 2, 3, "2024-04-05"),
(2, 7, 5, "2024-04-12"),
(2, 20, 4, "2024-04-22"),
(3, 3, 5, "2024-04-07"),
(3, 14, 4, "2024-04-18"),
(3, 16, 5, "2024-04-25"),
(4, 4, 5, "2024-04-02"),
(4, 9, 3, "2024-04-14"),
(4, 19, 4, "2024-04-24"),
(5, 5, 5, "2024-04-01"),
(5, 13, 4, "2024-04-10"),
(5, 22, 3, "2024-04-19");