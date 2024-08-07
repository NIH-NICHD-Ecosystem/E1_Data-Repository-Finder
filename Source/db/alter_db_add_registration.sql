CREATE TYPE publish_status AS ENUM ('Published', 'In Review', 'Ready for Publish','Draft');

ALTER TABLE repository 
	add column status publish_status NOT NULL DEFAULT 'Draft',
	add column change_log text,
	add column persistent_id_url text,
	add column data_volume_url text;

UPDATE repository set status = 'Published';

CREATE TABLE IF NOT EXISTS Person (
	id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name text NOT NULL,
	phone text,
	email text
);

CREATE TABLE IF NOT EXISTS repository_contact (
	    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
   	    repo_id integer NOT NULL REFERENCES Repository(id),
        person_id integer NOT NULL REFERENCES Person(id)
);

CREATE TABLE IF NOT EXISTS repository_additional_fields (
	id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	repository_id integer NOT NULL REFERENCES Repository(id),
	new_affiliation text,
	new_organisms text,
	new_data_types text,
	new_data_formats text,
	new_research_areas text
)

CREATE TABLE IF NOT EXISTS drf_user (
	id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	username text NOT NULL,
	password_hash text NOT NULL
)