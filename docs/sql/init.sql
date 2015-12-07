DROP TABLE IF EXISTS `topic`;
DROP TABLE IF EXISTS `post`;
DROP TABLE IF EXISTS `comment`;

CREATE TABLE `topic` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `created_timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `post_count` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=latin1;

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
) DEFAULT CHARSET=latin1;

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
) DEFAULT CHARSET=latin1;

INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('1', 'funny', CURRENT_TIMESTAMP, '0');
INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('2', 'politics', CURRENT_TIMESTAMP, '0');
INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('3', 'cute', CURRENT_TIMESTAMP, '0');
INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('5', 'movies', CURRENT_TIMESTAMP, '0');
INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('6', 'games', CURRENT_TIMESTAMP, '0');
INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('7', 'animals', CURRENT_TIMESTAMP, '0');
INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('8', 'gifs', CURRENT_TIMESTAMP, '0');
INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('9', 'tech', CURRENT_TIMESTAMP, '0');
INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('10', 'news', CURRENT_TIMESTAMP, '0');
INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('11', 'celebrity', CURRENT_TIMESTAMP, '0');
INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('12', 'nature', CURRENT_TIMESTAMP, '0');
INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('13', 'art', CURRENT_TIMESTAMP, '0');
INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('14', 'music', CURRENT_TIMESTAMP, '0');
INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('15', 'random', CURRENT_TIMESTAMP, '0');