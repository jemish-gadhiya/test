-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 18, 2022 at 03:25 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tatva`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `author` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `publish_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL,
  `status` varchar(50) NOT NULL COMMENT 'publish, unpublish',
  `category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `author`, `title`, `description`, `publish_date`, `modify_date`, `status`, `category`) VALUES
(6, 6, 'blog6', 'This is demo blog 6', '2022-05-18 12:34:59', '0000-00-00 00:00:00', 'publish', 'Marketing'),
(7, 3, 'blog6', 'This is demo blog 6', '2022-05-18 12:38:14', '0000-00-00 00:00:00', 'publish', 'Growth hacking'),
(8, 3, 'blog6', 'This is demo blog 6', '2022-05-18 12:38:14', '0000-00-00 00:00:00', 'publish', 'Growth hacking'),
(9, 3, 'blog6', 'This is demo blog 6', '2022-05-18 12:38:15', '0000-00-00 00:00:00', 'publish', 'Growth hacking'),
(11, 6, 'blog7', 'This is demo blog 7', '2022-05-18 13:23:09', '0000-00-00 00:00:00', 'publish', 'Growth hacking'),
(12, 6, 'blog8', 'This is demo blog 8', '2022-05-18 13:23:17', '0000-00-00 00:00:00', 'publish', 'Growth hacking'),
(13, 6, 'blog9', 'This is demo blog 9', '2022-05-18 13:23:35', '0000-00-00 00:00:00', 'publish', 'Marketing'),
(14, 3, 'blog10', 'This is demo blog 10', '2022-05-18 13:23:58', '0000-00-00 00:00:00', 'publish', 'Marketing'),
(15, 3, 'blog11', 'This is demo blog 11', '2022-05-18 13:24:08', '0000-00-00 00:00:00', 'unpublish', 'Marketing');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `dob` date NOT NULL,
  `role` varchar(50) NOT NULL COMMENT 'admin, user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `dob`, `role`) VALUES
(3, 'Jemish', 'Gadhiya', 'jemishgadhiya97@gmail.com', '0deef86bc2', '1997-12-30', 'user'),
(5, 'Jemish', 'Admin', 'jemishadmin@gmail.com', '0deef86bc2', '1997-12-30', 'admin'),
(6, 'testuser', 'Demo', 'normaluser@gmail.com', '0deef86bc2', '1997-12-09', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
