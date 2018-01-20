-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Dim 21 Mai 2017 à 22:33
-- Version du serveur :  5.7.11
-- Version de PHP :  5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `discord`
--

-- --------------------------------------------------------

--
-- Structure de la table `bibliotheque`
--

CREATE TABLE `bibliotheque` (
  `idJeu` int(11) DEFAULT NULL,
  `idPersonne` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `bibliotheque`
--

INSERT INTO `bibliotheque` (`idJeu`, `idPersonne`) VALUES
(1, 4),
(1, 1),
(1, 5),
(4, 6),
(5, 2);

-- --------------------------------------------------------

--
-- Structure de la table `jeux`
--

CREATE TABLE `jeux` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `jeux`
--

INSERT INTO `jeux` (`id`, `nom`) VALUES
(1, 'Call of Duty: Modern Warfare 2'),
(2, 'Call of Duty: Modern Warfare 2'),
(3, 'Call of Duty: Modern Warfare 2'),
(4, 'World of Warcraft'),
(5, 'Pokemon Trading Card Game Online');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `idPersonne` int(11) DEFAULT NULL,
  `contenu` varchar(200) DEFAULT NULL,
  `commande` tinyint(4) NOT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `messages`
--

INSERT INTO `messages` (`id`, `idPersonne`, `contenu`, `commande`, `date`) VALUES
(1, 3, '/ow', 1, '2016-09-14 17:59:55'),
(2, 3, '/man rappel', 1, '2016-09-14 18:00:35'),
(3, 3, '/help', 1, '2016-09-14 18:02:41'),
(4, 3, '/help', 1, '2016-09-14 18:05:38'),
(5, 3, '/help', 1, '2016-09-14 18:06:23'),
(6, 3, '/help', 1, '2016-09-14 18:10:38'),
(7, 2, 'wut', 0, '2016-09-14 18:11:24'),
(8, 2, 'pourquoi t\'as changé de couleur joss?', 0, '2016-09-14 18:11:31'),
(9, 3, 'temporaire', 0, '2016-09-14 18:14:35'),
(10, 3, '/help', 1, '2016-09-14 18:16:38'),
(11, 7, 'sympa cette couleur', 0, '2016-09-14 18:28:37'),
(12, 7, 'j\'aime bien', 0, '2016-09-14 18:28:45'),
(13, 3, '/help', 1, '2016-09-14 18:30:30'),
(14, 3, '/help', 1, '2016-09-14 18:31:34'),
(15, 3, '/help', 1, '2016-09-14 18:32:59'),
(16, 3, '/ow', 1, '2016-09-14 18:33:23'),
(17, 3, '/help', 1, '2016-09-14 18:34:12'),
(18, 3, '/help', 1, '2016-09-14 18:35:25'),
(19, 3, '/help', 1, '2016-09-14 18:35:38'),
(20, 3, '/help', 1, '2016-09-14 18:43:19'),
(21, 3, '/help', 1, '2016-09-14 18:43:53'),
(22, 3, '/help', 1, '2016-09-14 18:44:03'),
(23, 3, '/help', 1, '2016-09-14 18:45:19'),
(24, 9, 'allow ?', 0, '2016-09-14 18:45:28'),
(25, 3, 'désolé', 0, '2016-09-14 18:48:53'),
(26, 3, '/help', 1, '2016-09-14 18:49:10'),
(27, 3, '/help', 1, '2016-09-14 19:53:11'),
(28, 3, '/help', 1, '2016-09-14 20:09:27'),
(29, 3, '/help', 1, '2016-09-14 20:10:37'),
(30, 3, '/ow', 1, '2016-09-14 21:22:43'),
(31, 3, '/ow profile Josstoh#2971', 1, '2016-09-14 21:22:56'),
(32, 3, '/ow profil Josstoh#2971', 1, '2016-09-14 21:24:17'),
(33, 3, '/lol rang josstoh', 1, '2016-09-14 21:25:41'),
(34, 3, '/test', 1, '2016-09-20 14:53:19'),
(35, 3, '/test', 1, '2016-09-20 14:54:48'),
(36, 3, '/test', 1, '2016-09-20 15:23:21'),
(37, 3, '/test', 1, '2016-09-20 15:24:22'),
(38, 3, '/test', 1, '2016-09-20 15:27:56'),
(39, 3, '/test', 1, '2016-09-20 15:28:30'),
(40, 3, '/test', 1, '2016-09-20 15:29:46'),
(41, 3, '/test', 1, '2016-09-20 15:35:06'),
(42, 3, '/test', 1, '2016-09-20 15:35:44'),
(43, 3, '/test', 1, '2016-09-20 15:40:03'),
(44, 3, '/test', 1, '2016-09-20 15:40:52'),
(45, 3, '/test', 1, '2016-09-20 15:44:55'),
(46, 3, 'http://www.bhmag.fr/actualites/sandisk-presente-sdxc-extreme-pro-capacite-1-to-30611', 0, '2016-09-20 16:50:52'),
(47, 2, 'parfait', 0, '2016-09-20 17:02:30'),
(48, 2, 'tu vas pouvoir perdre 1 tera de données encore plus facilement', 0, '2016-09-20 17:02:51'),
(49, 2, 'ouais', 0, '2016-09-20 17:04:58'),
(50, 2, 'la différence de prix aussi :/', 0, '2016-09-20 17:05:04'),
(51, 2, 'pour des perf prolly moins bonnes', 0, '2016-09-20 17:05:15'),
(52, 1, '/test', 1, '2016-09-20 17:12:11'),
(53, 1, 'coucou ALL', 0, '2016-09-20 17:12:22'),
(54, 4, 'yo', 0, '2016-09-20 17:12:43'),
(55, 1, 'comment ca va ALL ?', 0, '2016-09-20 17:12:50'),
(56, 4, 'bien et toi?', 0, '2016-09-20 17:13:36'),
(57, 1, 'bein bein', 0, '2016-09-20 17:13:49'),
(58, 3, 'Re', 0, '2016-09-20 17:23:26'),
(59, 3, 'Y\'a que <@141972107599806464>  qui  vient dire bonjour !', 0, '2016-09-20 17:24:02'),
(60, 2, 'https://giphy.com/gifs/5uF0PN4Dai6SA', 0, '2016-09-20 17:50:42'),
(61, 4, '^^', 0, '2016-09-20 17:51:00'),
(62, 6, 'c\'est pas faux', 0, '2016-09-20 18:14:16'),
(63, 3, 'https://twitter.com/LoL_France/status/778292809887395840', 0, '2016-09-20 18:16:32'),
(64, 1, '<@136897244027682816> bah ouai, s\'ils étaient deja étudiant l\'année précédente, ce ne sont pas de nouveaux étudiants', 0, '2016-09-20 18:34:52'),
(65, 3, 'ah ok, ben quand tu dis *+180k etu* je comprends *il y a plus de 180 000 étudiants cette année*', 0, '2016-09-20 18:36:31'),
(66, 1, 'on est 40K à lyon 1, du coup heureusement qu\'on est plus de 180K en france ^_^', 0, '2016-09-20 18:37:14'),
(67, 1, '(on est entre 2.5 et 3 millions d\'étudiants en france à priori)', 0, '2016-09-20 18:38:44'),
(68, 1, 'enfin', 0, '2016-09-20 18:39:03'),
(69, 1, '3 millions - 1 si on compte drallcoco', 0, '2016-09-20 18:39:16'),
(70, 3, 'https://tenor.co/uLVZ.gif', 0, '2016-09-20 18:45:39'),
(71, 3, '/lol rang josstoh', 1, '2016-09-20 19:46:03'),
(72, 3, '/lol rang josstoh', 1, '2016-09-20 19:46:39'),
(73, 3, '/lol rang', 1, '2016-09-20 19:47:17'),
(74, 3, '/lol rang <@136897244027682816>', 1, '2016-09-20 19:47:35'),
(75, 3, '/lol rang <@136897244027682816> <@136865764975181825>', 1, '2016-09-20 19:52:32'),
(76, 3, '/lol rang', 1, '2016-09-20 19:55:02'),
(77, 3, '/lol rang <@136897244027682816>', 1, '2016-09-20 19:55:22'),
(78, 3, '/lol rang <@136897244027682816>', 1, '2016-09-20 20:12:18'),
(79, 3, '/lol rang <@136897244027682816>', 1, '2016-09-20 20:19:13'),
(80, 3, '/lol rang <@136897244027682816>', 1, '2016-09-20 20:19:28'),
(81, 3, '/lol rang <@136897244027682816>', 1, '2016-09-20 20:22:24'),
(82, 3, '/lol rang', 1, '2016-09-20 20:22:56'),
(83, 3, '/lol rang', 1, '2016-09-20 20:23:17'),
(84, 6, 'https://twitter.com/20Minutes/status/778333931036958720', 0, '2016-09-20 20:48:02'),
(85, 6, 'ça suffit j\'ai dis', 0, '2016-09-20 20:48:05'),
(86, 3, '/lol rang', 1, '2016-09-20 20:48:54'),
(87, 3, '/lol rang', 1, '2016-09-20 20:51:41'),
(88, 3, '/lol rang', 1, '2016-09-20 20:53:03'),
(89, 3, '/lol rang', 1, '2016-09-20 20:54:27'),
(90, 3, '/lol rang josstoh', 1, '2016-09-20 20:54:46'),
(91, 3, '/lol rang <@136897244027682816>', 1, '2016-09-20 20:54:59'),
(92, 3, '/lol rang <@136897244027682816>', 1, '2016-09-20 20:57:12'),
(93, 3, '/lol rang <@136897244027682816>', 1, '2016-09-20 21:02:53'),
(94, 3, '/lol rang <@136897244027682816>', 1, '2016-09-20 21:04:37'),
(95, 3, '/lol rang <@136897244027682816>', 1, '2016-09-20 21:04:48'),
(96, 3, '/lol rang <@136897244027682816>', 1, '2016-09-20 21:08:33'),
(97, 3, '/lol rang <@136897244027682816>', 1, '2016-09-20 21:09:16'),
(98, 3, '/lol rang <@136897244027682816>', 1, '2016-09-20 21:09:41'),
(99, 3, '/lol rang <@136897244027682816>', 1, '2016-09-20 21:11:54'),
(100, 3, '/lol rang <@136897244027682816>', 1, '2016-09-20 21:12:17'),
(101, 3, 'msg.mentions.users.first().username', 0, '2016-09-20 21:12:55'),
(102, 3, '/lol rang <@136897244027682816>', 1, '2016-09-20 21:13:02'),
(103, 3, '/lol rang <@136897244027682816> <@136865764975181825>', 1, '2016-09-20 21:13:18'),
(104, 3, '/lier', 1, '2016-09-20 21:41:13'),
(105, 3, '/lol lier', 1, '2016-09-20 21:41:21'),
(106, 3, '/lol lier josstoh', 1, '2016-09-20 21:41:33'),
(107, 3, '/lol lier josjqossadzfsqfsqd', 1, '2016-09-20 21:41:47'),
(108, 3, '/lol rang', 1, '2016-09-20 21:43:41'),
(109, 3, '/lol rang', 1, '2016-09-20 21:45:15'),
(110, 3, '/lol rang', 1, '2016-09-20 21:46:01'),
(111, 3, '/lol rang', 1, '2016-09-20 21:46:41'),
(112, 3, '/lol rang', 1, '2016-09-20 21:47:54'),
(113, 3, '/lol rang', 1, '2016-09-20 21:48:35'),
(114, 3, '/lol rang', 1, '2016-09-20 21:49:43'),
(115, 3, '/lol rang <@136897244027682816>', 1, '2016-09-20 21:50:01'),
(116, 3, '/lol rang <@136897244027682816>', 1, '2016-09-20 21:51:39'),
(117, 3, 'allllller', 0, '2016-09-20 21:51:49'),
(118, 3, 'ALLLLLER', 0, '2016-09-20 21:51:52'),
(119, 6, 'rémi t\'es chez orange aussi ?', 0, '2016-09-20 22:32:34'),
(120, 2, 'ui', 0, '2016-09-20 22:32:40'),
(121, 6, 'ptet eux', 0, '2016-09-20 22:32:45'),
(122, 2, 'askip c\'est full zbeul en ce momeet', 0, '2016-09-20 22:32:48'),
(123, 6, 'on a discord a l\'écrit', 0, '2016-09-20 22:32:49'),
(124, 6, 'le net yotube', 0, '2016-09-20 22:32:53'),
(125, 2, 'j\'entends coco', 0, '2016-09-20 22:32:55'),
(126, 2, 'mais lui non', 0, '2016-09-20 22:33:03'),
(127, 3, 'http://euw.leagueoflegends.com/fr/featured/champion-reveal-ivern-green-father', 0, '2016-09-20 22:45:10'),
(128, 3, '/lol lier josstoh', 1, '2016-09-27 14:26:43'),
(129, 3, '/lol lier drallco', 1, '2016-09-27 14:31:19'),
(130, 3, '/lol lier drallco', 1, '2016-09-27 14:31:47'),
(131, 3, '/lol lier drallco', 1, '2016-09-27 14:35:24'),
(132, 6, 'non', 0, '2016-09-27 14:54:15'),
(133, 3, 'non sérieusement', 0, '2016-09-27 14:55:45'),
(134, 6, 'je prefere etre mallade chez moi que pas chez moi', 0, '2016-09-27 15:01:35'),
(135, 6, 'j\'espere que ça ira mieux demain', 0, '2016-09-27 15:03:34'),
(136, 6, '<@141972107599806464> <@141699007767511040> mythique?', 0, '2016-09-27 15:03:59'),
(137, 4, 'dispo d\'ici 10 15 min d', 0, '2016-09-27 15:04:28'),
(138, 6, 'yeah', 0, '2016-09-27 15:04:37'),
(139, 3, 'mythique.com !', 0, '2016-09-27 15:10:17'),
(140, 2, 'ayé', 0, '2016-09-27 15:11:57'),
(141, 2, 'il gynoth down', 0, '2016-09-27 15:12:01'),
(142, 2, 'ma vie est remplie', 0, '2016-09-27 15:12:07'),
(143, 6, 'gg', 0, '2016-09-27 15:12:10'),
(144, 6, 'remplie de tatencules', 0, '2016-09-27 15:12:14'),
(145, 6, ': >', 0, '2016-09-27 15:12:14'),
(146, 6, 'faudrai trop que jtrouve un groupe pour finir de clean', 0, '2016-09-27 15:12:24'),
(147, 6, 'chui exalté souffrenuit et j\'ai meme pas fini la quette', 0, '2016-09-27 15:12:32'),
(148, 6, 'oh mais', 0, '2016-09-27 15:14:21'),
(149, 6, 'y\'a la 1e partie dispo en lfr', 0, '2016-09-27 15:14:26'),
(150, 3, '/lol lier drallco', 1, '2016-09-27 15:22:32'),
(151, 3, '/lol lier drallco', 1, '2016-09-27 15:27:10'),
(152, 3, '/lol lier drallco', 1, '2016-09-27 15:29:03'),
(153, 3, '/lol lier drallco', 1, '2016-09-27 15:31:22'),
(154, 3, '/lol lier drallco', 1, '2016-09-27 15:32:49'),
(155, 3, '/lol lier drallco', 1, '2016-09-27 15:35:44'),
(156, 3, '/lol lier drallco', 1, '2016-09-27 15:37:08'),
(157, 3, '/lol lier drallco', 1, '2016-09-27 15:39:26'),
(158, 3, '/lol lier josstoh', 1, '2016-09-27 15:40:15'),
(159, 3, '/lol lier josstoh', 1, '2016-09-27 15:40:58'),
(160, 3, '/lol lier josstoh <@136897244027682816>', 1, '2016-09-27 15:41:47'),
(161, 3, '/lol lier drallco <@141972107599806464>', 1, '2016-09-27 15:42:01'),
(162, 3, '/lol lier josstoh <@136865764975181825> <@141972107599806464>', 1, '2016-09-27 15:42:49'),
(163, 3, '/lol lier josstoh josstoh', 1, '2016-09-27 15:43:02'),
(164, 6, 'http://www.lequipe.fr/Esport/Actualites/Starcraft-ii-marinelord-s-en-va-defier-la-coree/731449', 0, '2016-09-27 15:51:02'),
(165, 3, '/lol lier josstoh josstoh', 1, '2016-09-27 15:54:56'),
(166, 6, 'ui', 0, '2016-09-27 15:55:02'),
(167, 9, '<:bounty:230317244054241280>', 0, '2016-09-27 15:55:21'),
(168, 3, '/lol lier josstoh josstoh', 1, '2016-09-27 15:55:38'),
(169, 3, '/lol lier josstoh josstoh', 1, '2016-09-27 15:55:58'),
(170, 3, 'Mdr', 0, '2016-09-27 16:04:45'),
(171, 6, 'http://www.jeuxvideo.com/news/536637/canal-esport-club-l-emission-esport-de-canal-demarrera-des-l-automne.htm', 0, '2016-09-27 16:22:05'),
(172, 6, '<@141972107599806464> nirao', 0, '2016-09-27 16:51:23'),
(173, 4, 'mieux', 0, '2016-09-27 16:51:31'),
(174, 6, 'chintao c\'est en viet', 0, '2016-09-27 16:51:41'),
(175, 6, 'sinetchao plutot', 0, '2016-09-27 16:51:53'),
(176, 6, 'ça se resemble unp eu', 0, '2016-09-27 16:51:59'),
(177, 4, 'moui', 0, '2016-09-27 16:52:08'),
(178, 6, 'namaste c\'est bonjour en japonais?', 0, '2016-09-27 16:52:29'),
(179, 6, 'et anyongyaseo en corée', 0, '2016-09-27 16:52:33'),
(180, 6, 'chinois et vietniamien c\'est ce qui est le plus proche dans les 74 ^^', 0, '2016-09-27 16:52:51'),
(181, 4, 'oui', 0, '2016-09-27 16:52:59'),
(182, 3, '?', 0, '2016-09-27 16:55:43'),
(183, 6, 'nan rien tkt joss', 0, '2016-09-27 16:55:55'),
(184, 3, '/lol rang', 1, '2016-10-02 19:48:13'),
(185, 3, '/test', 1, '2016-10-02 19:48:26'),
(186, 3, '/test', 1, '2016-10-02 19:54:27'),
(187, 1, 'il est sympa le dernier age de glace ^^', 0, '2016-10-02 21:02:41'),
(188, 1, 'par contre le running gag de scrat devient un peu lourd je trouve :', 0, '2016-10-02 21:03:23'),
(189, 3, 'euh t\'étais pas avec nous quand on l\'a vu au ciné ?', 0, '2016-10-02 21:10:15'),
(190, 3, '/test', 1, '2016-10-02 21:50:10'),
(191, 3, '/test', 1, '2016-10-02 21:57:22'),
(192, 2, '<@136867179260805129> mythique salle des valeureux', 0, '2016-10-02 21:58:13'),
(193, 3, '/test', 1, '2016-10-02 22:00:24'),
(194, 3, '/test', 1, '2016-10-02 22:07:17'),
(195, 3, '/test', 1, '2016-10-02 22:10:27'),
(196, 3, '/test', 1, '2016-10-02 22:12:41'),
(197, 3, '/test', 1, '2016-10-02 22:14:16'),
(198, 3, '/test', 1, '2016-10-02 22:26:27'),
(199, 3, '/test', 1, '2016-10-02 22:29:40'),
(200, 3, '/test', 1, '2016-10-02 22:32:32'),
(201, 3, '/lol rang', 1, '2016-10-17 09:01:45'),
(202, 3, '/test', 1, '2016-10-17 09:02:00'),
(203, 3, '+1 <@136865764975181825>', 0, '2016-10-17 12:08:59'),
(204, 4, 'yo', 0, '2016-10-17 12:23:23'),
(205, 2, 'lu', 0, '2016-10-17 12:24:59'),
(206, 4, 'comment vas tu?', 0, '2016-10-17 12:25:12'),
(207, 3, 'hey', 0, '2016-10-17 12:25:23'),
(208, 6, 'lu', 0, '2016-10-17 12:25:29'),
(209, 2, 'ton bonheur illumine ma journée', 0, '2016-10-17 12:25:29'),
(210, 2, 'veux tu vocaliser?', 0, '2016-10-17 12:26:47'),
(211, 4, 'oui', 0, '2016-10-17 12:26:59');

-- --------------------------------------------------------

--
-- Structure de la table `musiques`
--

CREATE TABLE `musiques` (
  `id` int(11) NOT NULL,
  `url` varchar(100) NOT NULL,
  `idPlaylist` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `personnes`
--

CREATE TABLE `personnes` (
  `id` int(11) NOT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `pseudo` varchar(50) DEFAULT NULL,
  `telephone` varchar(10) DEFAULT NULL,
  `score` int(11) DEFAULT '0',
  `id_lol` varchar(25) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `personnes`
--

INSERT INTO `personnes` (`id`, `prenom`, `pseudo`, `telephone`, `score`, `id_lol`) VALUES
(1, 'Mickael', 'milow', '0683113041', 191, ''),
(2, 'Rémi', 'Shadowera', '0685775447', 374, ''),
(3, 'Jocelyn', 'Josstoh', '0677279174', 459, '38560910'),
(4, 'Corentin', 'drallco', '0624000775', 471, '28355349'),
(5, 'Erwan', 'Scrat', '0676167060', 40, ''),
(6, 'Charles', 'Nilou', '0650012970', 254, ''),
(7, 'Vincent', 'Zouk', '0684931745', 125, ''),
(8, 'Maximilien', 'Maxou', '0684931745', 10, ''),
(9, 'Clément', 'Straw', 'NONE', 0, '');

-- --------------------------------------------------------

--
-- Structure de la table `playlist`
--

CREATE TABLE `playlist` (
  `id` int(11) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `idPersonne` int(11) NOT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `postePar` int(11) DEFAULT NULL,
  `titre` varchar(20) DEFAULT NULL,
  `texte` blob,
  `reponse` varchar(100) DEFAULT NULL,
  `valeur` int(11) DEFAULT NULL,
  `gagnant` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `rappels`
--

CREATE TABLE `rappels` (
  `id` int(11) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `cible` int(11) DEFAULT NULL,
  `fait` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `sessionjeux`
--

CREATE TABLE `sessionjeux` (
  `id` int(11) NOT NULL,
  `idJeux` int(11) DEFAULT NULL,
  `idPersonne` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `tempsJeux` int(11) DEFAULT NULL,
  `enTrainDeJouer` tinyint(1) DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `sessionjeux`
--

INSERT INTO `sessionjeux` (`id`, `idJeux`, `idPersonne`, `date`, `tempsJeux`, `enTrainDeJouer`) VALUES
(1, 1, 1, '2016-09-04 17:11:52', 14, 0),
(2, 1, 4, '2016-09-04 17:11:52', 14, 0),
(3, 1, 5, '2016-09-04 17:11:52', 13, 0),
(4, 4, 6, '2016-09-04 17:11:52', 35, 1),
(5, 5, 2, '2016-09-04 17:30:45', 16, 1);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `bibliotheque`
--
ALTER TABLE `bibliotheque`
  ADD KEY `fk_jeuB` (`idJeu`),
  ADD KEY `fk_personneB` (`idPersonne`);

--
-- Index pour la table `jeux`
--
ALTER TABLE `jeux`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_personneM` (`idPersonne`);

--
-- Index pour la table `musiques`
--
ALTER TABLE `musiques`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_idPlaylist` (`idPlaylist`);

--
-- Index pour la table `personnes`
--
ALTER TABLE `personnes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_idPersonnePlaylist` (`idPersonne`);

--
-- Index pour la table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_personneQ1` (`postePar`),
  ADD KEY `fk_personneQ2` (`gagnant`);

--
-- Index pour la table `rappels`
--
ALTER TABLE `rappels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cible` (`cible`);

--
-- Index pour la table `sessionjeux`
--
ALTER TABLE `sessionjeux`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_jeuxS` (`idJeux`),
  ADD KEY `fk_personneS` (`idPersonne`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `jeux`
--
ALTER TABLE `jeux`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=212;
--
-- AUTO_INCREMENT pour la table `musiques`
--
ALTER TABLE `musiques`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `personnes`
--
ALTER TABLE `personnes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT pour la table `playlist`
--
ALTER TABLE `playlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `rappels`
--
ALTER TABLE `rappels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `sessionjeux`
--
ALTER TABLE `sessionjeux`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
