CREATE TABLE `harmonyHitScores` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`score` int NOT NULL,
	`difficulty` varchar(20) NOT NULL,
	`combo` int NOT NULL DEFAULT 0,
	`accuracy` int NOT NULL DEFAULT 0,
	`playedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `harmonyHitScores_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `kindnessQuestProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`milestoneId` int NOT NULL,
	`completed` int NOT NULL DEFAULT 0,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `kindnessQuestProgress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `peaceArtworks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`imageUrl` varchar(500) NOT NULL,
	`likes` int NOT NULL DEFAULT 0,
	`isPublic` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `peaceArtworks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userAchievements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`badgeType` varchar(50) NOT NULL,
	`earnedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `userAchievements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userProfiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`bio` text,
	`avatar` varchar(500),
	`totalScore` int NOT NULL DEFAULT 0,
	`harmonyHitHighScore` int NOT NULL DEFAULT 0,
	`kindnessQuestCompleted` int NOT NULL DEFAULT 0,
	`peaceArtworksCreated` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userProfiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `userProfiles_userId_unique` UNIQUE(`userId`)
);
