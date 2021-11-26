DROP TABLE IF EXISTS `pets`;


CREATE TABLE `pets` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `age` int NOT NULL,
  `animal` varchar(100) NOT NULL,
  `flag` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `pets` WRITE;

INSERT INTO `pets` VALUES (_binary '\'p$<¾\ìœaÀM}“®','scout',2,'dog',0),(_binary 'š÷\Æ<¶\ìœaÀM}“®','rufus',5,'dog',1),(_binary ' 3Q“<¶\ìœaÀM}“®','tom',2,'cat',0),(_binary '¦S\Ã\ì<¶\ìœaÀM}“®','scout',2,'dog',0);
/*!40000 ALTER TABLE `pets` ENABLE KEYS */;
UNLOCK TABLES;
