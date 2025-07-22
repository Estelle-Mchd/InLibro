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
  name VARCHAR(250) NOT NULL,
  author VARCHAR(250) NOT NULL,
  publicationbookdate DATE NOT NULL,
  thematic ENUM('fantasy', 'suspense', 'romance', 'autobiographie', 'psychologie', 'mangas', 'histoire') NOT NULL,
  synopsis TEXT NOT NULL,
  publication_date DATE NOT NULL,
  cover_image_url VARCHAR(500),
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
 "1997-06-26", "https://covers.openlibrary.org/b/id/7984916-L.jpg", 1),

("Da Vinci Code", "Dan Brown", "2003-03-18", "suspense", 
 "Un professeur de symbologie est entraîné dans une enquête mystérieuse mêlant art, religion et sociétés secrètes.", 
 "2003-03-18", "https://covers.openlibrary.org/b/id/240726-L.jpg", 2),

("Orgueil et Préjugés", "Jane Austen", "1813-01-28", "romance", 
 "Elizabeth Bennet tente de naviguer entre les normes sociales de son époque et ses sentiments pour le mystérieux M. Darcy.", 
 "1813-01-28", "https://covers.openlibrary.org/b/id/8225261-L.jpg", 3),

("Une vie", "Simone Veil", "2007-10-01", "autobiographie", 
 "Témoignage bouleversant de l'ancienne ministre sur la Shoah, sa carrière politique et le combat des femmes.", 
 "2007-10-01", "https://covers.openlibrary.org/b/id/9876543-L.jpg", 4),

("L'Homme qui prenait sa femme pour un chapeau", "Oliver Sacks", "1985-01-01", "psychologie", 
 "Récits cliniques fascinants sur des patients atteints de troubles neurologiques singuliers.", 
 "1985-01-01", "https://covers.openlibrary.org/b/id/8219131-L.jpg", 5),

("Naruto, Tome 1 : Uzumaki Naruto", "Masashi Kishimoto", "1999-09-21", "mangas", 
 "Un jeune ninja rejeté par les siens rêve de devenir le plus grand Hokage du village.", 
 "1999-09-21", "https://covers.openlibrary.org/b/id/8402751-L.jpg", 1),

("Sapiens : Une brève histoire de l'humanité", "Yuval Noah Harari", "2011-01-01", "histoire", 
 "Un voyage passionnant à travers l'histoire de l'espèce humaine, de l'âge de pierre à la révolution numérique.", 
 "2011-01-01", "https://covers.openlibrary.org/b/id/8231856-L.jpg", 2),

("La Cité des nuages et des oiseaux", "Anthony Doerr", "2021-09-28", "fantasy",
 "Un roman ambitieux entre mythes, bibliothèques et transmission du savoir à travers les âges.", 
 "2021-09-28", "https://covers.openlibrary.org/b/id/12623439-L.jpg", 3),

("Un palais d’épines et de roses", "Sarah J. Maas", "2015-05-05", "fantasy",
 "Feyre est entraînée dans le royaume de Prythian où amour et trahison s’entrelacent. Une saga romantasy à succès.",
 "2015-05-05", "https://covers.openlibrary.org/b/id/11181823-L.jpg", 4),

("Le chant d’Achille", "Madeline Miller", "2011-09-20", "fantasy",
 "Une réinterprétation mythologique et romantique de la guerre de Troie, centrée sur l’amour entre Achille et Patrocle.", 
 "2011-09-20", "https://covers.openlibrary.org/b/id/11920967-L.jpg", 2),

("La Passe-Miroir : Les Fiancés de l’hiver", "Christelle Dabos", "2013-06-06", "fantasy",
 "Ophélie, dotée du pouvoir de lire les objets et de traverser les miroirs, est forcée d’unir son destin à un mystérieux fiancé.",
 "2013-06-06", "https://covers.openlibrary.org/b/id/10394653-L.jpg", 1),

("Les damnés de la terre", "Frantz Fanon", "1961-01-01", "histoire",
 "Un ouvrage phare sur la décolonisation, la violence révolutionnaire et l’aliénation post-coloniale.", 
 "1961-01-01", "https://covers.openlibrary.org/b/id/13443255-L.jpg", 5),

("Une histoire populaire des États-Unis", "Howard Zinn", "1980-01-01", "histoire",
 "Une relecture critique de l’histoire américaine vue par ses opprimés : esclaves, ouvriers, peuples autochtones.",
 "1980-01-01", "https://covers.openlibrary.org/b/id/11009400-L.jpg", 2),

("Peau noire, masques blancs", "Frantz Fanon", "1952-01-01", "histoire",
 "Analyse de la construction raciale et identitaire des colonisés et des conséquences psychologiques du racisme.", 
 "1952-01-01", "https://covers.openlibrary.org/b/id/13001428-L.jpg", 3),

("Le ventre de l’Atlantique", "Fatou Diome", "2003-01-01", "histoire",
 "Une réflexion sur les illusions migratoires et les traces du colonialisme entre l’Afrique et l’Europe.", 
 "2003-01-01", "https://covers.openlibrary.org/b/id/10458594-L.jpg", 4),

("Avant toi", "Jojo Moyes", "2012-01-05", "romance",
 "Une jeune femme devient l’aide-soignante d’un homme paralysé. Une histoire poignante sur l’amour et les choix de vie.",
 "2012-01-05", "https://covers.openlibrary.org/b/id/10510938-L.jpg", 2),

("Et puis, Paulette...", "Barbara Constantine", "2012-04-01", "romance",
 "Des voisins solitaires décident de vivre ensemble. Une comédie douce sur la solidarité et les sentiments tardifs.",
 "2012-04-01", "https://covers.openlibrary.org/b/id/9876435-L.jpg", 3),

("Devenir", "Michelle Obama", "2018-11-13", "autobiographie",
 "L’ex-Première Dame des États-Unis retrace son parcours personnel et politique avec sincérité.",
 "2018-11-13", "https://covers.openlibrary.org/b/id/9360861-L.jpg", 1),

("Le lambeau", "Philippe Lançon", "2018-04-04", "autobiographie",
 "Le témoignage bouleversant d’un rescapé de l’attentat contre Charlie Hebdo, entre reconstruction physique et mentale.",
 "2018-04-04", "https://covers.openlibrary.org/b/id/9295871-L.jpg", 5),

("Les mots sont des fenêtres (ou bien ce sont des murs)", "Marshall B. Rosenberg", "1999-01-01", "psychologie",
 "Introduction à la Communication Non Violente, pour mieux comprendre et désamorcer les conflits.",
 "1999-01-01", "https://covers.openlibrary.org/b/id/9283171-L.jpg", 1),

("Manuel de survie à l’usage des hypersensibles", "Thierry Janssen", "2020-06-04", "psychologie",
 "Un guide pour comprendre et apaiser l’hypersensibilité dans le monde moderne.",
 "2020-06-04", "https://covers.openlibrary.org/b/id/11119234-L.jpg", 4),

("One Piece, Tome 1 : A l’aube d’une grande aventure", "Eiichiro Oda", "1997-07-22", "mangas",
 "Luffy rêve de devenir roi des pirates. Il part à la recherche du trésor légendaire : le One Piece.",
 "1997-07-22", "https://covers.openlibrary.org/b/id/8021127-L.jpg", 2),

("L’Attaque des Titans, Tome 1", "Hajime Isayama", "2009-03-17", "mangas",
 "Dans un monde assiégé par des Titans mangeurs d’hommes, Eren rêve de liberté.",
 "2009-03-17", "https://covers.openlibrary.org/b/id/11221553-L.jpg", 5);

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