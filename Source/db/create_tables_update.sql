ALTER TABLE repository 
	DROP COLUMN reformatting_required,
	DROP COLUMN reformatting_require_description,
	ADD COLUMN formats_accepted_description text,
	ADD COLUMN data_submission_reqs boolean, 
	ADD COLUMN data_submission_reqs_description text, 
	ADD COLUMN data_submission_reqs_url text,
	ADD COLUMN costs_for_submission_url text,
	ADD COLUMN dua_or_cert_required_description text, 
	ADD COLUMN dua_or_cert_required_url text,
	ADD COLUMN accepts_individual_description text, 
	ADD COLUMN accepts_individual_url text,
	ADD COLUMN data_volume_description text
