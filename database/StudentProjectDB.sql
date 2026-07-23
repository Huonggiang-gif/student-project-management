-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: studentprojectdb
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `evaluations`
--

DROP TABLE IF EXISTS `evaluations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `topic_id` int NOT NULL,
  `lecturer_id` int NOT NULL,
  `report_score` decimal(5,2) DEFAULT NULL,
  `demo_score` decimal(5,2) DEFAULT NULL,
  `presentation_score` decimal(5,2) DEFAULT NULL,
  `defense_score` decimal(5,2) DEFAULT NULL,
  `total_score` decimal(5,2) DEFAULT NULL,
  `comment` text,
  `evaluated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `topic_id` (`topic_id`),
  KEY `lecturer_id` (`lecturer_id`),
  CONSTRAINT `evaluations_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE CASCADE,
  CONSTRAINT `evaluations_ibfk_2` FOREIGN KEY (`lecturer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluations`
--

LOCK TABLES `evaluations` WRITE;
/*!40000 ALTER TABLE `evaluations` DISABLE KEYS */;
INSERT INTO `evaluations` VALUES (1,1,3,8.50,9.00,8.75,9.25,8.88,'Đồ án tốt','2026-07-15 17:33:55'),(2,2,4,8.00,8.50,8.25,8.50,8.31,'Đạt yêu cầu','2026-07-15 17:33:55');
/*!40000 ALTER TABLE `evaluations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `progress_reports`
--

DROP TABLE IF EXISTS `progress_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `progress_reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `topic_id` int NOT NULL,
  `description` text NOT NULL,
  `lecturer_comment` text,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `topic_id` (`topic_id`),
  CONSTRAINT `progress_reports_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `progress_reports`
--

LOCK TABLES `progress_reports` WRITE;
/*!40000 ALTER TABLE `progress_reports` DISABLE KEYS */;
INSERT INTO `progress_reports` VALUES (1,1,'Đã hoàn thành đề cương','Đề cương đạt yêu cầu','2026-07-15 17:33:55'),(2,1,'Đã thiết kế cơ sở dữ liệu','Thiết kế hợp lý','2026-07-15 17:33:55'),(3,2,'Đã khảo sát yêu cầu','Tiếp tục hoàn thiện','2026-07-15 17:33:55');
/*!40000 ALTER TABLE `progress_reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `topic_id` int NOT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `file_size` varchar(50) DEFAULT NULL,
  `submitted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('submitted','reviewed','needs_revision') DEFAULT 'submitted',
  PRIMARY KEY (`id`),
  KEY `topic_id` (`topic_id`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,1,'BaoCaoDoAn.pdf','/uploads/BaoCaoDoAn.pdf','2MB','2026-07-15 17:33:55','submitted'),(2,2,'BaoCaoThuVien.pdf','/uploads/BaoCaoThuVien.pdf','1.8MB','2026-07-15 17:33:55','submitted');
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topics`
--

DROP TABLE IF EXISTS `topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `student_id` int NOT NULL,
  `lecturer_id` int NOT NULL,
  `status` enum('pending','waiting_approval','approved','in_progress','completed','rejected') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_id` (`student_id`),
  KEY `lecturer_id` (`lecturer_id`),
  CONSTRAINT `topics_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`),
  CONSTRAINT `topics_ibfk_2` FOREIGN KEY (`lecturer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topics`
--

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
INSERT INTO `topics` VALUES (1,'Website Quản lý đề tài','Hệ thống quản lý khóa luận tốt nghiệp',1,3,'in_progress','2026-07-15 17:33:55'),(2,'Website Quản lý thư viện','Hệ thống quản lý thư viện trường',2,4,'approved','2026-07-15 17:33:55');
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_code` varchar(20) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('student','lecturer','admin') NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_code` (`user_code`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'SV001','$2b$10$lC9lSkfnN/cRSLBqqK3UpuQz8IlN08jtmyYQsvRyeUuCWMoUrJYSG','Nguyễn Văn An','an@student.edu.vn','student',NULL,'0911111111','active','2026-07-15 17:33:55'),(2,'SV002','$2b$10$Ek5IGs4V710DUzxGjkgrE.lGQVJVpVv0GsWSZcupeYl0ufrVZTMY2','Trần Thị Bình','binh@student.edu.vn','student',NULL,'0922222222','active','2026-07-15 17:33:55'),(3,'GV001','$2b$10$Wm8NcHbcEkBpMdB./olR4.OP/F28eLvtyvcu1yvJxGLHStUooTo4.','TS. Lê Minh','minh@phenikaa.edu.vn','lecturer',NULL,'0933333333','active','2026-07-15 17:33:55'),(4,'GV002','$2b$10$6AWpi1ax94bobglOeO.c2.8gv5agvyNO3KK1utGaphUVKX/Hn.8IC','TS. Nguyễn Hải','hai@phenikaa.edu.vn','lecturer',NULL,'0944444444','active','2026-07-15 17:33:55'),(5,'GV003','$2b$10$kPnmw.Gg2nL2rKoa2UBhgeYsWOAx58FhuRlUDRl.eHPvfVGMz1o7y','TS. Trần Phúc','phuc@phenikaa.edu.vn','lecturer',NULL,'0955555555','active','2026-07-15 17:33:55'),(6,'ADMIN','$2b$10$jCiOACZpHrrphTN2nTJPveW67m9F2jzbAEQxJAI5HRLoW2wyqZMku','Quản trị hệ thống','admin@phenikaa.edu.vn','admin',NULL,'0900000000','active','2026-07-15 17:33:55'),(7,'SV003','$2b$10$QLJb1FiLKfa5Lue2W948cu/xwm5G24j6BZkNLicVWb7wmGy4pFCkq','Nguyễn Văn A','a@gmail.com','student',NULL,NULL,'active','2026-07-22 03:30:45'),(8,'SV004','$2b$10$re0foTZ1I8oqnONbEWcBw.rTXMRCRdEYmvljTK2y23eOMWX/gWz0C','Nguyễn Văn A','sv003@gmail.com','lecturer',NULL,NULL,'active','2026-07-22 03:58:24'),(9,'SV010','$2b$10$T.BZmlZY6DhyKYSghIRUeO.CTwBA2stdp1tUBRolCRJp6FLvO5QZe','Nguyễn Văn B','sv010@gmail.com','student',NULL,NULL,'active','2026-07-22 14:25:06'),(10,'GV005','$2b$10$BMPLBdrrshjzyoPYu.r9HubQwTIVEwDjHfhU0579PCH0Bxu9iLb3y','TS.Đỗ Thế Minh Quân','GV005@gmail.com','lecturer',NULL,NULL,'active','2026-07-22 15:06:31');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-24  0:24:35
