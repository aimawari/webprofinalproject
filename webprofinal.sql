-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 02, 2018 at 11:06 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webprofinal`
--

-- --------------------------------------------------------

--
-- Table structure for table `comitee`
--

CREATE TABLE `comitee` (
  `ID` int(11) NOT NULL,
  `USERID` int(11) NOT NULL,
  `PROJECTID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comitee`
--

INSERT INTO `comitee` (`ID`, `USERID`, `PROJECTID`) VALUES
(1, 2, 1),
(2, 3, 1),
(3, 4, 2),
(4, 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `ID` int(11) NOT NULL,
  `PROJECTNAME` varchar(60) NOT NULL,
  `ADVISOR` int(11) NOT NULL,
  `COADVISOR` int(11) NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`ID`, `PROJECTNAME`, `ADVISOR`, `COADVISOR`, `STATUS`) VALUES
(1, 'ABC project', 1, 0, 0),
(2, 'DEF project', 2, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `ID` int(11) NOT NULL,
  `IDSTUDENT` int(11) NOT NULL,
  `IDPROJECT` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`ID`, `IDSTUDENT`, `IDPROJECT`) VALUES
(1, 6, 1),
(2, 7, 1),
(3, 8, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `USERNAME` varchar(20) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `FIRSTNAME` varchar(60) NOT NULL,
  `LASTNAME` varchar(60) NOT NULL,
  `EMAIL` varchar(60) NOT NULL,
  `ROLE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `USERNAME`, `PASSWORD`, `FIRSTNAME`, `LASTNAME`, `EMAIL`, `ROLE`) VALUES
(1, 'Admin', '$2b$10$2yyUUWuVtVvaVF2X7TZIZu1zGGwvmFO5dfXZ5OmZfoQkQLKloT.Kq', 'Jenny', 'Dode', 'example@mmail.com', 0),
(2, 'Lecturer01', '$2b$10$2yyUUWuVtVvaVF2X7TZIZu1zGGwvmFO5dfXZ5OmZfoQkQLKloT.Kq', 'Jeck', 'Savage', 'example1@mmail.com', 1),
(3, 'Lecturer02', '$2b$10$2yyUUWuVtVvaVF2X7TZIZu1zGGwvmFO5dfXZ5OmZfoQkQLKloT.Kq', 'Pate', 'paul', 'example2@mmail.com', 1),
(4, 'Lecturer03', '$2b$10$2yyUUWuVtVvaVF2X7TZIZu1zGGwvmFO5dfXZ5OmZfoQkQLKloT.Kq', 'Sobrina', 'Dode', 'example3@mmail.com', 1),
(5, 'Lecturer04', '$2b$10$2yyUUWuVtVvaVF2X7TZIZu1zGGwvmFO5dfXZ5OmZfoQkQLKloT.Kq', 'Martin', 'Lee', 'example4@mmail.com', 1),
(6, 'Student1', '$2b$10$2yyUUWuVtVvaVF2X7TZIZu1zGGwvmFO5dfXZ5OmZfoQkQLKloT.Kq', 'Conner', 'Savage', 'example5@mmail.com', 2),
(7, 'Student2', '$2b$10$2yyUUWuVtVvaVF2X7TZIZu1zGGwvmFO5dfXZ5OmZfoQkQLKloT.Kq', 'Laura ', 'Hickey', 'example6@mmail.com', 2),
(8, 'Student3', '$2b$10$2yyUUWuVtVvaVF2X7TZIZu1zGGwvmFO5dfXZ5OmZfoQkQLKloT.Kq', 'Pat', 'Hickey', 'example7@mmail.com', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comitee`
--
ALTER TABLE `comitee`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comitee`
--
ALTER TABLE `comitee`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
