--DELETE FROM dev.users;
INSERT INTO dev.users (username, email, password) 
VALUES 
  ('john_doe', 'john.doe@example.com', 'password123'),
  ('jane_doe', 'jane.doe@example.com', 'password456'),
  ('bob_smith', 'bob.smith@example.com', 'password789');
 SELECT * FROM dev.users;