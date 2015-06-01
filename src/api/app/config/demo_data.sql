PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
INSERT INTO "users" VALUES(1,0,'Vasya','qwerty','$2y$10$242oT3aJ4zRZkqnbD1jhKeNVL1hXTta0DCxH3ZsZqMTt9AvKf46SO',NULL,1,2); --123456
INSERT INTO "users" VALUES(2,0,'DrDaemos','daemos','$2y$10$aQAo45HdJgyAlsDZNX3Lxua5EPsyBbILTl1EdjPPs7qUyr31i1E8i',NULL,1,1); --daemos
INSERT INTO "users" VALUES(3,0,'Michael','alive','$2y$10$5wedYLQuY29CAE7uLMar3u1a6kU9FGEei7tSsvKr0NSy11ViniXQq',NULL,1,1); --tolkonemishka
INSERT INTO "users" VALUES(4,1,'Oopsie','deleted','$2y$10$MJ5yrE7owbqNfjLk5oSg4etFlfe7kqsBT7Bx9pLHwxdqZKKoZ5AkW',NULL,0,1); --deleted
INSERT INTO "users_roles" VALUES(1,'Developer');
INSERT INTO "users_roles" VALUES(2,'Project Manager');
INSERT INTO "users_projects" VALUES(1,1);
INSERT INTO "users_projects" VALUES(1,2);
INSERT INTO "users_projects" VALUES(1,3);
INSERT INTO "users_tasks" VALUES(2,1);
INSERT INTO "projects" VALUES(1,NULL,'Confluent Draft',2,'New project tracking system',NULL,'DRAFT',NULL);
INSERT INTO "projects" VALUES(2,NULL,'Confluent Draft testing',1,' Prepare test cases and testing automation',NULL,'TEST',NULL);
INSERT INTO "projects" VALUES(3,NULL,'Draft bugs',2,'Issue tracking',NULL,'BUG',NULL);
INSERT INTO "projects_states" VALUES(1,'On hold');
INSERT INTO "projects_states" VALUES(2,'In progress');
INSERT INTO "projects_states" VALUES(3,'Finished');
INSERT INTO "tasks" VALUES(1,NULL,'Prepare UML Diagrams for a project',1,2,'Use Case, Classes, ER, Deployment and DFD are needed','480','120',NULL);
INSERT INTO "tasks" VALUES(2,NULL,'Describe program business model and processes',1,1,'A few pages should be enough.',NULL,NULL,NULL);
INSERT INTO "tasks" VALUES(3,NULL,'Configure build system',1,1,'I recommend using grunt, look for some examples at blabla.com',NULL,NULL,NULL);
INSERT INTO "tasks_states" VALUES(1,'Opened');
INSERT INTO "tasks_states" VALUES(2,'In progress');
INSERT INTO "tasks_states" VALUES(3,'Completed');
INSERT INTO "tasks_states" VALUES(4,'Approved');
INSERT INTO "project_files" VALUES(1,0,'Draft specification','/files/1/draft.doc',1,1);
INSERT INTO "tasks_comments" VALUES(1,1,1,'Blabla comment from james', NULL);
INSERT INTO "tasks_comments" VALUES(2,2,1,'Blabla comment from daemos huehue', NULL);
DELETE FROM sqlite_sequence;
INSERT INTO "sqlite_sequence" VALUES('options',1);
INSERT INTO "sqlite_sequence" VALUES('users',4);
INSERT INTO "sqlite_sequence" VALUES('users_roles',2);
INSERT INTO "sqlite_sequence" VALUES('options',1);
INSERT INTO "sqlite_sequence" VALUES('users',4);
INSERT INTO "sqlite_sequence" VALUES('users_roles',2);
INSERT INTO "sqlite_sequence" VALUES('tasks_states',4);
INSERT INTO "sqlite_sequence" VALUES('projects_states',3);
INSERT INTO "sqlite_sequence" VALUES('tasks',3);
INSERT INTO "sqlite_sequence" VALUES('projects',3);
INSERT INTO "sqlite_sequence" VALUES('project_files',1);
INSERT INTO "sqlite_sequence" VALUES('tasks_comments',2);
COMMIT;
