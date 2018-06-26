-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 26, 2018 at 12:47 PM
-- Server version: 5.7.22-0ubuntu18.04.1
-- PHP Version: 7.2.5-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jake_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Surveys`
--

CREATE TABLE `Surveys` (
  `ID` int(11) NOT NULL,
  `Survey_ID` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Time_Added` datetime DEFAULT NULL,
  `Last_Updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `IP` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `User_Agent` text COLLATE utf8mb4_unicode_ci,
  `Lang` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` text COLLATE utf8mb4_unicode_ci,
  `gender` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `age` text COLLATE utf8mb4_unicode_ci,
  `live` varchar(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `neighborhood` text COLLATE utf8mb4_unicode_ci,
  `postal` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `occupation` text COLLATE utf8mb4_unicode_ci,
  `if-occupation-other` text COLLATE utf8mb4_unicode_ci,
  `study` text COLLATE utf8mb4_unicode_ci,
  `if-study-other` text COLLATE utf8mb4_unicode_ci,
  `house` text COLLATE utf8mb4_unicode_ci,
  `if-house-other` text COLLATE utf8mb4_unicode_ci,
  `rent-status` text COLLATE utf8mb4_unicode_ci,
  `energy` text COLLATE utf8mb4_unicode_ci,
  `if-energy-other` text COLLATE utf8mb4_unicode_ci,
  `energy-aware` text COLLATE utf8mb4_unicode_ci,
  `if-energy-aware` text COLLATE utf8mb4_unicode_ci,
  `if-not-energy-aware` text COLLATE utf8mb4_unicode_ci,
  `natural-gas` text COLLATE utf8mb4_unicode_ci,
  `if-natural-gas-other` text COLLATE utf8mb4_unicode_ci,
  `aware-2025` text COLLATE utf8mb4_unicode_ci,
  `reduce-gas` text COLLATE utf8mb4_unicode_ci,
  `if-reduce-gas-no` text COLLATE utf8mb4_unicode_ci,
  `green-energy` text COLLATE utf8mb4_unicode_ci,
  `if-green-energy-why` text COLLATE utf8mb4_unicode_ci,
  `if-green-energy-how` text COLLATE utf8mb4_unicode_ci,
  `if-green-energy-ease` text COLLATE utf8mb4_unicode_ci,
  `if-green-energy-buying` text COLLATE utf8mb4_unicode_ci,
  `solar` text COLLATE utf8mb4_unicode_ci,
  `if-solar` text COLLATE utf8mb4_unicode_ci,
  `green-convince` text COLLATE utf8mb4_unicode_ci,
  `if-green-energy-convince` text COLLATE utf8mb4_unicode_ci,
  `community` text COLLATE utf8mb4_unicode_ci,
  `if-community` text COLLATE utf8mb4_unicode_ci,
  `green-motivations` text COLLATE utf8mb4_unicode_ci,
  `magicwand` text COLLATE utf8mb4_unicode_ci,
  `nextstep` text COLLATE utf8mb4_unicode_ci,
  `stopping_nextstep` text COLLATE utf8mb4_unicode_ci,
  `email_address` text COLLATE utf8mb4_unicode_ci,
  `closing` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Surveys`
--
ALTER TABLE `Surveys`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Surveys`
--
ALTER TABLE `Surveys`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
