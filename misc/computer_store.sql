-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2024 at 12:14 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `computer_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `computers`
--

CREATE TABLE `computers` (
  `compId` int(11) NOT NULL,
  `compBrand` varchar(40) DEFAULT NULL,
  `compModel` varchar(40) DEFAULT NULL,
  `compCpu` int(11) DEFAULT NULL,
  `compGpu` int(11) DEFAULT NULL,
  `compRam` int(11) DEFAULT NULL,
  `compDisk` int(11) DEFAULT NULL,
  `compStock` int(11) DEFAULT NULL,
  `compPrice` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `computers`
--

INSERT INTO `computers` (`compId`, `compBrand`, `compModel`, `compCpu`, `compGpu`, `compRam`, `compDisk`, `compStock`, `compPrice`) VALUES
(1, 'Apple', 'Macbook', 1, 2, 16, 512, 98, 1000),
(8, 'Dell', 'Inspiron 15.6\"', 14, 2, 16, 512, 199, 549),
(9, 'ASUS', 'Vivobook 16\"', 15, 2, 16, 512, 250, 699),
(10, 'Acer', 'Nitro N50', 5, 3, 16, 1000, 40, 1769),
(11, 'Lenovo', 'LOQ Gaming PC', 5, 3, 16, 1000, 34, 1299),
(12, 'ASUS', 'ROG G22CHR Gaming PC', 5, 5, 32, 2000, 87, 2299),
(13, 'Apple', 'MacBook Pro 14.2\"', 16, 2, 16, 512, 199, 2099);

-- --------------------------------------------------------

--
-- Table structure for table `cpus`
--

CREATE TABLE `cpus` (
  `cpuId` int(11) NOT NULL,
  `cpuBrand` varchar(40) DEFAULT NULL,
  `cpuModel` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cpus`
--

INSERT INTO `cpus` (`cpuId`, `cpuBrand`, `cpuModel`) VALUES
(1, 'Apple', 'M1'),
(3, 'Intel', 'Core i7-14700'),
(4, 'Intel', 'Core i5-14400F'),
(5, 'Intel', 'Core i7-14700F'),
(6, 'Intel', 'Core i7-1355U'),
(14, 'Intel', 'Core i5-1235U'),
(15, 'Intel', 'Core i7-1255U'),
(16, 'Apple', 'M4');

-- --------------------------------------------------------

--
-- Table structure for table `gpus`
--

CREATE TABLE `gpus` (
  `gpuId` int(11) NOT NULL,
  `gpuBrand` varchar(40) DEFAULT NULL,
  `gpuModel` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gpus`
--

INSERT INTO `gpus` (`gpuId`, `gpuBrand`, `gpuModel`) VALUES
(1, 'Nvidia', 'GTX 1080'),
(2, 'n/a', 'n/a'),
(3, 'Nvidia', 'GeForce RTX 4060'),
(5, 'Nvidia', 'GeForce RTX 4070');

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `purchaseId` int(11) NOT NULL,
  `userEmail` varchar(50) NOT NULL,
  `compId` int(11) NOT NULL,
  `purchaseDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`purchaseId`, `userEmail`, `compId`, `purchaseDate`) VALUES
(37, 'john@email.com', 12, '2024-11-13 23:12:19'),
(38, 'smith@email.com', 8, '2024-11-13 23:12:31'),
(39, 'dave@email.com', 13, '2024-11-13 23:12:43'),
(40, 'meg@email.com', 11, '2024-11-13 23:12:50'),
(41, 'meg@email.com', 11, '2024-11-13 23:12:52'),
(42, 'max@email.com', 1, '2024-11-13 23:13:02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userEmail` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userEmail`) VALUES
('dave@email.com'),
('john@email.com'),
('max@email.com'),
('meg@email.com'),
('smith@email.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `computers`
--
ALTER TABLE `computers`
  ADD PRIMARY KEY (`compId`);

--
-- Indexes for table `cpus`
--
ALTER TABLE `cpus`
  ADD PRIMARY KEY (`cpuId`);

--
-- Indexes for table `gpus`
--
ALTER TABLE `gpus`
  ADD PRIMARY KEY (`gpuId`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`purchaseId`),
  ADD KEY `userEmail` (`userEmail`),
  ADD KEY `fk_computers` (`compId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userEmail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `computers`
--
ALTER TABLE `computers`
  MODIFY `compId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `cpus`
--
ALTER TABLE `cpus`
  MODIFY `cpuId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `gpus`
--
ALTER TABLE `gpus`
  MODIFY `gpuId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `purchaseId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `fk_computers` FOREIGN KEY (`compId`) REFERENCES `computers` (`compId`) ON DELETE CASCADE,
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`userEmail`) REFERENCES `users` (`userEmail`),
  ADD CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`compId`) REFERENCES `computers` (`compId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
