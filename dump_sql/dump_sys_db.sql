-- MySQL dump 10.13  Distrib 8.0.11
--
-- Host: localhost    Database: sys_db
-- ------------------------------------------------------
-- Server version	8.0.11

 SET NAMES utf8mb4 ;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `department` (
  `departmentId` int(11) NOT NULL AUTO_INCREMENT,
  `departName` varchar(50) DEFAULT NULL,
  `departTip` varchar(1000) DEFAULT NULL,
  `departCode` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`departmentId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
INSERT INTO `department` VALUES (9,'HR','HR Department','0001'),(10,'Design','Design Department','0003'),(11,'Sales','Sales Department','0004'),(12,'Marketing','Marketing Department','0005'),(13,'Dev','Dev Department','0006'),(14,'Legal','Legal Department','0007'),(15,'Finance','Finance Department','0008'),(17,'EMEA','EMEA Department','0015');
UNLOCK TABLES;

--
-- Table structure for table `loginuser`
--

DROP TABLE IF EXISTS `loginuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `loginuser` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `departId` int(11) DEFAULT NULL,
  `groupId` int(11) DEFAULT NULL,
  `userTip` varchar(1000) DEFAULT NULL,
  `createTime` date DEFAULT NULL,
  `userCode` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `departId` (`departId`),
  KEY `groupId` (`groupId`),
  CONSTRAINT `loginuser_ibfk_1` FOREIGN KEY (`departId`) REFERENCES `department` (`departmentid`),
  CONSTRAINT `loginuser_ibfk_2` FOREIGN KEY (`groupId`) REFERENCES `usergroup` (`groupid`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `loginuser`
--

LOCK TABLES `loginuser` WRITE;
INSERT INTO `loginuser` VALUES (8,'John','9999',13,7,'Sales Dept',NULL,'9999'),(9,'Tom','8888',13,7,'Dev Dept',NULL,'8888'),(10,'Sally','7777',12,3,'Marketing Dept',NULL,'7777'),(11,'Kent','6666',11,5,'Legal Dept',NULL,'6666'),(25,'Ellen','5555',14,6,'Design Dept',NULL,'5555'),(26,'Don','3333',11,6,'EMEA',NULL,'3333'),(27,'daabon','2222',14,7,'',NULL,'2222');
UNLOCK TABLES;

--
-- Table structure for table `usergroup`
--

DROP TABLE IF EXISTS `usergroup`;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `usergroup` (
  `groupId` int(11) NOT NULL AUTO_INCREMENT,
  `groupName` varchar(50) DEFAULT NULL,
  `groupTip` varchar(1000) DEFAULT NULL,
  `groupPower` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`groupId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usergroup`
--

LOCK TABLES `usergroup` WRITE;
INSERT INTO `usergroup` VALUES (3,'Marketing',NULL,NULL),(4,'Marketing',NULL,NULL),(5,'Sales','promotion period 01-Apr to 15-Apr',NULL),(6,'Sales',NULL,NULL),(7,'Dev',NULL,'all'),(8,NULL,NULL,NULL),(9,'Sales',NULL,NULL);
UNLOCK TABLES;
