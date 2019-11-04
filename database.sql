-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               5.7.27-0ubuntu0.18.04.1 - (Ubuntu)
-- Server OS:                    Linux
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for database
CREATE DATABASE IF NOT EXISTS `database` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `database`;

-- Dumping structure for table database.Categories
CREATE TABLE IF NOT EXISTS `Categories` (
  `CategoryID` int(11) NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table database.Categories: ~2 rows (approximately)
/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
INSERT INTO `Categories` (`CategoryID`, `CategoryName`) VALUES
	(2, 'MEN'),
	(3, 'WOMEN');
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;

-- Dumping structure for table database.Products
CREATE TABLE IF NOT EXISTS `Products` (
  `ProductID` int(11) NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(50) NOT NULL,
  `ProductPrice` decimal(10,0) NOT NULL DEFAULT '0',
  `ProductImage` longtext NOT NULL,
  `ProductSubCategory` int(11) NOT NULL,
  `ProductQty` int(11) NOT NULL DEFAULT '0',
  `ProductAvailable` int(11) NOT NULL,
  PRIMARY KEY (`ProductID`),
  KEY `FK_Products_SubCategories` (`ProductSubCategory`),
  CONSTRAINT `FK_Products_SubCategories` FOREIGN KEY (`ProductSubCategory`) REFERENCES `SubCategories` (`SubCategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

-- Dumping data for table database.Products: ~32 rows (approximately)
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` (`ProductID`, `ProductName`, `ProductPrice`, `ProductImage`, `ProductSubCategory`, `ProductQty`, `ProductAvailable`) VALUES
	(16, 'BROWN GLOVES', 520, 'https://media.yoox.biz/items/46/46664061ol_20_f.jpg', 9, 89, 1),
	(17, 'GRAY FORMAL SHIRT', 430, 'https://media.yoox.biz/items/49/49508172hg_20_f.jpg', 9, 30, 1),
	(18, 'BROWN SUSTAINABLE SWEATER', 950, 'https://media.yoox.biz/items/49/49512943di_20_f.jpg', 9, 79, 1),
	(19, 'NAVY BLUE PRIMO SUIT', 2900, 'https://media.yoox.biz/items/49/49504869sa_20_f.jpg', 10, 80, 1),
	(22, 'ESSENTIAL NAVY BLUE RAVELLO JACKET', 3050, 'https://media.yoox.biz/items/49/49241074ee_20_f.jpg', 10, 0, 0),
	(23, 'GRAY DOUBLE-BREASTED JACKET', 4380, 'https://media.yoox.biz/items/49/49506118fi_20_f.jpg', 10, 0, 0),
	(24, 'GRAY CONDOTTI JACKET', 3660, 'https://media.yoox.biz/items/49/49504319xi_20_f.jpg', 10, 0, 0),
	(25, 'BROWN CARTESIO JACKET', 3650, 'https://media.yoox.biz/items/49/49511948dk_20_f.jpg', 10, 0, 0),
	(26, 'BLUE FIELD JACKET', 2900, 'https://media.yoox.biz/items/49/49504317jh_20_f.jpg', 11, 0, 0),
	(27, 'GRAY OVERSHIRT', 2400, 'https://media.yoox.biz/items/49/49518432ob_20_f.jpg', 11, 0, 0),
	(28, 'GRAY OVERCOAT', 4500, 'https://media.yoox.biz/items/49/49516281eq_20_f.jpg', 11, 0, 0),
	(29, 'GRAY FORMAL SHIRT', 430, 'https://media.yoox.biz/items/49/49508172hg_20_f.jpg', 12, 0, 0),
	(30, 'BLUE, WHITE AND ORANGE FORMAL SHIRT', 460, 'https://media.yoox.biz/items/49/49511824oa_20_f.jpg', 12, 0, 0),
	(31, 'NAVY BLUE AND WHITE STRIPED FORMAL SHIRT', 430, 'https://media.yoox.biz/items/49/49448588lq_20_f.jpg', 12, 0, 0),
	(32, 'BLUE CABLE KNIT SWEATER', 1500, 'https://media.yoox.biz/items/49/49515662qr_20_f.jpg', 13, 0, 0),
	(33, 'WHITE CABLE KNIT SWEATER', 1500, 'https://media.yoox.biz/items/49/49515658ce_20_f.jpg', 13, 0, 0),
	(34, 'BROWN SUSTAINABLE SWEATER', 950, 'https://media.yoox.biz/items/49/49512943di_20_f.jpg', 13, 0, 0),
	(35, 'GRAY T-SHIRT', 220, 'https://media.yoox.biz/items/49/49500670xd_20_f.jpg', 14, 0, 0),
	(36, 'BLACK T-SHIRT', 220, 'https://media.yoox.biz/items/49/49504973ud_20_f.jpg', 14, 0, 0),
	(37, 'WHITE PRINTED T-SHIRT', 290, 'https://media.yoox.biz/items/49/49509335tj_20_f.jpg', 14, 0, 0),
	(38, 'BLUE TROUSERS', 600, 'https://media.yoox.biz/items/49/49520808ta_20_f.jpg', 15, 0, 0),
	(39, 'BROWN PANTS', 600, 'https://media.yoox.biz/items/49/49521532ab_20_f.jpg', 15, 0, 0),
	(40, 'BEIGE PANTS', 600, 'https://media.yoox.biz/items/49/49512064ja_20_f.jpg', 15, 0, 0),
	(41, 'BROWN TASSEL DRIVER LOAFERS', 750, 'https://media.yoox.biz/items/11/11741602eq_20_f.jpg', 17, 0, 0),
	(42, 'BLUE TASSEL DRIVER LOAFERS', 750, 'https://media.yoox.biz/items/11/11740439mh_20_f.jpg', 17, 0, 0),
	(43, 'RED TASSEL DRIVER LOAFERS', 750, 'https://media.yoox.biz/items/11/11740456xp_20_f.jpg', 17, 0, 0),
	(45, 'Thick Bottom Lace-Up Women Sports Shoes - Beige', 950, 'https://img.doduae.com/image/cache/catalog/shoes/SW85-10/thick-bottom-lace-up-women-sports-shoes-00-600x600.jpg', 19, 0, 0),
	(46, 'Flat Wear Laced Up Casual Sneakers - Black', 340, 'https://img.doduae.com/image/cache/catalog/shoes/SA08-10/flat-wear-laced-up-casual-sneakers-20-4-600x600.jpg', 19, 0, 0),
	(47, 'Flat Wear Laced Up Casual Sneakers - White', 250, 'https://img.doduae.com/image/cache/catalog/shoes/SA08-10/flat-wear-laced-up-casual-sneakers-02-600x600.jpg', 19, 0, 0),
	(48, 'Polka Printed Pleated Party Dress - Khaki', 250, 'https://img.doduae.com/image/cache/catalog/clothing/494-09/round-neck-waist-belt-pleated-plain-formal-dress-20-3-600x600.jpg', 20, 0, 0),
	(49, 'Pleated Party Dress', 300, 'https://img.doduae.com/image/cache/catalog/clothing/6186-09/polka-printed-pleated-party-dress-03-600x600.jpg', 20, 0, 0),
	(50, 'Plain Waist Belt Summer Formal Mini', 260, 'https://img.doduae.com/image/cache/catalog/clothing/494-09/round-neck-waist-belt-pleated-plain-formal-dress-01-600x600.jpg', 20, 0, 0);
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;

-- Dumping structure for table database.SubCategories
CREATE TABLE IF NOT EXISTS `SubCategories` (
  `SubCategoryID` int(11) NOT NULL AUTO_INCREMENT,
  `SubCategoryName` varchar(50) NOT NULL DEFAULT '',
  `CategoryID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`SubCategoryID`),
  KEY `FK_SubCategories_Categories` (`CategoryID`),
  CONSTRAINT `FK_SubCategories_Categories` FOREIGN KEY (`CategoryID`) REFERENCES `Categories` (`CategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

-- Dumping data for table database.SubCategories: ~8 rows (approximately)
/*!40000 ALTER TABLE `SubCategories` DISABLE KEYS */;
INSERT INTO `SubCategories` (`SubCategoryID`, `SubCategoryName`, `CategoryID`) VALUES
	(9, 'NEW ARRIVALS', 2),
	(10, 'SUITS & JACKETS', 2),
	(11, 'OUTERWEAR', 2),
	(12, 'SHIRTS', 2),
	(13, 'KNITWEAR', 2),
	(14, 'POLOS & T-SHIRTS', 2),
	(15, 'TROUSERS', 2),
	(17, 'SHOES', 2),
	(19, 'SHOES', 3),
	(20, 'DRESSES', 3);
/*!40000 ALTER TABLE `SubCategories` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
