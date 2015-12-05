DROP TABLE IF EXISTS `topic`;
DROP TABLE IF EXISTS `post`;
DROP TABLE IF EXISTS `comment`;

CREATE TABLE `topic` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `created_timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `post_count` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `post` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `topic_id` int(11) NOT NULL,
  `created_timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL DEFAULT '',
  `score` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `comment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(1024) NOT NULL DEFAULT '',
  `post_id` int(11) NOT NULL,
  `replied_id` int(11) NOT NULL DEFAULT '-1',
  `score` int(11) NOT NULL DEFAULT '0',
  `created_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('1', 'Funny', CURRENT_TIMESTAMP, '0');
INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('2', 'Cats', CURRENT_TIMESTAMP, '0');
INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('3', 'Dogs', CURRENT_TIMESTAMP, '0');
INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('5', 'Money', CURRENT_TIMESTAMP, '0');
INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('6', 'Democrats', CURRENT_TIMESTAMP, '0');
INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('7', 'Pictures', CURRENT_TIMESTAMP, '0');
INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('8', 'Animals', CURRENT_TIMESTAMP, '0');
INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('9', 'Games', CURRENT_TIMESTAMP, '0');
INSERT INTO `topic` (`id`, `name`, `created_timestamp`, `post_count`) VALUES ('10', 'Republicans', CURRENT_TIMESTAMP, '0');
