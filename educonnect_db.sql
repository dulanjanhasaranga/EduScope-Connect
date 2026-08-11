-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: educonnect
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers` (
  `is_accepted` bit(1) NOT NULL,
  `vote_count` int NOT NULL,
  `author_id` bigint NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `question_id` bigint NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `body` varchar(5000) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKaih8gs2e2ii62666wr3b91ulf` (`author_id`),
  KEY `FK3erw1a3t0r78st8ty27x6v3g1` (`question_id`),
  CONSTRAINT `FK3erw1a3t0r78st8ty27x6v3g1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
  CONSTRAINT `FKaih8gs2e2ii62666wr3b91ulf` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=226 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (_binary '',9,9,'2026-06-03 00:30:00.000000',1,4,'2026-08-07 15:57:59.407483','Bias in training data can lead to discriminatory outcomes, making it a critical issue.'),(_binary '',2,10,'2026-06-10 03:30:00.000000',2,5,'2026-08-07 15:57:59.481302','It uses specific transport proteins and tight junctions between endothelial cells.'),(_binary '',8,11,'2026-08-06 18:30:00.000000',3,6,'2026-08-07 15:57:59.559162','They determine the stability and behavior of solutions to systems of linear ODEs.'),(_binary '',2,12,'2026-06-20 10:30:00.000000',4,7,'2026-08-07 15:57:59.635476','L1 encourages sparsity (feature selection), while L2 prevents large weights (ridge).'),(_binary '',1,13,'2026-07-15 14:30:00.000000',5,8,'2026-08-07 15:57:59.711936','Lipid nanoparticle delivery systems have drastically improved targeting.'),(_binary '',3,14,'2026-07-31 07:30:00.000000',6,9,'2026-08-07 15:57:59.784122','Topology is used in data analysis (TDA) to find shape-based patterns in high-dimensional data.'),(_binary '',6,15,'2026-06-16 18:30:00.000000',7,10,'2026-08-07 15:57:59.861146','Adam essentially combines the benefits of both AdaGrad and RMSProp by using momentum.'),(_binary '',6,16,'2026-07-20 19:30:00.000000',8,11,'2026-08-07 15:57:59.937815','Receptor downregulation and intracellular signaling defects cause insulin resistance.'),(_binary '',9,17,'2026-07-16 10:30:00.000000',9,12,'2026-08-07 15:58:00.020130','They determine the stability and behavior of solutions to systems of linear ODEs.'),(_binary '',2,18,'2026-06-09 17:30:00.000000',10,13,'2026-08-07 15:58:00.099506','They use message passing, where each node aggregates features from its immediate neighbors.'),(_binary '',2,19,'2026-07-31 06:30:00.000000',11,14,'2026-08-07 15:58:00.179843','Bacteriophage therapy is currently being heavily researched for multi-drug resistant bacteria.'),(_binary '',6,20,'2026-06-10 00:30:00.000000',12,15,'2026-08-07 15:58:00.252345','Topology is used in data analysis (TDA) to find shape-based patterns in high-dimensional data.'),(_binary '',8,21,'2026-06-07 23:30:00.000000',13,16,'2026-08-07 15:58:00.325551','Self-attention allows the model to weigh the importance of different words in a sentence simultaneously.'),(_binary '',2,22,'2026-08-04 16:30:00.000000',14,17,'2026-08-07 15:58:00.401081','Yes, trials for conditions like sickle cell anemia show immense promise in somatic cells.'),(_binary '',9,23,'2026-06-17 12:30:00.000000',15,18,'2026-08-07 15:58:00.472651','They determine the stability and behavior of solutions to systems of linear ODEs.'),(_binary '',2,24,'2026-08-03 03:30:00.000000',16,19,'2026-08-07 15:58:00.544059','Fine-tuning leverages pre-trained representations, which usually saves time and data.'),(_binary '',2,25,'2026-06-22 23:30:00.000000',17,20,'2026-08-07 15:58:00.615064','Autoreactive T-cells mistakenly identify self-antigens as foreign and attack tissues.'),(_binary '\0',0,1,'2026-07-16 15:58:00.659720',18,1,'2026-08-07 15:58:00.659720','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-08-03 15:58:00.660744',19,1,'2026-08-07 15:58:00.660744','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-18 15:58:00.662384',20,1,'2026-08-07 15:58:00.662384','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-08-01 15:58:00.663492',21,1,'2026-08-07 15:58:00.663492','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-25 15:58:00.664612',22,1,'2026-08-07 15:58:00.664612','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-08-07 15:58:00.665704',23,1,'2026-08-07 15:58:00.665704','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-24 15:58:00.666796',24,1,'2026-08-07 15:58:00.666796','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-13 15:58:00.667871',25,1,'2026-08-07 15:58:00.667871','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-11 15:58:00.668945',26,1,'2026-08-07 15:58:00.668945','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-08-07 15:58:00.670068',27,1,'2026-08-07 15:58:00.670068','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-18 15:58:00.671193',28,1,'2026-08-07 15:58:00.671193','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-26 15:58:00.672337',29,1,'2026-08-07 15:58:00.672337','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-16 15:58:00.673626',30,1,'2026-08-07 15:58:00.673626','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-20 15:58:00.674213',31,1,'2026-08-07 15:58:00.674756','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-13 15:58:00.675272',32,1,'2026-08-07 15:58:00.675855','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-16 15:58:00.676919',33,1,'2026-08-07 15:58:00.676919','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-18 15:58:00.677987',34,1,'2026-08-07 15:58:00.677987','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-25 15:58:00.679121',35,1,'2026-08-07 15:58:00.679121','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-24 15:58:00.680202',36,1,'2026-08-07 15:58:00.680202','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-28 15:58:00.681335',37,1,'2026-08-07 15:58:00.681335','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-26 15:58:00.682433',38,1,'2026-08-07 15:58:00.682433','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-22 15:58:00.683488',39,1,'2026-08-07 15:58:00.683488','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-26 15:58:00.684597',40,1,'2026-08-07 15:58:00.684597','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-24 15:58:00.685734',41,1,'2026-08-07 15:58:00.685734','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-21 15:58:00.686270',42,1,'2026-08-07 15:58:00.686819','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-26 15:58:00.687392',43,1,'2026-08-07 15:58:00.687392','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-13 15:58:00.688447',44,1,'2026-08-07 15:58:00.688447','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-08-04 15:58:00.690251',45,1,'2026-08-07 15:58:00.690251','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-29 15:58:00.691361',46,1,'2026-08-07 15:58:00.691361','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-08-05 15:58:00.692438',47,1,'2026-08-07 15:58:00.692438','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-08-06 15:58:00.693485',48,1,'2026-08-07 15:58:00.693485','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-20 15:58:00.695137',49,1,'2026-08-07 15:58:00.695137','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-08-06 15:58:00.696203',50,1,'2026-08-07 15:58:00.696203','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-27 15:58:00.697280',51,1,'2026-08-07 15:58:00.697280','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-14 15:58:00.698366',52,1,'2026-08-07 15:58:00.698366','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-28 15:58:00.699437',53,1,'2026-08-07 15:58:00.699437','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-11 15:58:00.700585',54,1,'2026-08-07 15:58:00.700585','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-29 15:58:00.701137',55,1,'2026-08-07 15:58:00.701659','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-08-03 15:58:00.702187',56,1,'2026-08-07 15:58:00.702187','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-08-02 15:58:00.703235',57,1,'2026-08-07 15:58:00.703235','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-08-02 15:58:00.704351',58,1,'2026-08-07 15:58:00.704351','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-29 15:58:00.705398',59,1,'2026-08-07 15:58:00.705398','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-08-04 15:58:00.705921',60,1,'2026-08-07 15:58:00.706451','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-08-02 15:58:00.706972',61,1,'2026-08-07 15:58:00.706972','Historical answer for month offset 0'),(_binary '\0',0,1,'2026-07-04 15:58:00.708045',62,1,'2026-08-07 15:58:00.708045','Historical answer for month offset 1'),(_binary '\0',0,1,'2026-06-20 15:58:00.709119',63,1,'2026-08-07 15:58:00.709119','Historical answer for month offset 1'),(_binary '\0',0,1,'2026-06-20 15:58:00.709636',64,1,'2026-08-07 15:58:00.709636','Historical answer for month offset 1'),(_binary '\0',0,1,'2026-06-26 15:58:00.710180',65,1,'2026-08-07 15:58:00.710180','Historical answer for month offset 1'),(_binary '\0',0,1,'2026-06-19 15:58:00.712062',66,1,'2026-08-07 15:58:00.712646','Historical answer for month offset 1'),(_binary '\0',0,1,'2026-06-29 15:58:00.713778',67,1,'2026-08-07 15:58:00.713778','Historical answer for month offset 1'),(_binary '\0',0,1,'2026-07-01 15:58:00.714869',68,1,'2026-08-07 15:58:00.714869','Historical answer for month offset 1'),(_binary '\0',0,1,'2026-07-05 15:58:00.716506',69,1,'2026-08-07 15:58:00.716506','Historical answer for month offset 1'),(_binary '\0',0,1,'2026-07-04 15:58:00.717585',70,1,'2026-08-07 15:58:00.717585','Historical answer for month offset 1'),(_binary '\0',0,1,'2026-06-17 15:58:00.719253',71,1,'2026-08-07 15:58:00.719253','Historical answer for month offset 1'),(_binary '\0',0,1,'2026-07-02 15:58:00.720420',72,1,'2026-08-07 15:58:00.720420','Historical answer for month offset 1'),(_binary '\0',0,1,'2026-07-03 15:58:00.721543',73,1,'2026-08-07 15:58:00.721543','Historical answer for month offset 1'),(_binary '\0',0,1,'2026-06-19 15:58:00.722607',74,1,'2026-08-07 15:58:00.722607','Historical answer for month offset 1'),(_binary '\0',0,1,'2026-06-26 15:58:00.724243',75,1,'2026-08-07 15:58:00.724243','Historical answer for month offset 1'),(_binary '\0',0,1,'2026-06-23 15:58:00.725344',76,1,'2026-08-07 15:58:00.725879','Historical answer for month offset 1'),(_binary '\0',0,1,'2026-05-27 15:58:00.726462',77,1,'2026-08-07 15:58:00.726462','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-05-16 15:58:00.728230',78,1,'2026-08-07 15:58:00.728230','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-06-07 15:58:00.729381',79,1,'2026-08-07 15:58:00.729381','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-06-04 15:58:00.730548',80,1,'2026-08-07 15:58:00.731141','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-05-25 15:58:00.732286',81,1,'2026-08-07 15:58:00.732286','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-05-11 15:58:00.733448',82,1,'2026-08-07 15:58:00.733448','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-05-17 15:58:00.734597',83,1,'2026-08-07 15:58:00.734597','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-05-27 15:58:00.735847',84,1,'2026-08-07 15:58:00.736571','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-05-30 15:58:00.737787',85,1,'2026-08-07 15:58:00.737787','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-05-28 15:58:00.738932',86,1,'2026-08-07 15:58:00.738932','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-05-27 15:58:00.740057',87,1,'2026-08-07 15:58:00.740057','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-05-22 15:58:00.741235',88,1,'2026-08-07 15:58:00.741765','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-05-22 15:58:00.742839',89,1,'2026-08-07 15:58:00.742839','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-05-20 15:58:00.743902',90,1,'2026-08-07 15:58:00.743902','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-05-20 15:58:00.745552',91,1,'2026-08-07 15:58:00.745552','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-05-30 15:58:00.746736',92,1,'2026-08-07 15:58:00.746736','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-05-16 15:58:00.747862',93,1,'2026-08-07 15:58:00.747862','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-05-30 15:58:00.748924',94,1,'2026-08-07 15:58:00.748924','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-05-14 15:58:00.749997',95,1,'2026-08-07 15:58:00.750647','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-05-18 15:58:00.751735',96,1,'2026-08-07 15:58:00.751735','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-05-13 15:58:00.752856',97,1,'2026-08-07 15:58:00.752856','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-05-18 15:58:00.754478',98,1,'2026-08-07 15:58:00.754478','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-05-31 15:58:00.755552',99,1,'2026-08-07 15:58:00.755552','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-06-03 15:58:00.757861',100,1,'2026-08-07 15:58:00.757861','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-05-28 15:58:00.758931',101,1,'2026-08-07 15:58:00.759490','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-06-02 15:58:00.760558',102,1,'2026-08-07 15:58:00.760558','Historical answer for month offset 2'),(_binary '\0',0,1,'2026-04-29 15:58:00.761087',103,1,'2026-08-07 15:58:00.761612','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-28 15:58:00.762719',104,1,'2026-08-07 15:58:00.762719','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-22 15:58:00.763797',105,1,'2026-08-07 15:58:00.763797','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-17 15:58:00.764866',106,1,'2026-08-07 15:58:00.764866','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-10 15:58:00.766090',107,1,'2026-08-07 15:58:00.766090','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-16 15:58:00.767190',108,1,'2026-08-07 15:58:00.767707','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-05-01 15:58:00.768774',109,1,'2026-08-07 15:58:00.768774','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-17 15:58:00.769300',110,1,'2026-08-07 15:58:00.769300','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-19 15:58:00.770364',111,1,'2026-08-07 15:58:00.770364','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-19 15:58:00.771409',112,1,'2026-08-07 15:58:00.771409','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-10 15:58:00.772508',113,1,'2026-08-07 15:58:00.773038','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-05-06 15:58:00.774123',114,1,'2026-08-07 15:58:00.774123','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-22 15:58:00.775224',115,1,'2026-08-07 15:58:00.775224','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-28 15:58:00.776269',116,1,'2026-08-07 15:58:00.776269','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-23 15:58:00.776797',117,1,'2026-08-07 15:58:00.777331','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-05-03 15:58:00.778396',118,1,'2026-08-07 15:58:00.778396','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-11 15:58:00.779992',119,1,'2026-08-07 15:58:00.779992','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-05-06 15:58:00.781173',120,1,'2026-08-07 15:58:00.781702','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-10 15:58:00.782762',121,1,'2026-08-07 15:58:00.782762','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-24 15:58:00.783823',122,1,'2026-08-07 15:58:00.783823','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-30 15:58:00.785405',123,1,'2026-08-07 15:58:00.785405','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-22 15:58:00.787033',124,1,'2026-08-07 15:58:00.787033','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-14 15:58:00.788608',125,1,'2026-08-07 15:58:00.788608','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-26 15:58:00.789667',126,1,'2026-08-07 15:58:00.790199','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-05-07 15:58:00.791271',127,1,'2026-08-07 15:58:00.791271','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-18 15:58:00.792875',128,1,'2026-08-07 15:58:00.793408','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-20 15:58:00.796451',129,1,'2026-08-07 15:58:00.796451','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-18 15:58:00.798106',130,1,'2026-08-07 15:58:00.798106','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-17 15:58:00.800136',131,1,'2026-08-07 15:58:00.800136','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-11 15:58:00.801765',132,1,'2026-08-07 15:58:00.801765','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-10 15:58:00.802920',133,1,'2026-08-07 15:58:00.802920','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-05-01 15:58:00.804780',134,1,'2026-08-07 15:58:00.804780','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-19 15:58:00.806429',135,1,'2026-08-07 15:58:00.807011','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-28 15:58:00.808106',136,1,'2026-08-07 15:58:00.808106','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-22 15:58:00.809175',137,1,'2026-08-07 15:58:00.809175','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-11 15:58:00.810289',138,1,'2026-08-07 15:58:00.810289','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-27 15:58:00.811422',139,1,'2026-08-07 15:58:00.811422','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-11 15:58:00.812613',140,1,'2026-08-07 15:58:00.812613','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-29 15:58:00.813695',141,1,'2026-08-07 15:58:00.814220','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-11 15:58:00.815292',142,1,'2026-08-07 15:58:00.815292','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-27 15:58:00.817997',143,1,'2026-08-07 15:58:00.817997','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-28 15:58:00.819065',144,1,'2026-08-07 15:58:00.819065','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-04-24 15:58:00.820139',145,1,'2026-08-07 15:58:00.820139','Historical answer for month offset 3'),(_binary '\0',0,1,'2026-03-12 15:58:00.821209',146,1,'2026-08-07 15:58:00.821209','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-13 15:58:00.822306',147,1,'2026-08-07 15:58:00.822306','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-04-02 15:58:00.823359',148,1,'2026-08-07 15:58:00.823359','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-16 15:58:00.823888',149,1,'2026-08-07 15:58:00.823888','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-13 15:58:00.824943',150,1,'2026-08-07 15:58:00.824943','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-04-05 15:58:00.825989',151,1,'2026-08-07 15:58:00.825989','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-21 15:58:00.826513',152,1,'2026-08-07 15:58:00.826513','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-16 15:58:00.827633',153,1,'2026-08-07 15:58:00.827633','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-04-05 15:58:00.828640',154,1,'2026-08-07 15:58:00.828640','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-23 15:58:00.829148',155,1,'2026-08-07 15:58:00.829148','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-26 15:58:00.830160',156,1,'2026-08-07 15:58:00.830160','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-17 15:58:00.831216',157,1,'2026-08-07 15:58:00.831216','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-26 15:58:00.831754',158,1,'2026-08-07 15:58:00.831754','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-24 15:58:00.832284',159,1,'2026-08-07 15:58:00.832284','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-04-02 15:58:00.832829',160,1,'2026-08-07 15:58:00.832829','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-19 15:58:00.833421',161,1,'2026-08-07 15:58:00.833964','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-21 15:58:00.834486',162,1,'2026-08-07 15:58:00.834486','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-23 15:58:00.835007',163,1,'2026-08-07 15:58:00.835546','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-21 15:58:00.836085',164,1,'2026-08-07 15:58:00.836085','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-28 15:58:00.836631',165,1,'2026-08-07 15:58:00.836631','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-22 15:58:00.837698',166,1,'2026-08-07 15:58:00.837698','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-04-04 15:58:00.838232',167,1,'2026-08-07 15:58:00.838232','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-18 15:58:00.839283',168,1,'2026-08-07 15:58:00.839283','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-15 15:58:00.839807',169,1,'2026-08-07 15:58:00.839807','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-25 15:58:00.840869',170,1,'2026-08-07 15:58:00.840869','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-19 15:58:00.841394',171,1,'2026-08-07 15:58:00.841394','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-25 15:58:00.842536',172,1,'2026-08-07 15:58:00.842536','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-19 15:58:00.843068',173,1,'2026-08-07 15:58:00.843068','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-11 15:58:00.844149',174,1,'2026-08-07 15:58:00.844149','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-04-07 15:58:00.844709',175,1,'2026-08-07 15:58:00.845258','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-18 15:58:00.845777',176,1,'2026-08-07 15:58:00.845777','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-04-02 15:58:00.846302',177,1,'2026-08-07 15:58:00.846302','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-20 15:58:00.847381',178,1,'2026-08-07 15:58:00.847911','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-18 15:58:00.848441',179,1,'2026-08-07 15:58:00.848441','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-26 15:58:00.850030',180,1,'2026-08-07 15:58:00.850030','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-14 15:58:00.851207',181,1,'2026-08-07 15:58:00.851207','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-28 15:58:00.852271',182,1,'2026-08-07 15:58:00.852271','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-25 15:58:00.853338',183,1,'2026-08-07 15:58:00.853338','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-04-01 15:58:00.854957',184,1,'2026-08-07 15:58:00.854957','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-27 15:58:00.855489',185,1,'2026-08-07 15:58:00.856042','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-22 15:58:00.856624',186,1,'2026-08-07 15:58:00.856624','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-18 15:58:00.857840',187,1,'2026-08-07 15:58:00.857840','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-03-20 15:58:00.858910',188,1,'2026-08-07 15:58:00.858910','Historical answer for month offset 4'),(_binary '\0',0,1,'2026-02-15 15:58:00.859980',189,1,'2026-08-07 15:58:00.859980','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-03-03 15:58:00.861059',190,1,'2026-08-07 15:58:00.861059','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-10 15:58:00.861593',191,1,'2026-08-07 15:58:00.861593','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-19 15:58:00.862668',192,1,'2026-08-07 15:58:00.862668','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-03-03 15:58:00.863774',193,1,'2026-08-07 15:58:00.863774','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-03-03 15:58:00.864305',194,1,'2026-08-07 15:58:00.864830','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-13 15:58:00.865365',195,1,'2026-08-07 15:58:00.865365','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-24 15:58:00.866453',196,1,'2026-08-07 15:58:00.866453','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-19 15:58:00.867562',197,1,'2026-08-07 15:58:00.867562','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-03-02 15:58:00.868089',198,1,'2026-08-07 15:58:00.868624','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-24 15:58:00.869145',199,1,'2026-08-07 15:58:00.869697','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-12 15:58:00.870224',200,1,'2026-08-07 15:58:00.870224','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-03-02 15:58:00.871298',201,1,'2026-08-07 15:58:00.871298','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-03-05 15:58:00.872364',202,1,'2026-08-07 15:58:00.872364','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-11 15:58:00.873518',203,1,'2026-08-07 15:58:00.873518','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-22 15:58:00.874045',204,1,'2026-08-07 15:58:00.874045','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-03-03 15:58:00.875116',205,1,'2026-08-07 15:58:00.875116','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-20 15:58:00.876174',206,1,'2026-08-07 15:58:00.876174','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-15 15:58:00.877237',207,1,'2026-08-07 15:58:00.877237','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-14 15:58:00.878318',208,1,'2026-08-07 15:58:00.878318','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-13 15:58:00.879397',209,1,'2026-08-07 15:58:00.879397','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-09 15:58:00.880559',210,1,'2026-08-07 15:58:00.880559','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-28 15:58:00.881641',211,1,'2026-08-07 15:58:00.881641','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-09 15:58:00.882177',212,1,'2026-08-07 15:58:00.882177','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-08 15:58:00.883226',213,1,'2026-08-07 15:58:00.883226','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-20 15:58:00.884320',214,1,'2026-08-07 15:58:00.884320','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-14 15:58:00.884850',215,1,'2026-08-07 15:58:00.884850','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-11 15:58:00.885915',216,1,'2026-08-07 15:58:00.885915','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-25 15:58:00.886435',217,1,'2026-08-07 15:58:00.886435','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-10 15:58:00.887515',218,1,'2026-08-07 15:58:00.887515','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-26 15:58:00.888120',219,1,'2026-08-07 15:58:00.888645','Historical answer for month offset 5'),(_binary '\0',0,1,'2026-02-22 15:58:00.889176',220,1,'2026-08-07 15:58:00.889176','Historical answer for month offset 5'),(_binary '',3,30,'2026-08-07 03:58:32.068226',221,21,'2026-08-07 15:58:32.073677','I recommend checking out the official documentation or some beginner tutorials online! They really helped me.'),(_binary '',3,33,'2026-08-07 03:58:32.310198',222,23,'2026-08-07 15:58:32.315968','I recommend checking out the official documentation or some beginner tutorials online! They really helped me.'),(_binary '',3,36,'2026-08-07 03:58:32.540608',223,25,'2026-08-07 15:58:32.545773','I recommend checking out the official documentation or some beginner tutorials online! They really helped me.'),(_binary '',3,39,'2026-08-07 03:58:32.774519',224,27,'2026-08-07 15:58:32.780357','I recommend checking out the official documentation or some beginner tutorials online! They really helped me.'),(_binary '',3,42,'2026-08-07 03:58:33.017065',225,29,'2026-08-07 15:58:33.022420','I recommend checking out the official documentation or some beginner tutorials online! They really helped me.');
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assessment_question_options`
--

DROP TABLE IF EXISTS `assessment_question_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assessment_question_options` (
  `question_id` bigint NOT NULL,
  `option_text` varchar(255) DEFAULT NULL,
  KEY `FK6ai3it6y3p5371brrx52rfxvv` (`question_id`),
  CONSTRAINT `FK6ai3it6y3p5371brrx52rfxvv` FOREIGN KEY (`question_id`) REFERENCES `assessment_questions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessment_question_options`
--

LOCK TABLES `assessment_question_options` WRITE;
/*!40000 ALTER TABLE `assessment_question_options` DISABLE KEYS */;
INSERT INTO `assessment_question_options` VALUES (1,'Increases'),(1,'Decreases'),(1,'Stays the same'),(2,'First-order'),(2,'Zero-order'),(2,'Second-order'),(3,'Decreased FEV1/FVC'),(3,'Increased TLC'),(3,'Decreased TLC');
/*!40000 ALTER TABLE `assessment_question_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assessment_questions`
--

DROP TABLE IF EXISTS `assessment_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assessment_questions` (
  `correct_option_index` int NOT NULL,
  `assessment_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `text` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKljemcscn19ij7kysiqewaqp88` (`assessment_id`),
  CONSTRAINT `FKljemcscn19ij7kysiqewaqp88` FOREIGN KEY (`assessment_id`) REFERENCES `assessments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessment_questions`
--

LOCK TABLES `assessment_questions` WRITE;
/*!40000 ALTER TABLE `assessment_questions` DISABLE KEYS */;
INSERT INTO `assessment_questions` VALUES (0,1,1,'What happens to half-life if clearance decreases and Vd is constant?'),(1,1,2,'Which order kinetics exhibits a constant amount of drug eliminated per unit time?'),(2,2,3,'What is the hallmark of restrictive lung disease?');
/*!40000 ALTER TABLE `assessment_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assessments`
--

DROP TABLE IF EXISTS `assessments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assessments` (
  `author_id` bigint NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK75m11qpsiaj2r0pyyjq2nqj70` (`author_id`),
  CONSTRAINT `FK75m11qpsiaj2r0pyyjq2nqj70` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessments`
--

LOCK TABLES `assessments` WRITE;
/*!40000 ALTER TABLE `assessments` DISABLE KEYS */;
INSERT INTO `assessments` VALUES (1,'2026-08-07 15:57:59.070851',1,'Test your knowledge on half-life, clearance, and Vd.','Advanced Pharmacokinetics Quiz'),(1,'2026-08-07 15:57:59.077565',2,'Comprehensive exam on disease mechanisms.','Clinical Pathophysiology Exam');
/*!40000 ALTER TABLE `assessments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `entity_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `performed_by_id` bigint NOT NULL,
  `timestamp` datetime(6) NOT NULL,
  `details` varchar(500) DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `entity_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6kkr1cx12j4vinn5ele5o88f4` (`performed_by_id`),
  CONSTRAINT `FK6kkr1cx12j4vinn5ele5o88f4` FOREIGN KEY (`performed_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
INSERT INTO `audit_logs` VALUES (1,1,1,'2026-08-07 15:58:00.896675','Changed MAINTENANCE_MODE from true to false','UPDATED_SETTING','SystemSetting'),(99,2,1,'2026-08-07 03:58:00.896675','Deleted spam question \'buy cheap watches\'','DELETED_QUESTION','Question'),(3,3,1,'2026-08-07 10:58:00.896675','Promoted user erodriguez@research.edu to LEADER role','PROMOTED_USER','User'),(5,4,1,'2026-08-07 15:28:00.896675','Added RxCalculations product','CREATED_ECOSYSTEM_APP','EcosystemProduct');
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecosystem_product_features`
--

DROP TABLE IF EXISTS `ecosystem_product_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecosystem_product_features` (
  `feature` varchar(255) DEFAULT NULL,
  `product_id` varchar(255) NOT NULL,
  KEY `FK1ofgd6jh4d63u4ypaa9lta033` (`product_id`),
  CONSTRAINT `FK1ofgd6jh4d63u4ypaa9lta033` FOREIGN KEY (`product_id`) REFERENCES `ecosystem_products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecosystem_product_features`
--

LOCK TABLES `ecosystem_product_features` WRITE;
/*!40000 ALTER TABLE `ecosystem_product_features` DISABLE KEYS */;
INSERT INTO `ecosystem_product_features` VALUES ('Workload Analytics','facultylens'),('AI-Generated Insights','facultylens'),('Teaching, Research, & Service Balancing','facultylens'),('Smart Document Summarization','bevinzey'),('Auto-generated Practice Questions','bevinzey'),('24/7 AI Tutor Support','bevinzey'),('50+ SOTA LLM Metrics','evalometrics'),('G-Eval & Custom Criteria','evalometrics'),('End-to-End LLM Evals','evalometrics'),('Study Goals Tracking','studysocius'),('Assignment Management','studysocius'),('Cross-Device Accessibility','studysocius'),('Online Practice Question Banks','rxcalculations'),('Video Tutorials & Courses','rxcalculations'),('NAPLEX Exam Prep','rxcalculations');
/*!40000 ALTER TABLE `ecosystem_product_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecosystem_products`
--

DROP TABLE IF EXISTS `ecosystem_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecosystem_products` (
  `category` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `bg_color` varchar(255) NOT NULL,
  `border_color` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `icon_color` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `tagline` varchar(255) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecosystem_products`
--

LOCK TABLES `ecosystem_products` WRITE;
/*!40000 ALTER TABLE `ecosystem_products` DISABLE KEYS */;
INSERT INTO `ecosystem_products` VALUES ('Learning','Transform how you learn with AI-powered summarization, question generation, lecture transcription, and personalized tutoring. Built for students, educators, and institutions.','bg-purple-50','border-purple-200','from-purple-500 to-pink-500','Bot','text-purple-600','/images/ecosystem/bevinzey.png','Bevinzey','bevinzey','AI-Powered Study Tools'),('Analytics','The open-source LLM evaluation framework. Offers 50+ state-of-the-art, ready-to-use metrics for evaluating LLMs, including G-Eval, RAG metrics, and custom criteria.','bg-emerald-50','border-emerald-200','from-emerald-500 to-teal-500','GraduationCap','text-emerald-600','/images/ecosystem/evalometrics.png','Evalometrics','evalometrics','LLM Evaluation Framework'),('Analytics','Analyze and balance faculty workload across teaching, research, and service with powerful dashboards and AI-generated insights.','bg-blue-50','border-blue-200','from-blue-500 to-cyan-500','BarChart3','text-blue-600','/images/ecosystem/facultylens.png','FacultyLens','facultylens','Smart Faculty Workload Analytics'),('Medical','Top quality pharmaceutical calculations resources: online practice question banks, video tutorials, courses, books, apps and private tutoring to help pharmacy students ace the NAPLEX.','bg-red-50','border-red-200','from-red-500 to-rose-500','Pill','text-red-600','/images/ecosystem/rxcalculations.png','RxCalculations','rxcalculations','Pharmacy Calculations'),('Social','The student\'s quintessential productivity companion designed to boost efficiency. Accessible on all devices, from PCs and tablets to mobile phones, for streamlined studies.','bg-orange-50','border-orange-200','from-orange-500 to-amber-500','Users2','text-orange-600','/images/ecosystem/studysocius.png','StudySocius','studysocius','Productivity Companion');
/*!40000 ALTER TABLE `ecosystem_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_messages`
--

DROP TABLE IF EXISTS `group_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_messages` (
  `author_id` bigint NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `group_id` bigint NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsgkevlj4oo1wgnght83oncoyc` (`author_id`),
  KEY `FKebxr6hehnp23qvyv22t37ocac` (`group_id`),
  CONSTRAINT `FKebxr6hehnp23qvyv22t37ocac` FOREIGN KEY (`group_id`) REFERENCES `study_groups` (`id`),
  CONSTRAINT `FKsgkevlj4oo1wgnght83oncoyc` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_messages`
--

LOCK TABLES `group_messages` WRITE;
/*!40000 ALTER TABLE `group_messages` DISABLE KEYS */;
INSERT INTO `group_messages` VALUES (9,'2026-06-29 07:30:00.000000',1,1,'Hey everyone! Glad to join the Advanced Machine Learning group. Looking forward to learning together!'),(10,'2026-08-03 09:30:00.000000',2,2,'Has anyone started working on the latest topics?'),(11,'2026-07-16 23:30:00.000000',3,3,'Yes, I just started yesterday. It\'s quite interesting!'),(12,'2026-06-02 22:30:00.000000',1,4,'Let me know if anyone needs help, we can study together.'),(13,'2026-06-10 01:30:00.000000',2,5,'Hi guys! I\'m really interested in this and hope to share some great resources.'),(14,'2026-08-06 16:30:00.000000',3,6,'Hello! This topic is tough, so I\'m hoping this group will be a big help!'),(15,'2026-06-20 08:30:00.000000',1,7,'Does anyone have a good tutorial to recommend?'),(16,'2026-07-15 12:30:00.000000',2,8,'I found a great YouTube video on this recently, I\'ll share it later.'),(17,'2026-07-31 05:30:00.000000',3,9,'Just joined! Can\'t wait to start discussing with you all.'),(18,'2026-06-16 16:30:00.000000',1,10,'Hey folks, what\'s everyone working on right now?'),(19,'2026-07-20 17:30:00.000000',2,11,'Hey everyone! Glad to join the Clinical Pathophysiology Prep group. Looking forward to learning together!'),(20,'2026-07-16 08:30:00.000000',3,12,'Has anyone started working on the latest topics?'),(21,'2026-06-09 15:30:00.000000',1,13,'Yes, I just started yesterday. It\'s quite interesting!'),(22,'2026-07-31 04:30:00.000000',2,14,'Let me know if anyone needs help, we can study together.'),(23,'2026-06-09 22:30:00.000000',3,15,'Hi guys! I\'m really interested in this and hope to share some great resources.'),(24,'2026-06-07 21:30:00.000000',1,16,'Hello! This topic is tough, so I\'m hoping this group will be a big help!'),(25,'2026-08-04 14:30:00.000000',2,17,'Does anyone have a good tutorial to recommend?'),(26,'2026-06-17 10:30:00.000000',3,18,'I found a great YouTube video on this recently, I\'ll share it later.'),(27,'2026-08-03 01:30:00.000000',1,19,'Just joined! Can\'t wait to start discussing with you all.'),(28,'2026-06-22 21:30:00.000000',2,20,'Hey folks, what\'s everyone working on right now?'),(29,'2026-08-07 15:28:32.068226',4,21,'Hey everyone! Glad to join the group.'),(30,'2026-08-07 15:33:32.068226',4,22,'Has anyone started working on the latest topics?'),(31,'2026-08-07 15:38:32.068226',4,23,'Yes, I just started yesterday. It\'s quite interesting!'),(29,'2026-08-07 15:43:32.068226',4,24,'Let me know if anyone needs help, we can study together.'),(32,'2026-08-07 15:28:32.310198',5,25,'Hey everyone! Glad to join the group.'),(33,'2026-08-07 15:33:32.310198',5,26,'Has anyone started working on the latest topics?'),(34,'2026-08-07 15:38:32.310198',5,27,'Yes, I just started yesterday. It\'s quite interesting!'),(32,'2026-08-07 15:43:32.310198',5,28,'Let me know if anyone needs help, we can study together.'),(35,'2026-08-07 15:28:32.540608',6,29,'Hey everyone! Glad to join the group.'),(36,'2026-08-07 15:33:32.540608',6,30,'Has anyone started working on the latest topics?'),(37,'2026-08-07 15:38:32.540608',6,31,'Yes, I just started yesterday. It\'s quite interesting!'),(35,'2026-08-07 15:43:32.540608',6,32,'Let me know if anyone needs help, we can study together.'),(38,'2026-08-07 15:28:32.774519',7,33,'Hey everyone! Glad to join the group.'),(39,'2026-08-07 15:33:32.774519',7,34,'Has anyone started working on the latest topics?'),(40,'2026-08-07 15:38:32.774519',7,35,'Yes, I just started yesterday. It\'s quite interesting!'),(38,'2026-08-07 15:43:32.774519',7,36,'Let me know if anyone needs help, we can study together.'),(41,'2026-08-07 15:28:33.017065',8,37,'Hey everyone! Glad to join the group.'),(42,'2026-08-07 15:33:33.017065',8,38,'Has anyone started working on the latest topics?'),(43,'2026-08-07 15:38:33.017065',8,39,'Yes, I just started yesterday. It\'s quite interesting!'),(41,'2026-08-07 15:43:33.017065',8,40,'Let me know if anyone needs help, we can study together.');
/*!40000 ALTER TABLE `group_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `expiry_date` datetime(6) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `token` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_la2ts67g4oh2sreayswhox1i6` (`user_id`),
  UNIQUE KEY `UK_71lqwbwtklmljk3qlsugr1mig` (`token`),
  CONSTRAINT `FKk3ndxg5xp6v7wd4gjyusp15gq` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_tags`
--

DROP TABLE IF EXISTS `question_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_tags` (
  `question_id` bigint NOT NULL,
  `tag_id` bigint NOT NULL,
  PRIMARY KEY (`question_id`,`tag_id`),
  KEY `FK4s4qdqgvc98lx55s3hu9vqam7` (`tag_id`),
  CONSTRAINT `FK4s4qdqgvc98lx55s3hu9vqam7` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`),
  CONSTRAINT `FKee6kn1hbh2ka2qj64bv30esbw` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_tags`
--

LOCK TABLES `question_tags` WRITE;
/*!40000 ALTER TABLE `question_tags` DISABLE KEYS */;
INSERT INTO `question_tags` VALUES (1,75),(4,75),(7,75),(10,75),(13,75),(16,75),(19,75),(21,118),(22,118),(27,119),(28,119),(25,155),(26,155),(2,156),(5,156),(8,156),(11,156),(14,156),(17,156),(20,156),(3,171),(6,171),(9,171),(12,171),(15,171),(18,171),(23,172),(24,172),(29,173),(30,173);
/*!40000 ALTER TABLE `question_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_votes`
--

DROP TABLE IF EXISTS `question_votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_votes` (
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `question_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `vote_type` enum('UP','DOWN') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKfyxdvjb78edr06d72f9m2j35g` (`question_id`,`user_id`),
  KEY `FK9v02son0rrjww1wr11x5gl68u` (`user_id`),
  CONSTRAINT `FK1xd1qk3vvt048vghi893xcpo9` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
  CONSTRAINT `FK9v02son0rrjww1wr11x5gl68u` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_votes`
--

LOCK TABLES `question_votes` WRITE;
/*!40000 ALTER TABLE `question_votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `question_votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `vote_count` int NOT NULL,
  `accepted_answer_id` bigint DEFAULT NULL,
  `author_id` bigint NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `title` varchar(150) NOT NULL,
  `body` varchar(5000) NOT NULL,
  `status` enum('SOLVED','UNSOLVED') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6q970e2fepgplb7gw39snf6rh` (`accepted_answer_id`),
  KEY `FKii8pqtr2qjv47ht06bg8vtl9n` (`author_id`),
  CONSTRAINT `FK6q970e2fepgplb7gw39snf6rh` FOREIGN KEY (`accepted_answer_id`) REFERENCES `answers` (`id`),
  CONSTRAINT `FKii8pqtr2qjv47ht06bg8vtl9n` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (2,NULL,9,'2026-06-29 07:30:00.000000',1,'2026-08-07 15:57:59.178686','What is the best way to handle vanishing gradients in deep RNNs?','I\'ve been studying this topic but I\'m struggling to fully grasp the concepts. What is the best way to handle vanishing gradients in deep RNNs?','UNSOLVED'),(18,NULL,10,'2026-08-03 09:30:00.000000',2,'2026-08-07 15:57:59.256404','How do ACE inhibitors actually lower blood pressure?','Could someone clarify this for me? How do ACE inhibitors actually lower blood pressure?','UNSOLVED'),(0,NULL,11,'2026-07-16 23:30:00.000000',3,'2026-08-07 15:57:59.332126','What is the practical application of topology in computer science?','I have an upcoming exam and need help with this: What is the practical application of topology in computer science?','UNSOLVED'),(0,NULL,12,'2026-06-02 22:30:00.000000',4,'2026-08-07 15:57:59.405040','What are the ethical implications of using facial recognition AI?','I\'ve been studying this topic but I\'m struggling to fully grasp the concepts. What are the ethical implications of using facial recognition AI?','UNSOLVED'),(12,NULL,13,'2026-06-10 01:30:00.000000',5,'2026-08-07 15:57:59.480128','How does the blood-brain barrier selectively transport nutrients?','Could someone clarify this for me? How does the blood-brain barrier selectively transport nutrients?','UNSOLVED'),(0,NULL,14,'2026-08-06 16:30:00.000000',6,'2026-08-07 15:57:59.557484','What is the significance of eigenvalues in differential equations?','I have an upcoming exam and need help with this: What is the significance of eigenvalues in differential equations?','UNSOLVED'),(6,NULL,15,'2026-06-20 08:30:00.000000',7,'2026-08-07 15:57:59.633806','What\'s the difference between L1 and L2 regularization mathematically?','I\'ve been studying this topic but I\'m struggling to fully grasp the concepts. What\'s the difference between L1 and L2 regularization mathematically?','UNSOLVED'),(11,NULL,16,'2026-07-15 12:30:00.000000',8,'2026-08-07 15:57:59.710831','What are the latest advancements in targeted mRNA therapies?','Could someone clarify this for me? What are the latest advancements in targeted mRNA therapies?','UNSOLVED'),(4,NULL,17,'2026-07-31 05:30:00.000000',9,'2026-08-07 15:57:59.782971','What is the practical application of topology in computer science?','I have an upcoming exam and need help with this: What is the practical application of topology in computer science?','UNSOLVED'),(10,NULL,18,'2026-06-16 16:30:00.000000',10,'2026-08-07 15:57:59.860091','How does Adam optimizer differ from RMSprop in practice?','I\'ve been studying this topic but I\'m struggling to fully grasp the concepts. How does Adam optimizer differ from RMSprop in practice?','UNSOLVED'),(0,NULL,19,'2026-07-20 17:30:00.000000',11,'2026-08-07 15:57:59.936718','What is the physiological mechanism behind insulin resistance?','Could someone clarify this for me? What is the physiological mechanism behind insulin resistance?','UNSOLVED'),(8,NULL,20,'2026-07-16 08:30:00.000000',12,'2026-08-07 15:58:00.017854','What is the significance of eigenvalues in differential equations?','I have an upcoming exam and need help with this: What is the significance of eigenvalues in differential equations?','UNSOLVED'),(12,NULL,21,'2026-06-09 15:30:00.000000',13,'2026-08-07 15:58:00.098381','How do graph neural networks aggregate node features?','I\'ve been studying this topic but I\'m struggling to fully grasp the concepts. How do graph neural networks aggregate node features?','UNSOLVED'),(5,NULL,22,'2026-07-31 04:30:00.000000',14,'2026-08-07 15:58:00.178689','Are there any viable alternatives to antibiotics for resistant strains?','Could someone clarify this for me? Are there any viable alternatives to antibiotics for resistant strains?','UNSOLVED'),(5,NULL,23,'2026-06-09 22:30:00.000000',15,'2026-08-07 15:58:00.250654','What is the practical application of topology in computer science?','I have an upcoming exam and need help with this: What is the practical application of topology in computer science?','UNSOLVED'),(4,NULL,24,'2026-06-07 21:30:00.000000',16,'2026-08-07 15:58:00.323931','Can someone explain the self-attention mechanism in Transformers?','I\'ve been studying this topic but I\'m struggling to fully grasp the concepts. Can someone explain the self-attention mechanism in Transformers?','UNSOLVED'),(14,NULL,25,'2026-08-04 14:30:00.000000',17,'2026-08-07 15:58:00.400562','Can CRISPR-Cas9 be used to treat somatic mutations effectively?','Could someone clarify this for me? Can CRISPR-Cas9 be used to treat somatic mutations effectively?','UNSOLVED'),(9,NULL,26,'2026-06-17 10:30:00.000000',18,'2026-08-07 15:58:00.471578','What is the significance of eigenvalues in differential equations?','I have an upcoming exam and need help with this: What is the significance of eigenvalues in differential equations?','UNSOLVED'),(17,NULL,27,'2026-08-03 01:30:00.000000',19,'2026-08-07 15:58:00.542897','Is fine-tuning BERT always better than training a smaller model from scratch?','I\'ve been studying this topic but I\'m struggling to fully grasp the concepts. Is fine-tuning BERT always better than training a smaller model from scratch?','UNSOLVED'),(15,NULL,28,'2026-06-22 21:30:00.000000',20,'2026-08-07 15:58:00.613977','What role do T-cells play in autoimmune diseases?','Could someone clarify this for me? What role do T-cells play in autoimmune diseases?','UNSOLVED'),(5,NULL,29,'2026-08-06 15:58:32.068226',21,'2026-08-07 15:58:32.073024','How do I get started with World History Enthusiasts?','I am new to this subject and would love some recommendations on where to start.','UNSOLVED'),(8,NULL,31,'2026-08-07 10:58:32.068226',22,'2026-08-07 15:58:32.075535','What are the best resources for History?','Can anyone share their favorite books or courses for this topic?','UNSOLVED'),(5,NULL,32,'2026-08-06 15:58:32.310198',23,'2026-08-07 15:58:32.314696','How do I get started with JavaScript Mastery?','I am new to this subject and would love some recommendations on where to start.','UNSOLVED'),(8,NULL,34,'2026-08-07 10:58:32.310198',24,'2026-08-07 15:58:32.316512','What are the best resources for Computer Science?','Can anyone share their favorite books or courses for this topic?','UNSOLVED'),(5,NULL,35,'2026-08-06 15:58:32.540608',25,'2026-08-07 15:58:32.544526','How do I get started with Organic Chemistry Help?','I am new to this subject and would love some recommendations on where to start.','UNSOLVED'),(8,NULL,37,'2026-08-07 10:58:32.540608',26,'2026-08-07 15:58:32.546992','What are the best resources for Chemistry?','Can anyone share their favorite books or courses for this topic?','UNSOLVED'),(5,NULL,38,'2026-08-06 15:58:32.774519',27,'2026-08-07 15:58:32.779235','How do I get started with Classic Literature Book Club?','I am new to this subject and would love some recommendations on where to start.','UNSOLVED'),(8,NULL,40,'2026-08-07 10:58:32.774519',28,'2026-08-07 15:58:32.780881','What are the best resources for Literature?','Can anyone share their favorite books or courses for this topic?','UNSOLVED'),(5,NULL,41,'2026-08-06 15:58:33.017065',29,'2026-08-07 15:58:33.021807','How do I get started with Anatomy and Physiology?','I am new to this subject and would love some recommendations on where to start.','UNSOLVED'),(8,NULL,43,'2026-08-07 10:58:33.017065',30,'2026-08-07 15:58:33.023022','What are the best resources for Medicine?','Can anyone share their favorite books or courses for this topic?','UNSOLVED');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_group_members`
--

DROP TABLE IF EXISTS `study_group_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_group_members` (
  `group_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`group_id`,`user_id`),
  KEY `FKp14cu9oul76syxd13ndqgaafg` (`user_id`),
  CONSTRAINT `FKab099fsjqh2wpfc765w7tqq6l` FOREIGN KEY (`group_id`) REFERENCES `study_groups` (`id`),
  CONSTRAINT `FKp14cu9oul76syxd13ndqgaafg` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_group_members`
--

LOCK TABLES `study_group_members` WRITE;
/*!40000 ALTER TABLE `study_group_members` DISABLE KEYS */;
INSERT INTO `study_group_members` VALUES (1,9),(2,9),(3,9),(4,9),(5,9),(6,9),(7,9),(8,9),(2,10),(3,11),(1,12),(2,13),(3,14),(1,15),(2,16),(3,17),(1,18),(2,19),(3,20),(1,21),(2,22),(3,23),(1,24),(2,25),(3,26),(1,27),(2,28),(4,29),(4,30),(4,31),(5,32),(5,33),(5,34),(6,35),(6,36),(6,37),(7,38),(7,39),(7,40),(8,41),(8,42),(8,43);
/*!40000 ALTER TABLE `study_group_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_groups`
--

DROP TABLE IF EXISTS `study_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_groups` (
  `created_at` datetime(6) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `owner_id` bigint NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_27ty2g15yfxifu5wc49j7goid` (`name`),
  KEY `FKkcukq4ecghm2o1f4wht1ntujn` (`owner_id`),
  CONSTRAINT `FKkcukq4ecghm2o1f4wht1ntujn` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_groups`
--

LOCK TABLES `study_groups` WRITE;
/*!40000 ALTER TABLE `study_groups` DISABLE KEYS */;
INSERT INTO `study_groups` VALUES ('2026-08-07 15:57:59.084649',1,1,'A group for discussing deep learning, neural networks, and AI research.','Computer Science','Advanced Machine Learning'),('2026-08-07 15:57:59.086755',2,1,'Preparation for the upcoming pathophysiology exams. Share notes and quiz each other.','Medicine','Clinical Pathophysiology Prep'),('2026-08-07 15:57:59.087865',3,1,'Struggling with derivatives? Let\'s help each other out in Calculus.','Mathematics','Calculus 101 Support'),('2026-08-07 15:58:31.857291',4,9,'Discussing world events and historical figures.','History','World History Enthusiasts'),('2026-08-07 15:58:32.095295',5,9,'A group for mastering modern JS and frameworks.','Computer Science','JavaScript Mastery'),('2026-08-07 15:58:32.333014',6,9,'Let\'s crack the code of organic compounds together.','Chemistry','Organic Chemistry Help'),('2026-08-07 15:58:32.563231',7,9,'Reading and analyzing classic novels.','Literature','Classic Literature Book Club'),('2026-08-07 15:58:32.795582',8,9,'For medical students looking to ace their A&P exams.','Medicine','Anatomy and Physiology');
/*!40000 ALTER TABLE `study_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_settings`
--

DROP TABLE IF EXISTS `system_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_settings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(500) DEFAULT NULL,
  `setting_key` varchar(255) NOT NULL,
  `setting_value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_nm18l4pyovtvd8y3b3x0l2y64` (`setting_key`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_settings`
--

LOCK TABLES `system_settings` WRITE;
/*!40000 ALTER TABLE `system_settings` DISABLE KEYS */;
INSERT INTO `system_settings` VALUES (1,'Enable to put the site into maintenance mode.','MAINTENANCE_MODE','false'),(2,'Allow new users to register an account.','ALLOW_PUBLIC_REGISTRATION','true'),(3,'Maximum allowed file upload size in MB.','MAX_UPLOAD_SIZE_MB','50'),(4,'Email address for user support inquiries.','SUPPORT_EMAIL','support@eduscopeglobal.com');
/*!40000 ALTER TABLE `system_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(50) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_t48xdq560gs3gap9g7jg36kgc` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'Programming & Tech','javascript'),(2,'Programming & Tech','python'),(3,'Programming & Tech','java'),(4,'Programming & Tech','c#'),(5,'Programming & Tech','php'),(6,'Programming & Tech','c++'),(7,'Programming & Tech','c'),(8,'Programming & Tech','typescript'),(9,'Programming & Tech','ruby'),(10,'Programming & Tech','swift'),(11,'Programming & Tech','kotlin'),(12,'Programming & Tech','go'),(13,'Programming & Tech','rust'),(14,'Programming & Tech','dart'),(15,'Programming & Tech','scala'),(16,'Programming & Tech','perl'),(17,'Programming & Tech','haskell'),(18,'Programming & Tech','lua'),(19,'Programming & Tech','r'),(20,'Programming & Tech','matlab'),(21,'Programming & Tech','assembly'),(22,'Programming & Tech','shell'),(23,'Programming & Tech','powershell'),(24,'Programming & Tech','react'),(25,'Programming & Tech','angular'),(26,'Programming & Tech','vue'),(27,'Programming & Tech','svelte'),(28,'Programming & Tech','next.js'),(29,'Programming & Tech','nuxt.js'),(30,'Programming & Tech','gatsby'),(31,'Programming & Tech','html'),(32,'Programming & Tech','css'),(33,'Programming & Tech','sass'),(34,'Programming & Tech','less'),(35,'Programming & Tech','tailwind'),(36,'Programming & Tech','bootstrap'),(37,'Programming & Tech','node.js'),(38,'Programming & Tech','express'),(39,'Programming & Tech','django'),(40,'Programming & Tech','flask'),(41,'Programming & Tech','spring-boot'),(42,'Programming & Tech','laravel'),(43,'Programming & Tech','asp.net'),(44,'Programming & Tech','ruby-on-rails'),(45,'Programming & Tech','fastapi'),(46,'Programming & Tech','sql'),(47,'Programming & Tech','mysql'),(48,'Programming & Tech','postgresql'),(49,'Programming & Tech','sqlite'),(50,'Programming & Tech','oracle'),(51,'Programming & Tech','sql-server'),(52,'Programming & Tech','mongodb'),(53,'Programming & Tech','redis'),(54,'Programming & Tech','cassandra'),(55,'Programming & Tech','dynamodb'),(56,'Programming & Tech','neo4j'),(57,'Programming & Tech','firebase'),(58,'Programming & Tech','supabase'),(59,'Programming & Tech','elasticsearch'),(60,'Programming & Tech','aws'),(61,'Programming & Tech','azure'),(62,'Programming & Tech','gcp'),(63,'Programming & Tech','docker'),(64,'Programming & Tech','kubernetes'),(65,'Programming & Tech','terraform'),(66,'Programming & Tech','ansible'),(67,'Programming & Tech','jenkins'),(68,'Programming & Tech','github-actions'),(69,'Programming & Tech','gitlab-ci'),(70,'Programming & Tech','linux'),(71,'Programming & Tech','unix'),(72,'Programming & Tech','bash'),(73,'Programming & Tech','nginx'),(74,'Programming & Tech','apache'),(75,'Programming & Tech','machine-learning'),(76,'Programming & Tech','deep-learning'),(77,'Programming & Tech','artificial-intelligence'),(78,'Programming & Tech','neural-networks'),(79,'Programming & Tech','nlp'),(80,'Programming & Tech','computer-vision'),(81,'Programming & Tech','pandas'),(82,'Programming & Tech','numpy'),(83,'Programming & Tech','scikit-learn'),(84,'Programming & Tech','tensorflow'),(85,'Programming & Tech','pytorch'),(86,'Programming & Tech','keras'),(87,'Programming & Tech','data-analysis'),(88,'Programming & Tech','big-data'),(89,'Programming & Tech','hadoop'),(90,'Programming & Tech','spark'),(91,'Programming & Tech','algorithms'),(92,'Programming & Tech','data-structures'),(93,'Programming & Tech','operating-systems'),(94,'Programming & Tech','networking'),(95,'Programming & Tech','cryptography'),(96,'Programming & Tech','security'),(97,'Programming & Tech','distributed-systems'),(98,'Programming & Tech','software-engineering'),(99,'Programming & Tech','design-patterns'),(100,'Programming & Tech','agile'),(101,'Programming & Tech','scrum'),(102,'Programming & Tech','git'),(103,'Programming & Tech','github'),(104,'Programming & Tech','bitbucket'),(105,'Business & Economics','microeconomics'),(106,'Business & Economics','macroeconomics'),(107,'Business & Economics','accounting'),(108,'Business & Economics','marketing'),(109,'Business & Economics','management'),(110,'Business & Economics','finance'),(111,'Business & Economics','entrepreneurship'),(112,'Business & Economics','corporate-finance'),(113,'Business & Economics','investment'),(114,'Business & Economics','business-analytics'),(115,'Business & Economics','supply-chain'),(116,'Business & Economics','human-resources'),(117,'Business & Economics','strategy'),(118,'Arts & Humanities','history'),(119,'Arts & Humanities','literature'),(120,'Arts & Humanities','philosophy'),(121,'Arts & Humanities','sociology'),(122,'Arts & Humanities','psychology'),(123,'Arts & Humanities','art-history'),(124,'Arts & Humanities','linguistics'),(125,'Arts & Humanities','political-science'),(126,'Arts & Humanities','anthropology'),(127,'Arts & Humanities','ethics'),(128,'Arts & Humanities','theology'),(129,'Arts & Humanities','music-theory'),(130,'Arts & Humanities','creative-writing'),(131,'Arts & Humanities','media-studies'),(132,'Arts & Humanities','geography'),(133,'Medicine & Health','anatomy'),(134,'Medicine & Health','pharmacology'),(135,'Medicine & Health','physiology'),(136,'Medicine & Health','pathology'),(137,'Medicine & Health','clinical-skills'),(138,'Medicine & Health','public-health'),(139,'Medicine & Health','nursing'),(140,'Medicine & Health','dentistry'),(141,'Medicine & Health','neuroscience'),(142,'Medicine & Health','immunology'),(143,'Medicine & Health','microbiology'),(144,'Medicine & Health','epidemiology'),(145,'Medicine & Health','pediatrics'),(146,'Medicine & Health','surgery'),(147,'Medicine & Health','psychiatry'),(148,'Medicine & Health','cardiology'),(149,'Engineering & Science','thermodynamics'),(150,'Engineering & Science','fluid-mechanics'),(151,'Engineering & Science','circuit-analysis'),(152,'Engineering & Science','calculus'),(153,'Engineering & Science','linear-algebra'),(154,'Engineering & Science','physics'),(155,'Engineering & Science','chemistry'),(156,'Engineering & Science','biology'),(157,'Engineering & Science','genetics'),(158,'Engineering & Science','statistics'),(159,'Engineering & Science','discrete-math'),(160,'Engineering & Science','differential-equations'),(161,'Engineering & Science','materials-science'),(162,'Engineering & Science','robotics'),(163,'Engineering & Science','aerospace'),(164,'Engineering & Science','civil-engineering'),(165,'Engineering & Science','mechanical-engineering'),(166,'Engineering & Science','astronomy'),(167,'Engineering & Science','environmental-science'),(168,'Engineering & Science','quantum-mechanics'),(169,'Engineering & Science','organic-chemistry'),(170,'Engineering & Science','biochemistry'),(171,'Mathematics','mathematics'),(172,'Computer Science','computer-science'),(173,'Medicine','medicine');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `reputation_score` int NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `username` varchar(30) NOT NULL,
  `bio` varchar(300) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('STUDENT','LEADER','ADMIN') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_r43af9ap4edm43mmtq01oddj6` (`username`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1000,'2026-08-07 15:57:58.023043',1,'2026-08-07 15:57:58.023043','Dulanjan','Super Administrator','https://ui-avatars.com/api/?name=Dulanjan&background=0063ce&color=fff','dulanjan.connect@gmail.com','$2a$10$W2AJsIJVhbmc/okYbQRfw.V5KG3RulLWymmIfm/IsoEPEmHKlRPtO','ADMIN'),(0,'2026-08-07 15:57:58.117862',2,'2026-08-07 15:57:58.117862','admin','System Administrator','https://ui-avatars.com/api/?name=Admin&background=0063ce&color=fff','admin@eduscope.com','$2a$10$l5WIUcHARYtvL/rgeBUSf.6lxieJodBte24z9DwPDfbhJDAey701m','ADMIN'),(1540,'2026-08-07 15:57:58.513999',3,'2026-08-07 15:57:58.513999','Dr. Sarah Chen','Professor of Computer Science specializing in AI and Machine Learning.','https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&q=80','sarah.chen@university.edu','$2a$10$hSv8eSsEmbwVU2ro7mX0SukmTus2cUVSmZRc0afwZK8Pmokq803B6','LEADER'),(850,'2026-08-07 15:57:58.516515',4,'2026-08-07 15:57:58.516515','Prof. M. Johnson','Department Head of Applied Mathematics. Passionate about helping students understand calculus.','https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&q=80','mjohnson@institute.org','$2a$10$HzTGOGW8hn9VjW/eHfETD./RQNiL399hc6bEpJwIM5vkTTe.7u2x6','LEADER'),(430,'2026-08-07 15:57:58.518825',5,'2026-08-07 15:57:58.518825','Elena Rodriguez, PhD','Postdoctoral researcher in Biochemistry. Happy to answer questions about molecular biology.','https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&q=80','erodriguez@research.edu','$2a$10$I805ZFRGpAeO9H3w5DeyLeu7JKVWwyxA.nqIkLSpZ1UAZMA8gvIOS','STUDENT'),(210,'2026-08-07 15:57:58.520491',6,'2026-08-07 15:57:58.520491','Dr. Akira Tanaka','Clinical Instructor and practicing physician. Medical science enthusiast.','https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&q=80','atanaka@medschool.edu','$2a$10$31NZ6V9m3c8EFCvu/l4HUuobgw0tY66gofEwVrmhu3VmS7VqoVoRe','STUDENT'),(115,'2026-08-07 15:57:58.522272',7,'2026-08-07 15:57:58.522272','James Miller','Senior Software Engineer. Mentoring the next generation of developers.','https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80','jmiller@tech.com','$2a$10$3Nt8423Z7DZpgnZXLUxR/ejRb1ru8HpPyl1BXKQnf83jBUG//H7gG','STUDENT'),(65,'2026-08-07 15:57:58.523968',8,'2026-08-07 15:57:58.523968','Dr. Anita Patel','Physics Lecturer. Let\'s solve complex problems together!','https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&q=80','apatel@science.edu','$2a$10$W..cq.QVZOY8JFc6vSqvH.KeZDxF5Lf.LDQXOy5B8vCYUBC2S2eji','STUDENT'),(7,'2026-08-07 15:57:59.170723',9,'2026-08-07 15:57:59.170723','Shenal Kavindu','Student at EduScope.','https://ui-avatars.com/api/?name=Shenal+Kavindu&background=random','shenalkavindu@gmail.com','$2a$10$8/LPVvH4VikD.5EGIr.WeuOzpnXtPxsCN0.20GMiMOy0dZsyzN7DO','STUDENT'),(44,'2026-08-07 15:57:59.253534',10,'2026-08-07 15:57:59.253534','Yenuli Himasha','Student at EduScope.','https://ui-avatars.com/api/?name=Yenuli+Himasha&background=random','yenulihimasha@gmail.com','$2a$10$cVQNJ7XtmjpToTeGdQ2jdex2ow9VSztPw6MoKqCTJti9.UDkOHtpe','STUDENT'),(72,'2026-08-07 15:57:59.326911',11,'2026-08-07 15:57:59.326911','Nethmi Nisansala','Student at EduScope.','https://ui-avatars.com/api/?name=Nethmi+Nisansala&background=random','nethminisansala@gmail.com','$2a$10$Khv6h1YRCDKXPg6VSPdIqefiCsVxN4oo4rxJu3K5ZYlZlr4GZYmJG','STUDENT'),(43,'2026-08-07 15:57:59.402127',12,'2026-08-07 15:57:59.402127','Kaveesha Dilshan','Student at EduScope.','https://ui-avatars.com/api/?name=Kaveesha+Dilshan&background=random','kaveeshadilshan@gmail.com','$2a$10$hRATEyrbsbvrkcSqTAuPjusI8fTdw60.ZemNLVKUtV9fJH6zXzNkO','STUDENT'),(9,'2026-08-07 15:57:59.477064',13,'2026-08-07 15:57:59.477064','Malshan Fernando','Student at EduScope.','https://ui-avatars.com/api/?name=Malshan+Fernando&background=random','malshanfernando@gmail.com','$2a$10$T5UNr3lFTPWJ9I3bAyIYNeYC9uREpLS69/r7GOB9mKEKGh6nclbLi','STUDENT'),(2,'2026-08-07 15:57:59.553557',14,'2026-08-07 15:57:59.554559','Dinuka Perera','Student at EduScope.','https://ui-avatars.com/api/?name=Dinuka+Perera&background=random','dinukaperera@gmail.com','$2a$10$2x1CjnyI7QShAceXXK.q3efg6QIZVbj7m/t.LJSCNEkH/RqyUTmaS','STUDENT'),(71,'2026-08-07 15:57:59.629957',15,'2026-08-07 15:57:59.629957','Sachini Silva','Student at EduScope.','https://ui-avatars.com/api/?name=Sachini+Silva&background=random','sachinisilva@gmail.com','$2a$10$EUsyPJC8PomOmxG73TBODOnKX/W1iub8t9aAd5WZkzmDgA8.feMCC','STUDENT'),(48,'2026-08-07 15:57:59.708036',16,'2026-08-07 15:57:59.708036','Tharindu Kumara','Student at EduScope.','https://ui-avatars.com/api/?name=Tharindu+Kumara&background=random','tharindukumara@gmail.com','$2a$10$eDIEFPp9omjiXJidcBfvU.rs/za522gdSDwRXc2T09h7TLDauqCae','STUDENT'),(91,'2026-08-07 15:57:59.779992',17,'2026-08-07 15:57:59.779992','Kasun Jayasooriya','Student at EduScope.','https://ui-avatars.com/api/?name=Kasun+Jayasooriya&background=random','kasunjayasooriya@gmail.com','$2a$10$n2PWDahfjfbbZakSz.wkr.gV2DFJJvSZcsq.82uIECxazxpZE3.o2','STUDENT'),(86,'2026-08-07 15:57:59.857026',18,'2026-08-07 15:57:59.857026','Piumi Rajapaksha','Student at EduScope.','https://ui-avatars.com/api/?name=Piumi+Rajapaksha&background=random','piumirajapaksha@gmail.com','$2a$10$YPsX/RuAq/sO3.s9CbX3sOrhXkJnDHDfzY8inrD9aZdjs7IHMo6Ky','STUDENT'),(72,'2026-08-07 15:57:59.934526',19,'2026-08-07 15:57:59.934526','Dulmini Gunathilaka','Student at EduScope.','https://ui-avatars.com/api/?name=Dulmini+Gunathilaka&background=random','dulminigunathilaka@gmail.com','$2a$10$p1tTLyE9Gdk2woG5cukCC.O76HaCu3NH4GCwrOsvrUFQODCwfBO52','STUDENT'),(79,'2026-08-07 15:58:00.012660',20,'2026-08-07 15:58:00.013660','Chathura Bandara','Student at EduScope.','https://ui-avatars.com/api/?name=Chathura+Bandara&background=random','chathurabandara@gmail.com','$2a$10$MYuoQfjrasd/m5u7QRzDcuLdQeorhcHJxKkoUicfJR42/J0Clx25K','STUDENT'),(7,'2026-08-07 15:58:00.094787',21,'2026-08-07 15:58:00.094787','Sandun Senanayake','Student at EduScope.','https://ui-avatars.com/api/?name=Sandun+Senanayake&background=random','sandunsenanayake@gmail.com','$2a$10$6Eq.9II/.afBbBZTTf2H2.K07XRCzVNg6lV3MPNs/MHRIlgVI3jCW','STUDENT'),(7,'2026-08-07 15:58:00.175624',22,'2026-08-07 15:58:00.175624','Nishantha Rathnayake','Student at EduScope.','https://ui-avatars.com/api/?name=Nishantha+Rathnayake&background=random','nishantharathnayake@gmail.com','$2a$10$0LHCuH0gfJJfCapFLH5l2enzR1lzn8NySGzsJPA/Go7V772Z5gWOS','STUDENT'),(85,'2026-08-07 15:58:00.247328',23,'2026-08-07 15:58:00.247328','Hasini Dissanayake','Student at EduScope.','https://ui-avatars.com/api/?name=Hasini+Dissanayake&background=random','hasinidissanayake@gmail.com','$2a$10$dVm0RcTkWCT6e7o3hlqYL.4KhM5xv0uN8OVR9kLIkVFG6tJcmzyLG','STUDENT'),(48,'2026-08-07 15:58:00.320821',24,'2026-08-07 15:58:00.320821','Isuru Wijerathne','Student at EduScope.','https://ui-avatars.com/api/?name=Isuru+Wijerathne&background=random','isuruwijerathne@gmail.com','$2a$10$HOAzbntmpO5UV31CpRDCTOABCH4UwNPJMBS8LOHALsJpKXmOlpCKy','STUDENT'),(98,'2026-08-07 15:58:00.397936',25,'2026-08-07 15:58:00.397936','Supun Samaranayake','Student at EduScope.','https://ui-avatars.com/api/?name=Supun+Samaranayake&background=random','supunsamaranayake@gmail.com','$2a$10$Pw6JLIEH6F7Xx.AnMq86P.O1MPPG6iuOTwiHn.e6aoylNVtma9b4m','STUDENT'),(59,'2026-08-07 15:58:00.467559',26,'2026-08-07 15:58:00.467559','Chamara Jayasekara','Student at EduScope.','https://ui-avatars.com/api/?name=Chamara+Jayasekara&background=random','chamarajayasekara@gmail.com','$2a$10$CyaO0Ii7myVAJYEJzOBUBO2PGWlNYAnucjTtM3Ml1DYP/y8tiLZtK','STUDENT'),(13,'2026-08-07 15:58:00.540364',27,'2026-08-07 15:58:00.540364','Nuwan Ranasinghe','Student at EduScope.','https://ui-avatars.com/api/?name=Nuwan+Ranasinghe&background=random','nuwanranasinghe@gmail.com','$2a$10$UXDT1Jfcq.AWkuSok/X05uBkZ4uocgcuknK7I3GMpEYPS.cQN3Yl2','STUDENT'),(71,'2026-08-07 15:58:00.610812',28,'2026-08-07 15:58:00.610812','Rumesh Weerasinghe','Student at EduScope.','https://ui-avatars.com/api/?name=Rumesh+Weerasinghe&background=random','rumeshweerasinghe@gmail.com','$2a$10$ueiBvN5b9ERypAP2vRCnI.1UHKZEvFmG.vFHkg4Bqudh4PjGfZZb6','STUDENT'),(10,'2026-08-07 15:58:31.925840',29,'2026-08-07 15:58:31.925840','Charlie328','Mock student for World History Enthusiasts','https://ui-avatars.com/api/?name=Charlie328&background=random','charlie328@mock.com','$2a$10$SJxWuk5jlYIeRzuvjg0Q5uL3DxzdRImm8WFv77MELJqFE19c8XanK','STUDENT'),(10,'2026-08-07 15:58:31.996407',30,'2026-08-07 15:58:31.996407','Eve365','Mock student for World History Enthusiasts','https://ui-avatars.com/api/?name=Eve365&background=random','eve365@mock.com','$2a$10$S9w9fCr17LALqN9ONjg1Pe1W3X8/d8XQOQilloDMVtaAQKgKYMQgK','STUDENT'),(10,'2026-08-07 15:58:32.066642',31,'2026-08-07 15:58:32.066642','Bob408','Mock student for World History Enthusiasts','https://ui-avatars.com/api/?name=Bob408&background=random','bob408@mock.com','$2a$10$Qk41eZAF5zYD.7EhpH8kpOAff6YLtt7GSVEJFxfGGN97AvLrtZiam','STUDENT'),(10,'2026-08-07 15:58:32.164840',32,'2026-08-07 15:58:32.164840','Bob41','Mock student for JavaScript Mastery','https://ui-avatars.com/api/?name=Bob41&background=random','bob41@mock.com','$2a$10$9vY9X3JcGZlw11Vv4M3ktenRn7DOpYMQTBIpJJZh1BUMnmxM3ITyO','STUDENT'),(10,'2026-08-07 15:58:32.238250',33,'2026-08-07 15:58:32.238250','Eve577','Mock student for JavaScript Mastery','https://ui-avatars.com/api/?name=Eve577&background=random','eve577@mock.com','$2a$10$b/hKEMf.X6wkbHPR3/u2DOxplQF6U9deQCYdAcL9rSy7mjdiOihBK','STUDENT'),(10,'2026-08-07 15:58:32.309199',34,'2026-08-07 15:58:32.309199','Charlie29','Mock student for JavaScript Mastery','https://ui-avatars.com/api/?name=Charlie29&background=random','charlie29@mock.com','$2a$10$Uh18EdKbEm6M9PVdjDsgFeT0hVDIPpwBBeiT2TuN7mb.P49Q2gyjm','STUDENT'),(10,'2026-08-07 15:58:32.400516',35,'2026-08-07 15:58:32.400516','Alice75','Mock student for Organic Chemistry Help','https://ui-avatars.com/api/?name=Alice75&background=random','alice75@mock.com','$2a$10$fSIJeHORO38p92mzD1q9CesBiKJL8J5pJzSjuBXCxnIxzVHVQMQQO','STUDENT'),(10,'2026-08-07 15:58:32.466854',36,'2026-08-07 15:58:32.466854','Eve412','Mock student for Organic Chemistry Help','https://ui-avatars.com/api/?name=Eve412&background=random','eve412@mock.com','$2a$10$pK.WmxfHleMKLFlseF9m4OxPaj.dTz.tUjHO7LcYeKl41d374L6jO','STUDENT'),(10,'2026-08-07 15:58:32.539267',37,'2026-08-07 15:58:32.539267','Charlie773','Mock student for Organic Chemistry Help','https://ui-avatars.com/api/?name=Charlie773&background=random','charlie773@mock.com','$2a$10$WO5eEsYMUsFhbTpj071aVOyOiozeYHbf4CUtwhbWwf9V1vF/bby4C','STUDENT'),(10,'2026-08-07 15:58:32.631681',38,'2026-08-07 15:58:32.631681','Alice310','Mock student for Classic Literature Book Club','https://ui-avatars.com/api/?name=Alice310&background=random','alice310@mock.com','$2a$10$QmgfThGyZspYi8aI7/rKZ.g0GVNSOMUqb5Ce0z.C/se5r2p85LiOK','STUDENT'),(10,'2026-08-07 15:58:32.703026',39,'2026-08-07 15:58:32.703026','Eve918','Mock student for Classic Literature Book Club','https://ui-avatars.com/api/?name=Eve918&background=random','eve918@mock.com','$2a$10$MCY1imRcRToDEMMcKQnQkuqms4s/2hoP6JKmVDW1LHenCS7IyuG6i','STUDENT'),(10,'2026-08-07 15:58:32.773091',40,'2026-08-07 15:58:32.773091','Eve783','Mock student for Classic Literature Book Club','https://ui-avatars.com/api/?name=Eve783&background=random','eve783@mock.com','$2a$10$QnQyiZW.3GIkNdN7p35zjuRSGq1ogB7LFJMOtKfjC7g9mHVVVJ7Yy','STUDENT'),(10,'2026-08-07 15:58:32.865954',41,'2026-08-07 15:58:32.865954','David698','Mock student for Anatomy and Physiology','https://ui-avatars.com/api/?name=David698&background=random','david698@mock.com','$2a$10$rX8AusrV2gRKefKAiL5ob.u87RQzuS02bMzInWoKbnKbns5WUVO6m','STUDENT'),(10,'2026-08-07 15:58:32.939154',42,'2026-08-07 15:58:32.939154','Eve610','Mock student for Anatomy and Physiology','https://ui-avatars.com/api/?name=Eve610&background=random','eve610@mock.com','$2a$10$6k5eT2RzGK60hsCPnkVc/Oh6PGvOOvZKPNxHwSiPeSLLlWaFmw3rG','STUDENT'),(10,'2026-08-07 15:58:33.016103',43,'2026-08-07 15:58:33.016103','Eve329','Mock student for Anatomy and Physiology','https://ui-avatars.com/api/?name=Eve329&background=random','eve329@mock.com','$2a$10$xdAsIGfwgQWk.A5y4aeYEO4y/fPsl0ca/jSIFiHGpH0EhweTb66cG','STUDENT');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votes`
--

DROP TABLE IF EXISTS `votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votes` (
  `answer_id` bigint NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `vote_type` enum('UP','DOWN') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKpesq6q4snka5vkr2ti30wdgg4` (`answer_id`,`user_id`),
  KEY `FKli4uj3ic2vypf5pialchj925e` (`user_id`),
  CONSTRAINT `FK153p8dvxvoas3c6kiwxjjxkrd` FOREIGN KEY (`answer_id`) REFERENCES `answers` (`id`),
  CONSTRAINT `FKli4uj3ic2vypf5pialchj925e` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votes`
--

LOCK TABLES `votes` WRITE;
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `waitlist_entries`
--

DROP TABLE IF EXISTS `waitlist_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `waitlist_entries` (
  `created_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waitlist_entries`
--

LOCK TABLES `waitlist_entries` WRITE;
/*!40000 ALTER TABLE `waitlist_entries` DISABLE KEYS */;
/*!40000 ALTER TABLE `waitlist_entries` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-11 14:25:27
