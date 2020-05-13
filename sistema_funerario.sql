CREATE DATABASE  IF NOT EXISTS `sistema_funerario` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `sistema_funerario`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 157.230.49.162    Database: sistema_funerario
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.18.04.1

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
-- Table structure for table `afiliado`
--

DROP TABLE IF EXISTS `afiliado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `afiliado` (
  `cedula` int(11) NOT NULL,
  `de_cedula` varchar(45) DEFAULT NULL,
  `nombres` varchar(200) DEFAULT NULL,
  `apellidos` varchar(200) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `celular` int(11) DEFAULT NULL,
  `fecha_nas` date DEFAULT NULL,
  `estado_civil` varchar(45) DEFAULT NULL,
  `ocupacion` varchar(45) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `edad_afiliacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`cedula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `afiliado`
--

LOCK TABLES `afiliado` WRITE;
/*!40000 ALTER TABLE `afiliado` DISABLE KEYS */;
INSERT INTO `afiliado` VALUES (11123,'pasto','pepe','perez','casa1',3333,315565,'1989-11-23','soltero','profesor','pepeperez@correo',54),(1112322,'pasto','pepe','perez','casa1',3333,315565,'1989-11-23','soltero','profesor','pepeperez@correo',54),(1085277182,'pasto','Juan Carlos','Guzman Escandon','Carrera 32',333,222,'1989-11-11','u','ing','jua',30);
/*!40000 ALTER TABLE `afiliado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `beneficiarios`
--

DROP TABLE IF EXISTS `beneficiarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `beneficiarios` (
  `id_beneficiario` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(200) DEFAULT NULL,
  `apellidos` varchar(200) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `año_nas` date DEFAULT NULL,
  `afiliado_cedula` int(11) NOT NULL,
  PRIMARY KEY (`id_beneficiario`),
  KEY `fk_beneficiarios_afiliado1_idx` (`afiliado_cedula`),
  CONSTRAINT `fk_beneficiarios_afiliado1` FOREIGN KEY (`afiliado_cedula`) REFERENCES `afiliado` (`cedula`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `beneficiarios`
--

LOCK TABLES `beneficiarios` WRITE;
/*!40000 ALTER TABLE `beneficiarios` DISABLE KEYS */;
INSERT INTO `beneficiarios` VALUES (78,'andres','Escandon',63,'1957-05-17',1112322),(79,'pepe','Escandon',63,'1957-05-17',1112322),(80,'juan','Escandon',63,'1957-05-17',1112322),(81,'luis','Escandon',63,'1957-05-17',11123),(82,'ricardo','pasoy',63,'1957-05-17',11123),(83,'ernesto','guzman',63,'1957-05-17',11123);
/*!40000 ALTER TABLE `beneficiarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contrato`
--

DROP TABLE IF EXISTS `contrato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contrato` (
  `id_contrato` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `modalidad_pago` enum('mensual','bimestral','semestral','anual') DEFAULT NULL,
  `cuotas` int(11) DEFAULT NULL,
  `valor_tot` int(11) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT '0',
  `aprovacion` tinyint(1) DEFAULT '0',
  `fecha_aprovacion` datetime DEFAULT NULL,
  `afiliado_cedula` int(11) NOT NULL,
  `nit` int(10) NOT NULL,
  `id_plan` int(11) NOT NULL,
  `curdate` datetime DEFAULT CURRENT_TIMESTAMP,
  `uptime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_contrato`,`afiliado_cedula`),
  KEY `fk_contrato_provedores1_idx` (`nit`),
  KEY `fk_contrato_afiliado1_idx` (`afiliado_cedula`),
  KEY `fk_contrato_plan_fun1_idx` (`id_plan`),
  CONSTRAINT `fk_contrato_afiliado1` FOREIGN KEY (`afiliado_cedula`) REFERENCES `afiliado` (`cedula`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_contrato_plan_fun1` FOREIGN KEY (`id_plan`) REFERENCES `plan_fun` (`id_plan`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_contrato_provedores1` FOREIGN KEY (`nit`) REFERENCES `provedores` (`nit`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contrato`
--

LOCK TABLES `contrato` WRITE;
/*!40000 ALTER TABLE `contrato` DISABLE KEYS */;
INSERT INTO `contrato` VALUES (4,'2020-02-02 00:00:00','2021-01-02 00:00:00','mensual',12,258900,0,0,NULL,1085277182,901072081,1,'2020-05-09 21:09:26','2020-05-09 21:09:26');
/*!40000 ALTER TABLE `contrato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modulos`
--

DROP TABLE IF EXISTS `modulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modulos` (
  `id_modulos` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id_modulos`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulos`
--

LOCK TABLES `modulos` WRITE;
/*!40000 ALTER TABLE `modulos` DISABLE KEYS */;
INSERT INTO `modulos` VALUES (1,'usuarios'),(2,'planes'),(3,'contratos');
/*!40000 ALTER TABLE `modulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pagos` (
  `id_pagos` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `valor` int(11) DEFAULT NULL,
  `afiliado_cedula` int(11) NOT NULL,
  PRIMARY KEY (`id_pagos`),
  KEY `fk_pagos_cedula_idx` (`afiliado_cedula`),
  CONSTRAINT `fk_pagos_cedula` FOREIGN KEY (`afiliado_cedula`) REFERENCES `contrato` (`afiliado_cedula`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
INSERT INTO `pagos` VALUES (1,'2020-02-15 00:00:00',19900,1085277182),(2,'2020-03-10 00:00:00',19900,1085277182);
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisos`
--

DROP TABLE IF EXISTS `permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permisos` (
  `id_permisos` int(11) NOT NULL AUTO_INCREMENT,
  `insertar` tinyint(1) DEFAULT '0',
  `modificar` tinyint(1) DEFAULT '0',
  `eliminar` tinyint(1) DEFAULT '0',
  `consultar` tinyint(1) DEFAULT '0',
  `roles_id` int(11) NOT NULL,
  `modulos_id` int(11) NOT NULL,
  PRIMARY KEY (`id_permisos`),
  KEY `fk_permisos_roles1_idx` (`roles_id`),
  KEY `fk_permisos_modulos1_idx` (`modulos_id`),
  CONSTRAINT `fk_permisos_modulos1` FOREIGN KEY (`modulos_id`) REFERENCES `modulos` (`id_modulos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_permisos_roles1` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id_roles`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisos`
--

LOCK TABLES `permisos` WRITE;
/*!40000 ALTER TABLE `permisos` DISABLE KEYS */;
INSERT INTO `permisos` VALUES (1,1,1,1,1,1,1),(2,1,1,1,1,1,2),(3,1,1,1,1,1,3);
/*!40000 ALTER TABLE `permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan_fun`
--

DROP TABLE IF EXISTS `plan_fun`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plan_fun` (
  `id_plan` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `valor` int(11) DEFAULT NULL,
  `max_personas` int(11) DEFAULT NULL,
  `max_cuotas` int(11) DEFAULT NULL,
  `provedores_nit` int(10) NOT NULL,
  PRIMARY KEY (`id_plan`),
  KEY `fk_plan_fun_provedores_idx` (`provedores_nit`),
  CONSTRAINT `fk_plan_fun_provedores` FOREIGN KEY (`provedores_nit`) REFERENCES `provedores` (`nit`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_fun`
--

LOCK TABLES `plan_fun` WRITE;
/*!40000 ALTER TABLE `plan_fun` DISABLE KEYS */;
INSERT INTO `plan_fun` VALUES (1,'plan individual',19900,0,12,901072087);
/*!40000 ALTER TABLE `plan_fun` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provedores`
--

DROP TABLE IF EXISTS `provedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `provedores` (
  `nit` int(10) NOT NULL,
  `codigo` int(1) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `celular` bigint(14) DEFAULT NULL,
  PRIMARY KEY (`nit`),
  UNIQUE KEY `nit_UNIQUE` (`nit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provedores`
--

LOCK TABLES `provedores` WRITE;
/*!40000 ALTER TABLE `provedores` DISABLE KEYS */;
INSERT INTO `provedores` VALUES (901072081,8,'Prevenir','camara de comercio',22222222,35598756),(901072087,7,'Securtec SAS','Carrera 32 # 13 - 48',7369644,3007693539),(901072088,8,'Prevenir','camara de comercio',22222222,35598756);
/*!40000 ALTER TABLE `provedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reglas`
--

DROP TABLE IF EXISTS `reglas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reglas` (
  `id_reglas` int(11) NOT NULL,
  `grado_con` int(11) DEFAULT NULL,
  `max_personas` int(11) DEFAULT NULL,
  `max_edad` int(11) DEFAULT NULL,
  `id_plan` int(11) NOT NULL,
  PRIMARY KEY (`id_reglas`),
  KEY `fk_reglas_plan_fun1_idx` (`id_plan`),
  CONSTRAINT `fk_reglas_plan_fun1` FOREIGN KEY (`id_plan`) REFERENCES `plan_fun` (`id_plan`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reglas`
--

LOCK TABLES `reglas` WRITE;
/*!40000 ALTER TABLE `reglas` DISABLE KEYS */;
/*!40000 ALTER TABLE `reglas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id_roles` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_roles`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'super admin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id_usuarios` varchar(50) NOT NULL,
  `cedula` varchar(45) DEFAULT NULL,
  `nombres` varchar(200) DEFAULT NULL,
  `apellidos` varchar(200) DEFAULT NULL,
  `correo` varchar(200) DEFAULT NULL,
  `cargo` varchar(45) DEFAULT NULL,
  `contraseña` varchar(200) DEFAULT NULL,
  `telefono` bigint(10) DEFAULT NULL,
  `provedores_nit` int(10) NOT NULL,
  `roles_id` int(11) NOT NULL,
  PRIMARY KEY (`id_usuarios`),
  UNIQUE KEY `id_usuarios_UNIQUE` (`id_usuarios`),
  KEY `fk_usuarios_provedores_idx` (`provedores_nit`),
  KEY `fk_usuarios_roles1_idx` (`roles_id`),
  CONSTRAINT `fk_usuarios_provedores` FOREIGN KEY (`provedores_nit`) REFERENCES `provedores` (`nit`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_roles1` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id_roles`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('carlosmaroz','108524598','Carlos Mario','Ortiz','carlosmaroz@gmail.com','Representante Legal',' fa585d89c851dd338a70dcf535aa2a92fee7836dd6aff1226583e88e0996293f16bc009c652826e0fc5c706695a03cddce372f139eff4d13959da6f1f5d3eabe',3155678976,901072088,1),('carlosz','108524598','Carlos Mario','Ortiz','carlosmaroz@gmail.com','Representante Legal','fa585d89c851dd338a70dcf535aa2a92fee7836dd6aff1226583e88e0996293f16bc009c652826e0fc5c706695a03cddce372f139eff4d13959da6f1f5d3eabe',3155678976,901072081,1),('juank8911','1085277182','Juan Carlos','Guzman Escandon','juankita8911@gmail.com','director','12345678',3007693539,901072087,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-12 19:28:16
