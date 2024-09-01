CREATE TABLE institution (
  institution_id SERIAL PRIMARY KEY,
  name VARCHAR,
  address VARCHAR
);

CREATE TABLE faculty (
  id SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE organization (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  address VARCHAR
);

CREATE TABLE userType (
  id SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE user_profile (
  id SERIAL PRIMARY KEY,
  usertypeId INTEGER NOT NULL REFERENCES userType(id),
  institution_id INTEGER REFERENCES institution(institution_id),
  faculty_id INTEGER REFERENCES faculty(id),
  organization_id INTEGER REFERENCES organization(id),
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  preferred_name VARCHAR,
  title VARCHAR,
  primary_email VARCHAR UNIQUE,
  orcid_identifier VARCHAR UNIQUE,
  linkedIn_url VARCHAR,
  secondary_email VARCHAR,
  mobile_phone VARCHAR,
  bio TEXT,
  research_area TEXT,
  skills TEXT,
  research_tags TEXT,
  expertise TEXT,
  tools TEXT,
  profile_picture VARCHAR,
  isScrapped BOOLEAN,
  signup_datetime TIMESTAMP
);

CREATE TABLE user_affiliations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES user_profile(id),
  institution_id INTEGER REFERENCES institution(institution_id),
  role VARCHAR
);

CREATE TABLE publication (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES user_profile(id),
  title VARCHAR,
  journal VARCHAR,
  link VARCHAR,
  date_published DATE
);

CREATE TABLE teaching_activity (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  user_id INTEGER REFERENCES user_profile(id),
  description TEXT
);

CREATE TABLE professional_details (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  user_id INTEGER REFERENCES user_profile(id),
  description TEXT
);

CREATE TABLE user_links (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES user_profile(id),
  link VARCHAR,
  name VARCHAR
);

CREATE TABLE user_media (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES user_profile(id),
  media VARCHAR,
  name VARCHAR,
  description TEXT
);

CREATE TABLE funding (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  user_id INTEGER REFERENCES user_profile(id),
  start_date DATE,
  end_date DATE,
  description TEXT
);

CREATE TABLE event (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  user_id INTEGER REFERENCES user_profile(id),
  event_start_datetime TIMESTAMP,
  event_end_datetime TIMESTAMP
);

CREATE TABLE event_attendee (
  id SERIAL PRIMARY KEY,
  event_id INTEGER REFERENCES event(id),
  user_id INTEGER REFERENCES user_profile(id),
  rsvp BOOLEAN
);

CREATE TABLE event_media (
  id SERIAL PRIMARY KEY,
  event_id INTEGER REFERENCES event(id),
  media VARCHAR,
  name VARCHAR,
  description TEXT
);

CREATE TABLE project (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  user_id INTEGER REFERENCES user_profile(id),
  commence_date DATE
);

CREATE TABLE message (
  id SERIAL PRIMARY KEY,
  message_text TEXT,
  from_user_id INTEGER REFERENCES user_profile(id),
  to_user_id INTEGER REFERENCES user_profile(id)
);

CREATE TABLE "group" (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  user_id INTEGER REFERENCES user_profile(id)
);

CREATE TABLE group_members (
  id SERIAL PRIMARY KEY,
  group_id INTEGER REFERENCES group(id),
  user_id INTEGER REFERENCES user_profile(id)
);


