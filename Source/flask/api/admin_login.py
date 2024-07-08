# Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
# Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
# SPDX-License-Identifier: MIT
# See LICENSE.txt

from datetime import datetime

from flask import Blueprint, jsonify, request
from flask_bcrypt import Bcrypt
from flask_httpauth import HTTPBasicAuth
from .extensions import db
from .models import Repository, Affiliation, Organism, DataType, DataFormat, ResearchArea, RepositoryAffiliation, \
    RepositoryDataType, RepositoryOrganism, RepositoryResearchArea, RepositoryDataFormat, Person, RepositoryContact, \
    RepositoryAdditionalFields, DRFUser
from sqlalchemy import select, case

admin_blueprint = Blueprint('admin_blueprint', __name__)
auth = HTTPBasicAuth()


def init_admin_interface(api):
    setup_routes(api)
    api.register_blueprint(admin_blueprint, url_prefix='/admin')
    return api


def convert_boolean_value(value):
    if value == "true":
        return True
    if value == "false":
        return False


def build_repository_from_request(repository, request):
    repository.name = request.json["name"]
    repository.description = request.json["description"]
    repository.url = request.json["url"]

    if "nickname" in request.json:
        repository.nickname = request.json["nickname"]
    if "url" in request.json:
        repository.url = request.json["url"]
    if "help_url" in request.json:
        repository.help_url = request.json["help_url"]
    if "formats_accepted_url" in request.json:
        repository.formats_accepted_url = request.json["formats_accepted_url"]
    if "metadata_required" in request.json:
        repository.metadata_required = convert_boolean_value(request.json["metadata_required"])
    if "metadata_required_description" in request.json:
        repository.metadata_required_description = request.json["metadata_required_description"]
    if "metadata_required_url" in request.json:
        repository.metadata_required_url = request.json["metadata_required_url"]
    if "cost_to_submit" in request.json:
        repository.cost_to_submit = convert_boolean_value(request.json["cost_to_submit"])
    if "costs_for_submit_description" in request.json:
        repository.costs_for_submit_description = request.json["costs_for_submit_description"]
    if "dua_or_cert_required" in request.json:
        repository.dua_or_cert_required = convert_boolean_value(request.json["dua_or_cert_required"])
    if "accepts_individual_data" in request.json:
        repository.accepts_individual_data = convert_boolean_value(request.json["accepts_individual_data"])
    if "data_access_controlled" in request.json:
        repository.data_access_controlled = convert_boolean_value(request.json["data_access_controlled"])
    if "data_access_controlled_description" in request.json:
        repository.data_access_controlled_description = request.json["data_access_controlled_description"]
    if "data_access_controlled_url" in request.json:
        repository.data_access_controlled_url = request.json["data_access_controlled_url"]
    if "data_volume_limited" in request.json:
        repository.data_volume_limited = convert_boolean_value(request.json["data_volume_limited"])
    if "persistent_id_used" in request.json:
        repository.persistent_id_used = convert_boolean_value(request.json["persistent_id_used"])
    if "persistent_id_description" in request.json:
        repository.persistent_id_description = request.json["persistent_id_description"]
    if "on_fairsharing" in request.json:
        repository.on_fairsharing = convert_boolean_value(request.json["on_fairsharing"])
    if "fairsharing_url" in request.json:
        repository.fairsharing_url = request.json["fairsharing_url"]
    if "formats_accepted_description" in request.json:
        repository.formats_accepted_description = request.json["formats_accepted_description"]
    if "data_submission_reqs" in request.json:
        repository.data_submission_reqs = convert_boolean_value(request.json["data_submission_reqs"])
    if "data_submission_reqs_description" in request.json:
        repository.data_submission_reqs_description = request.json["data_submission_reqs_description"]
    if "data_submission_reqs_url" in request.json:
        repository.data_submission_reqs_url = request.json["data_submission_reqs_url"]
    if "costs_for_submission_url" in request.json:
        repository.costs_for_submission_url = request.json["costs_for_submission_url"]
    if "dua_or_cert_required_description" in request.json:
        repository.dua_or_cert_required_description = request.json["dua_or_cert_required_description"]
    if "dua_or_cert_required_url" in request.json:
        repository.dua_or_cert_required_url = request.json["dua_or_cert_required_url"]
    if "accepts_individual_description" in request.json:
        repository.accepts_individual_description = request.json["accepts_individual_description"]
    if "accepts_individual_url" in request.json:
        repository.accepts_individual_url = request.json["accepts_individual_url"]
    if "data_volume_description" in request.json:
        repository.data_volume_description = request.json["data_volume_description"]
    if "data_volume_url" in request.json:
        repository.data_volume_url = request.json["data_volume_url"]
    if "persistent_id_url" in request.json:
        repository.persistent_id_url = request.json["persistent_id_url"]
    if "generalist" in request.json:
        repository.generalist = convert_boolean_value(request.json["generalist"])
    if "status" in request.json:
        repository.status = request.json["status"]
    if "change_log_comment" in request.json:
        # datetime object containing current date and time
        now = datetime.now()

        # mm/dd/YY H:M:S
        dt_string = now.strftime("%m/%d/%Y %H:%M:%S")
        # print("date and time =", dt_string)
        if repository.change_log:
            repository.change_log = repository.change_log + "\n" + \
                                    dt_string + " " + auth.current_user() + " " + \
                                    request.json["change_log_comment"]
        else:
            repository.change_log = dt_string + " " + auth.current_user() + " " + request.json["change_log_comment"]

    return repository


def add_repository_from_request(request):
    affiliations = []
    organisms = []
    research_areas = []
    data_types = []
    data_formats = []

    repository = Repository(
        name=request.json["name"],
        description=request.json["description"],
        url=request.json["url"]
    )
    build_repository_from_request(repository, request)

    if "registering_name" in request.json:
        contact = Person(name=request.json["registering_name"])
        if "registering_email" in request.json:
            contact.email = request.json["registering_email"]
        if "registering_phone" in request.json:
            contact.phone = request.json["registering_phone"]
        db_contact = db.session.query(Person) \
            .filter(
            Person.name == contact.name and Person.email == contact.email and Person.phone == contact.phone).first()
        if db_contact:
            contact = db_contact
        else:
            db.session.add(contact)

        repository_contact = RepositoryContact(
            person=contact,
            repository=repository
        )

    if "affiliations" in request.json:
        for affiliation in request.json["affiliations"]:
            db_aff = db.session.query(Affiliation).filter(Affiliation.id == affiliation["id"]).first()
            affiliations.append(RepositoryAffiliation(
                affiliation=db_aff,
                repository=repository))

    if "organisms" in request.json:
        for organism in request.json["organisms"]:
            db_org = db.session.query(Organism).filter(Organism.id == organism["id"]).first()
            organisms.append(RepositoryOrganism(
                organism=db_org,
                repository=repository
            ))

    if "research_areas" in request.json:
        for research_area in request.json["research_areas"]:
            db_ra = db.session.query(ResearchArea).filter(ResearchArea.id == research_area["id"]).first()
            research_areas.append(RepositoryResearchArea(
                researcharea=db_ra,
                repository=repository
            ))

    if "data_types" in request.json:
        for data_type in request.json["data_types"]:
            db_dt = db.session.query(DataType).filter(DataType.id == data_type["id"]).first()
            data_types.append(RepositoryDataType(
                datatype=db_dt,
                repository=repository
            ))

    if "data_formats" in request.json:
        for data_format in request.json["data_formats"]:
            db_df = db.session.query(DataFormat).filter(DataFormat.id == data_format["id"]).first()
            data_formats.append(RepositoryDataFormat(
                dataformat=db_df,
                repository=repository
            ))

    # print(repository)

    db.session.add(repository)
    if "registering_name" in request.json:
        if repository_contact:
            db.session.add(contact)
            db.session.add(repository_contact)
    db.session.add_all(affiliations)
    db.session.add_all(research_areas)
    db.session.add_all(organisms)
    db.session.add_all(data_types)
    db.session.add_all(data_formats)

    if "new_organisms" in request.json or "new_data_types" in request.json or "new_data_formats" in request.json \
            or "new_research_areas" in request.json or "new_affiliation" in request.json:
        newFields = RepositoryAdditionalFields(repository=repository)
        if "new_organisms" in request.json:
            newFields.new_organisms = request.json["new_organisms"]
        if "new_data_types" in request.json:
            newFields.new_data_types = request.json["new_data_types"]
        if "new_data_formats" in request.json:
            newFields.new_data_formats = request.json["new_data_formats"]
        if "new_research_areas" in request.json:
            newFields.new_research_areas = request.json["new_research_areas"]
        if "new_affiliations" in request.json:
            newFields.new_affiliations = request.json["new_affiliations"]
        db.session.add(newFields)

    db.session.commit()

    return repository


# Build add and remove lists for a facet
def build_add_remove_list(repo_id, facet_list, list_type):
    id_list = []
    for item in facet_list:
        id_list.append(item['id'])

    # print(id_list)

    if list_type == "Affiliations":
        statement = select(RepositoryAffiliation.affiliation_id).filter(RepositoryAffiliation.repository_id == repo_id)
    elif list_type == "Organisms":
        statement = select(RepositoryOrganism.organism_id).filter(RepositoryOrganism.repository_id == repo_id)
    elif list_type == "ResearchAreas":
        statement = select(RepositoryResearchArea.research_area_id).filter(
            RepositoryResearchArea.repository_id == repo_id)
    elif list_type == "DataTypes":
        statement = select(RepositoryDataType.data_type_id).filter(RepositoryDataType.repository_id == repo_id)
    elif list_type == "DataFormats":
        statement = select(RepositoryDataFormat.data_format_id).filter(RepositoryDataFormat.repository_id == repo_id)

    rows = db.session.scalars(statement).all()
    # print(rows)

    add_list = []
    remaining_list = rows.copy()

    for new_id in id_list:
        if new_id not in rows:
            add_list.append(new_id)

    for old_id in rows:
        if old_id in id_list:
            remaining_list.remove(old_id)

    return add_list, remaining_list


def update_repository_contact(repository, update_request):
    person = db.session.query(Person).filter(Person.name == update_request.json["registering_name"]).first()

    if not person:
        person = Person(name=update_request.json["registering_name"])

        if "registering_phone" in update_request.json:
            person.phone = update_request.json["registering_phone"]
        if "registering_email" in update_request.json:
            person.email = update_request.json["registering_email"]

        db.session.add(person)

        old_repo_contact = db.session.query(RepositoryContact).filter(
            RepositoryContact.repo_id == repository.id).first()
        if old_repo_contact:
            db.session.delete(old_repo_contact)

        db.session.add(RepositoryContact(person=person, repository=repository))

    else:
        if "registering_phone" in update_request.json:
            person.phone = update_request.json["registering_phone"]
        if "registering_email" in update_request.json:
            person.email = update_request.json["registering_email"]

        old_repo_contact = db.session.query(RepositoryContact).filter(
            RepositoryContact.repo_id == repository.id).first()

        if old_repo_contact:
            if old_repo_contact.person_id != person.id:
                db.session.delete(old_repo_contact)
                db.session.add(RepositoryContact(person=person, repository=repository))


def update_repository_additional_fields(repository, update_request):
    add_fields = db.session.query(RepositoryAdditionalFields).filter(
        RepositoryAdditionalFields.repository_id == repository.id).first()

    if not add_fields:
        new_add_fields = RepositoryAdditionalFields()
        new_add_fields.repository_id = repository.id

        if "new_affiliations" in update_request.json and update_request.json["new_affiliations"] != "":
            new_add_fields.new_affiliation = update_request.json["new_affiliations"]
        if "new_organisms" in update_request.json and update_request.json["new_organisms"] != "":
            new_add_fields.new_organisms = update_request.json["new_organisms"]
        if "new_data_types" in update_request.json and update_request.json["new_data_types"] != "":
            new_add_fields.new_data_types = update_request.json["new_data_types"]
        if "new_data_formats" in update_request.json and update_request.json["new_data_formats"] != "":
            new_add_fields.new_data_formats = update_request.json["new_data_formats"]
        if "new_research_areas" in update_request.json and update_request.json["new_research_areas"] != "":
            new_add_fields.new_research_areas = update_request.json["new_research_areas"]

        db.session.add(new_add_fields)
    else:
        empty_fields_count = 0
        if "new_affiliations" in update_request.json:
            if update_request.json["new_affiliations"] == "":
                add_fields.new_affiliation = None
                empty_fields_count += 1
            else:
                add_fields.new_affiliation = update_request.json["new_affiliations"]
        if "new_organisms" in update_request.json:
            if update_request.json["new_organisms"] == "":
                add_fields.new_organisms = None
                empty_fields_count += 1
            else:
                add_fields.new_organisms = update_request.json["new_organisms"]
        if "new_data_types" in update_request.json:
            if update_request.json["new_data_types"] == "":
                add_fields.new_data_types = None
                empty_fields_count += 1
            else:
                add_fields.new_data_types = update_request.json["new_data_types"]
        if "new_data_formats" in update_request.json:
            if update_request.json["new_data_formats"] == "":
                add_fields.new_data_formats = None
                empty_fields_count += 1
            else:
                add_fields.new_data_formats = update_request.json["new_data_formats"]
        if "new_research_areas" in update_request.json:
            if update_request.json["new_research_areas"] == "":
                add_fields.new_research_areas = None
                empty_fields_count += 1
            else:
                add_fields.new_research_areas = update_request.json["new_research_areas"]

        if empty_fields_count == 5:  # If all additional fields are empty remove the record from the database
            db.session.delete(add_fields)


def add_affiliation(affiliation, repository):
    db_aff = db.session.query(Affiliation).filter(
        Affiliation.id == affiliation).first()
    db.session.add(RepositoryAffiliation(
        affiliation_id=db_aff.id,
        repository_id=repository.id
    ))


def update_affiliations(add_list, remove_list, repository):
    for affiliation in add_list:
        db_aff = db.session.query(Affiliation).filter(
            Affiliation.id == affiliation).first()
        db.session.add(RepositoryAffiliation(
            affiliation_id=db_aff.id,
            repository_id=repository.id
        ))

    for affiliation in remove_list:
        db_aff = db.session.query(RepositoryAffiliation).filter(
            RepositoryAffiliation.affiliation_id == affiliation,
            RepositoryAffiliation.repository_id == repository.id).first()
        db.session.delete(db_aff)


def update_organisms(add_list, remove_list, repository_id):
    for organism in add_list:
        db_org = db.session.query(Organism).filter(Organism.id == organism).first()
        db.session.add(RepositoryOrganism(
            organism_id=db_org.id,
            repository_id=repository_id
        ))

    for organism in remove_list:
        db_org = db.session.query(RepositoryOrganism).filter(
            RepositoryOrganism.organism_id == organism, RepositoryOrganism.repository_id == repository_id).first()
        db.session.delete(db_org)


def update_research_areas(add_list, remove_list, repository):
    for research_area in add_list:
        db_ra = db.session.query(ResearchArea).filter(
            ResearchArea.id == research_area).first()
        db.session.add(RepositoryResearchArea(
            research_area_id=db_ra.id,
            repository_id=repository.id
        ))

    for research_area in remove_list:
        db_ra = db.session.query(RepositoryResearchArea).filter(
            RepositoryResearchArea.research_area_id == research_area,
            RepositoryResearchArea.repository_id == repository.id).first()
        db.session.delete(db_ra)


def update_data_types(add_list, remove_list, repository):
    for data_type in add_list:
        db_dt = db.session.query(DataType).filter(DataType.id == data_type).first()
        db.session.add(RepositoryDataType(
            data_type_id=db_dt.id,
            repository_id=repository.id
        ))

    for data_type in remove_list:
        db_dt = db.session.query(RepositoryDataType).filter(
            RepositoryDataType.data_type_id == data_type,
            RepositoryDataType.repository_id == repository.id).first()
        db.session.delete(db_dt)


def update_data_formats(add_list, remove_list, repository):
    for data_format in add_list:
        db_df = db.session.query(DataFormat).filter(DataFormat.id == data_format).first()
        db.session.add(RepositoryDataFormat(
            data_format_id=db_df.id,
            repository_id=repository.id
        ))

    for data_format in remove_list:
        db_df = db.session.query(RepositoryDataFormat).filter(
            RepositoryDataFormat.data_format_id == data_format,
            RepositoryDataFormat.repository_id == repository.id).first()
        db.session.delete(db_df)


def update_repository_from_request(repo_id, update_request):
    repository = db.session.query(Repository).where(Repository.id == repo_id).first()
    build_repository_from_request(repository, request)

    if "affiliations" in update_request.json:
        add_affiliations, remove_affiliations = build_add_remove_list(repo_id, update_request.json["affiliations"],
                                                                      "Affiliations")
        update_affiliations(add_list=add_affiliations, remove_list=remove_affiliations, repository=repository)
    if "organisms" in update_request.json:
        add_organisms, remove_organisms = build_add_remove_list(repo_id, update_request.json["organisms"], "Organisms")
        update_organisms(add_list=add_organisms, remove_list=remove_organisms, repository_id=repository.id)
    if "research_areas" in update_request.json:
        add_research_areas, remove_research_areas = build_add_remove_list(repo_id,
                                                                          update_request.json["research_areas"],
                                                                          "ResearchAreas")
        update_research_areas(add_list=add_research_areas, remove_list=remove_research_areas, repository=repository)
    if "data_types" in update_request.json:
        add_data_types, remove_data_types = build_add_remove_list(repo_id, update_request.json["data_types"],
                                                                  "DataTypes")
        update_data_types(add_list=add_data_types, remove_list=remove_data_types, repository=repository)
    if "data_formats" in update_request.json:
        add_data_formats, remove_data_formats = build_add_remove_list(repo_id, update_request.json["data_formats"],
                                                                      "DataFormats")
        update_data_formats(add_list=add_data_formats, remove_list=remove_data_formats, repository=repository)

    if "registering_name" in update_request.json or "registering_phone" in update_request.json \
            or "registering_email" in update_request.json:
        update_repository_contact(repository, update_request)

    if repository.status == "Published" or repository.status == "Ready for Publish":
        print('Updating already published repo')
        publish_additional_field_values(repo_id)
    else:
        if "new_organisms" in update_request.json or "new_data_types" in update_request.json \
                or "new_data_formats" in update_request.json or "new_research_areas" in update_request.json \
                or "new_affiliation" in update_request.json:
            update_repository_additional_fields(repository, update_request)

    # print(repository)

    db.session.commit()

    return repository


def publish_additional_field_values(repo_id):
    # Add any new values to lookup fields
    if "new_affiliations" in request.json and request.json["new_affiliations"] is not None:
        new_affiliations = request.json["new_affiliations"]

        if isinstance(request.json["new_affiliations"], str) and request.json["new_affiliations"] != "":
            new_affiliations = parse_new_fields(new_affiliations)
        for affiliation in new_affiliations:
            db_aff = Affiliation(name=affiliation)
            db.session.add(db_aff)
            db.session.flush()
            db.session.add(RepositoryAffiliation(repository_id=repo_id, affiliation_id=db_aff.id))

    if "new_organisms" in request.json:
        new_organisms = request.json["new_organisms"]

        if isinstance(request.json["new_organisms"], str) and request.json["new_organisms"] != "":
            new_organisms = parse_new_fields(new_organisms)

        for organism in new_organisms:
            db_org = Organism(name=organism)
            db.session.add(db_org)
            db.session.flush()
            db.session.add(RepositoryOrganism(repository_id=repo_id, organism_id=db_org.id))

    if "new_data_types" in request.json:
        new_data_types = request.json["new_data_types"]

        if isinstance(request.json["new_data_types"], str) and request.json["new_data_types"] != "":
            new_data_types = parse_new_fields(new_data_types)
        for dt in new_data_types:
            db_dt = DataType(name=dt)
            db.session.add(db_dt)
            db.session.flush()
            db.session.add(RepositoryDataType(repository_id=repo_id, data_type_id=db_dt.id))

    if "new_data_formats" in request.json:
        new_data_formats = request.json["new_data_formats"]

        if isinstance(request.json["new_data_formats"], str) and request.json["new_data_formats"] != "":
            new_data_formats = parse_new_fields(new_data_formats)
        for df in new_data_formats:
            db_df = DataFormat(name=df)
            db.session.add(db_df)
            db.session.flush()
            db.session.add(RepositoryDataFormat(repository_id=repo_id, data_format_id=db_df.id))

    if "new_research_areas" in request.json:
        new_research_areas = request.json["new_research_areas"]

        if isinstance(request.json["new_research_areas"], str) and request.json["new_research_areas"] != "":
            new_research_areas = parse_new_fields(new_research_areas)
        for ra in new_research_areas:
            db_ra = ResearchArea(name=ra)
            db.session.add(db_ra)
            db.session.flush()
            db.session.add(RepositoryResearchArea(repository_id=repo_id, research_area_id=db_ra.id))

    # Remove additional fields entry
    db_additional_fields = db.session.query(RepositoryAdditionalFields) \
        .filter(RepositoryAdditionalFields.repository_id == repo_id).first()
    if db_additional_fields:
        db.session.delete(db_additional_fields)


def parse_new_fields(value):
    parsed = [x.strip() for x in value.split(',')]

    # print(parsed)
    return parsed


def setup_routes(api):
    bcrypt = Bcrypt(api)

    @auth.verify_password
    def verify_basic_authentication_inputs(username, password):
        user = db.session.query(DRFUser).filter(DRFUser.username == username).first()
        if user and bcrypt.check_password_hash(user.password_hash,
                                               password):  # check plain text password against bcrypted record
            return username

    @admin_blueprint.route('/whoami', methods=['GET', 'POST'])
    @auth.login_required
    def whoami():
        return jsonify({"username": auth.current_user()})

    @admin_blueprint.route('/repositories')
    @auth.login_required
    def show_all():
        status_order = {'Ready for Publish': 0, 'In Review': 1, 'Draft': 2, 'Published': 3}
        sort_logic = case(value=Repository.status, whens=status_order).label("status")
        repos = db.session.query(Repository).order_by(sort_logic).all()
        repos = [repo.serialize_repository() for repo in repos]

        return jsonify({"repositories": repos})

    @admin_blueprint.route('/repositories/<id>')
    @auth.login_required
    def show():
        repo = db.session.query(Repository).filter(Repository.id == id).one()
        return jsonify(repo.serialize_repository())

    @admin_blueprint.route('/repositories/extended/<id>')
    @auth.login_required()
    def get_repository_details(id):
        repo = db.session.query(Repository) \
            .outerjoin(RepositoryAdditionalFields, Repository.id == RepositoryAdditionalFields.repository_id) \
            .filter(Repository.id == id).one()
        return jsonify(repo.serialize_repository(True))

    @admin_blueprint.route('/repositories/add', methods=['POST'])
    @auth.login_required
    def add():
        repo = add_repository_from_request(request)
        # print(repo)

        return jsonify(repo.serialize_repository())

    @admin_blueprint.route('/repositories/<id>/update', methods=['POST'])
    @auth.login_required
    def update(id):
        repo = update_repository_from_request(id, request)
        # print(repo)
        return jsonify(repo.serialize_repository())

    @admin_blueprint.route('/repositories/<id>/edit', methods=['POST'])
    @auth.login_required
    def edit(id):
        repo = db.session.query(Repository).filter(Repository.id == id).one()
        return jsonify(repo.serialize_repository())

    @admin_blueprint.route('/repositories/<id>/approve', methods=['POST'])
    @auth.login_required
    def approve(id):
        repo = db.session.query(Repository).filter(Repository.id == id).one()
        repo.status = 'Published'
        db.session.commit()

        return jsonify(repo.serialize_repository())

    @admin_blueprint.route('/repositories/<id>/review', methods=['POST'])
    @auth.login_required
    def review(id):
        repo = db.session.query(Repository).filter(Repository.id == id).one()
        repo.status = 'In Review'
        db.session.commit()

        return jsonify(repo.serialize_repository())

    @admin_blueprint.route('/repositories/<id>/ready', methods=['POST'])
    @auth.login_required
    def ready(id):
        publish_additional_field_values(id)

        repo = db.session.query(Repository).filter(Repository.id == id).one()
        repo.status = 'Ready for Publish'
        db.session.commit()

        return jsonify(repo.serialize_repository())

    @admin_blueprint.route('/repositories/<id>/reject')
    @auth.login_required
    def delete(id):
        repo = db.session.query(Repository).filter(Repository.id == id).one()
        return jsonify(repo.serialize_repository())

    @admin_blueprint.route('repositories/<id>/status', methods=['GET'])
    @auth.login_required
    def status(id):
        repo = db.session.query(Repository).filter(Repository.id == id).one()
        return jsonify(repo.serialize_repository())
