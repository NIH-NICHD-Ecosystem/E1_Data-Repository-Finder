BEGIN;

CREATE TABLE IF NOT EXISTS repository
(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name text NOT NULL,
    nickname text,
	description text,
    url text,
	help_url text,
	formats_accepted_url text,
	metadata_required boolean,
	metadata_required_description text,
	metadata_required_url text,
	reformatting_required boolean,
	reformatting_require_description text,
	cost_to_submit boolean,
	costs_for_submit_description text,
	dua_or_cert_required boolean,
    accepts_individual_data boolean,
	data_access_controlled boolean,
	data_access_controlled_description text,
	data_access_controlled_url text,
	data_volume_limited boolean,
	persistent_id_used boolean,
	persistent_id_description text,
	on_fairsharing boolean,
	fairsharing_url text
);

CREATE TABLE IF NOT EXISTS affiliation
(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name text NOT NULL,
    nickname text
);

CREATE TABLE IF NOT EXISTS research_area
(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name text NOT NULL
);

CREATE TABLE IF NOT EXISTS organism
(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name text NOT NULL
);

CREATE TABLE IF NOT EXISTS data_type
(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name text NOT NULL
);

CREATE TABLE IF NOT EXISTS data_format
(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name text NOT NULL
);

CREATE TABLE IF NOT EXISTS repository_affiliation
(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    repository_id integer REFERENCES repository(id),
    affiliation_id integer REFERENCES affiliation(id)
);

CREATE TABLE IF NOT EXISTS repository_research_area
(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    repository_id integer REFERENCES repository(id),
    research_area_id integer REFERENCES research_area(id)
);

CREATE TABLE IF NOT EXISTS repository_organism
(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    repository_id integer REFERENCES repository(id),
    organism_id integer REFERENCES organism(id)
);

CREATE TABLE IF NOT EXISTS repository_data_type
(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    repository_id integer REFERENCES repository(id),
    data_type_id integer REFERENCES data_type(id)
);

CREATE TABLE IF NOT EXISTS repository_data_format
(
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    repository_id integer REFERENCES repository(id),
    data_format_id integer REFERENCES data_format(id)
);

END;