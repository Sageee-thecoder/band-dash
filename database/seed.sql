INSERT INTO users (name, email, role)
VALUES
  ('Manager', 'manager@rnusmusic.com', 'manager'),
  ('Member A', 'membera@rnusmusic.com', 'member'),
  ('Member B', 'memberb@rnusmusic.com', 'member');

INSERT INTO songs (title, stage, is_published)
VALUES
  ('Night Frequency', 'draft', FALSE),
  ('Ocean Glass', 'melody', FALSE),
  ('Saturn Echo', 'publish', TRUE);
