-- MySQL dump 10.13  Distrib 5.5.46, for Linux (x86_64)
--
-- Host: localhost    Database: champics
-- ------------------------------------------------------
-- Server version	5.5.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(1024) NOT NULL DEFAULT '',
  `author` varchar(255) NOT NULL DEFAULT '',
  `post_id` int(11) NOT NULL,
  `replied_id` int(11) NOT NULL DEFAULT '-1',
  `relative_url` varchar(255) NOT NULL DEFAULT '',
  `score` int(11) NOT NULL DEFAULT '0',
  `created_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'asdasd','asdsad',1,-1,'pics/gifs/1/0.png',0,'2015-12-07 12:34:51'),(2,'Behind blue eyes','cartie',8,-1,'pics/cute/8/0.png',1,'2015-12-07 12:45:48'),(3,'Behind angry green eyes','cartie',19,-1,'pics/random/19/0.png',0,'2015-12-07 12:48:10')
,(4,'Idk','Jared',19,-1,'pics/random/19/1.png',0,'2015-12-07 12:48:54'),(5,'Blue carrot nose and line mouth.','cartie',19,1,'pics/random/19/2.png',0,'2015-12-07 12:49:05'),(6,'little ears.','cart',19,4,'pics/random/19/3.png',0,'2015-12-07 12:51:47'),(7,'Cool outlined ears
','cartie',19,6,'pics/random/19/4.png',0,'2015-12-07 12:52:34'),(8,'Ok lol','Jared',8,2,'pics/cute/8/1.png',0,'2015-12-07 12:53:58'),(9,'Yup!','Chris',9,-1,'pics/movies/9/0.png',0,'2015-12-07 12:55:51'),(10,'Not so cute now','Mel Gibson',8,-1,'pics/cute/8/2.png',0,'2015-1
2-07 12:56:09'),(11,'I don\'t know','Mel Gibson',23,-1,'pics/gifs/23/0.png',1,'2015-12-07 13:04:04'),(12,'You Smart, you loyal','J',23,-1,'pics/gifs/23/1.png',0,'2015-12-07 13:04:51'),(13,'Yeah that\'s deff him.','cart',23,-1,'pics/gifs/23/2.png',0,'2015-12-07 13:05:33'),
(14,'You loyal','dj khaled',23,12,'pics/gifs/23/3.png',0,'2015-12-07 13:06:49'),(15,'You Smart, you loyal','Drake',24,-1,'pics/music/24/0.png',0,'2015-12-07 13:08:03'),(16,'test\n','daniel',18,-1,'pics/music/18/0.png',0,'2015-12-07 13:15:41'),(17,'go buy your momma a hous
e.','Drake',24,15,'pics/music/24/1.png',0,'2015-12-07 13:16:13'),(18,'boobs','',16,-1,'pics/nature/16/0.png',0,'2015-12-07 13:26:37');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `topic_id` int(11) NOT NULL,
  `created_timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(255) DEFAULT NULL,
  `relative_url` varchar(255) NOT NULL DEFAULT '',
  `slug` varchar(255) NOT NULL DEFAULT '',
  `score` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Bring on the bubbly',8,'2015-12-07 12:31:22','','pics/gifs/0/post.png','bring-on-the-bubbly',5),(2,'Grand Prix Richmond Crackstyle',1,'2015-12-07 12:33:27','','pics/funny/0/post.png','grand-prix-richmond-crackstyle',1),(6,'Lifting Bar',1,'201
5-12-07 12:39:19','','pics/funny/1/post.png','lifting-bar',0),(7,'A Stern Obama',2,'2015-12-07 12:40:02','','pics/politics/3/post.png','a-stern-obama',2),(8,'Cat Too Cute',3,'2015-12-07 12:40:28','','pics/cute/0/post.png','cat-too-cute',8),(9,'Leo Always Slays',5,'2015-12
-07 12:40:50','','pics/movies/0/post.png','leo-always-slays',1),(10,'Teemo the shrekker.',6,'2015-12-07 12:41:17','','pics/games/0/post.png','teemo-the-shrekker',0),(11,'Giraffe Hour',7,'2015-12-07 12:41:35','','pics/animals/0/post.png','giraffe-hour',0),(12,'Typical Home
r',8,'2015-12-07 12:41:58','','pics/gifs/1/post.png','typical-homer',0),(13,'iPhone 4',9,'2015-12-07 12:42:25','','pics/tech/0/post.png','iphone-4',0),(14,'Fox News',10,'2015-12-07 12:42:58','','pics/news/0/post.png','fox-news',2),(15,'J Cole',11,'2015-12-07 12:43:17','',
'pics/celebrity/0/post.png','j-cole',2),(16,'Pretty Trees',12,'2015-12-07 12:43:56','','pics/nature/0/post.png','pretty-trees',0),(17,'Three Musicians',13,'2015-12-07 12:44:18','','pics/art/0/post.png','three-musicians',0),(18,'Bach',14,'2015-12-07 12:44:34','','pics/musi
c/0/post.png','bach',0),(19,'Github Cat',15,'2015-12-07 12:45:06','','pics/random/0/post.png','github-cat',6),(20,'cute dog',3,'2015-12-07 12:56:53','','pics/cute/1/post.png','cute-dog',4),(21,'Finn needs some help',5,'2015-12-07 12:58:22','','pics/movies/1/post.png','fin
n-needs-some-help',4),(22,'Fallout 4 Arena',6,'2015-12-07 13:00:20','','pics/games/1/post.png','fallout-4-arena',3),(23,'Jersey Devil aka lil\' Jers',8,'2015-12-07 13:01:30','','pics/gifs/2/post.png','jersey-devil-aka-lil-jers',7),(24,'DJ Khaled ',14,'2015-12-07 13:06:31'
,'','pics/music/1/post.png','dj-khaled',4);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `topic` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `created_timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `post_count` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic`
--

LOCK TABLES `topic` WRITE;
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
INSERT INTO `topic` VALUES (1,'funny','2015-12-07 15:29:21',0),(2,'politics','2015-12-07 15:29:21',0),(3,'cute','2015-12-07 15:29:21',0),(5,'movies','2015-12-07 15:29:21',0),(6,'games','2015-12-07 15:29:21',0),(7,'animals','2015-12-07 15:29:21',0),(8,'gifs','2015-12-07 15
:29:21',0),(9,'tech','2015-12-07 15:29:21',0),(10,'news','2015-12-07 15:29:21',0),(11,'celebrity','2015-12-07 15:29:21',0),(12,'nature','2015-12-07 15:29:21',0),(13,'art','2015-12-07 15:29:21',0),(14,'music','2015-12-07 15:29:21',0),(15,'random','2015-12-07 15:29:21',0);
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-12-07 18:42:57