-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: health_fund_members
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `cityId` int NOT NULL AUTO_INCREMENT,
  `cityName` varchar(255) NOT NULL,
  PRIMARY KEY (`cityId`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Jerusalem'),(2,'Tel Aviv'),(3,'Haifa'),(4,'Rishon Lezion'),(5,'Holon'),(6,'Herzliya'),(7,'Beersheba'),(8,'Netanya'),(9,'Ashdod'),(10,'Petah Tikva'),(11,'Kiryat Shmona'),(12,'Kiryat Gat'),(13,'Kiryat Malakhi'),(14,'Kiryat Bialik'),(15,'Kiryat Ata'),(16,'Bat Yam'),(17,'Ofakim'),(18,'Ness Ziona'),(19,'Rehovot'),(20,'Beit Shemesh'),(21,'Hod HaSharon'),(22,'Kfar Saba'),(23,'Ramat Hasharon'),(24,'Nahariya');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `covidinfections`
--

DROP TABLE IF EXISTS `covidinfections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `covidinfections` (
  `infectionsId` int NOT NULL AUTO_INCREMENT,
  `memberId` int NOT NULL,
  `infectionDate` date NOT NULL,
  `recoveryDate` date NOT NULL,
  PRIMARY KEY (`infectionsId`),
  KEY `memberId` (`memberId`),
  CONSTRAINT `covidinfections_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `members` (`memberID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `covidinfections`
--

LOCK TABLES `covidinfections` WRITE;
/*!40000 ALTER TABLE `covidinfections` DISABLE KEYS */;
INSERT INTO `covidinfections` VALUES (1,213842594,'2020-03-02','2020-04-03'),(6,212317754,'2021-01-28','2021-02-27'),(7,212317754,'2021-01-28','2021-02-27'),(8,212317754,'2021-01-28','2021-02-27'),(9,212317754,'2021-01-28','2021-02-27'),(10,325399780,'2022-01-01','2022-02-01'),(11,29642600,'2021-02-18','2021-02-23');
/*!40000 ALTER TABLE `covidinfections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `covidvaccinations`
--

DROP TABLE IF EXISTS `covidvaccinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `covidvaccinations` (
  `vaccineID` int NOT NULL AUTO_INCREMENT,
  `memberId` int NOT NULL,
  `vaccinationDate` date NOT NULL,
  `manufacturerId` int NOT NULL,
  PRIMARY KEY (`vaccineID`),
  KEY `memberId` (`memberId`),
  KEY `manufacturerId` (`manufacturerId`),
  CONSTRAINT `covidvaccinations_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `members` (`memberID`),
  CONSTRAINT `covidvaccinations_ibfk_2` FOREIGN KEY (`manufacturerId`) REFERENCES `manufacturer` (`manufacturerId`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `covidvaccinations`
--

LOCK TABLES `covidvaccinations` WRITE;
/*!40000 ALTER TABLE `covidvaccinations` DISABLE KEYS */;
INSERT INTO `covidvaccinations` VALUES (1,213842594,'2021-06-30',4),(2,213842594,'2020-07-28',8),(7,314815184,'2020-07-06',3),(9,213842594,'2024-01-31',1),(11,213842594,'2020-03-10',3),(12,325399780,'2020-03-03',6),(13,319166849,'2020-03-06',4),(14,212317754,'2021-07-28',8),(15,212317754,'2021-12-21',3),(16,211533039,'2020-10-13',7),(17,211533039,'2021-03-02',2),(18,29642600,'2024-03-12',3),(19,29642600,'2021-03-16',8),(20,29642600,'2024-03-13',6);
/*!40000 ALTER TABLE `covidvaccinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manufacturer`
--

DROP TABLE IF EXISTS `manufacturer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manufacturer` (
  `manufacturerId` int NOT NULL AUTO_INCREMENT,
  `manufacturerName` varchar(255) NOT NULL,
  PRIMARY KEY (`manufacturerId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturer`
--

LOCK TABLES `manufacturer` WRITE;
/*!40000 ALTER TABLE `manufacturer` DISABLE KEYS */;
INSERT INTO `manufacturer` VALUES (1,'Pfizer'),(2,'Novavax'),(3,'Bharat Biotech'),(4,'Sinovac'),(5,'Sinopharm'),(6,'Moderna'),(7,'Johnson & Johnson'),(8,'AstraZeneca');
/*!40000 ALTER TABLE `manufacturer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `memberNumber` int NOT NULL AUTO_INCREMENT,
  `memberID` int NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `cityId` int NOT NULL,
  `birthDate` date NOT NULL,
  `phone` varchar(255) NOT NULL,
  `cellphone` varchar(255) NOT NULL,
  `imageSrc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`memberNumber`),
  KEY `cityId` (`cityId`),
  KEY `member_id_idx` (`memberID`),
  CONSTRAINT `members_ibfk_1` FOREIGN KEY (`cityId`) REFERENCES `cities` (`cityId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,213842594,'Hadasa','Taib','Ygal 31',1,'2003-06-20','025321127','0534156545',NULL),(2,27254572,'Noa','Taib','Ygal 32',1,'1974-03-11','025321127','0527688332','n'),(3,314815184,'Avi','Levi','Harotem 56',22,'1976-04-13','087767676','0541212343','n'),(4,325399780,'Rivka','Or','Eilat 101',19,'2003-01-05','025467898','0534567890',NULL),(5,319166849,'Yoav','Biton','Tlalim 45',17,'1970-02-13','036543211','0587654321',NULL),(6,212431068,'Gad','Klein','Zarchi 76',23,'1999-12-12','049876522','0521234567',NULL),(7,212317754,'Yael','Weiss','Bar Ilan 4',11,'2009-02-07','087654321','0556767677',NULL),(8,211533039,'Rut','Oren','Golda123',7,'1976-05-09','038888888','0523456782',NULL),(9,29642600,'Avraham','Ben Chaim','Givat Moshe 3',4,'2000-11-06','045676545','0586767676',NULL),(10,28436533,'Moshe','Levi','Balfur 65',3,'2011-06-01','025675675','0523456788',NULL);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-28 18:57:44
