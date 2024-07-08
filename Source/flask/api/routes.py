# Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
# Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
# SPDX-License-Identifier: MIT
# See LICENSE.txt

import psycopg2
import ast

from flask import Blueprint, jsonify, request
from .extensions import db
from .models import Repository, Affiliation, Organism, DataType, DataFormat, ResearchArea, RepositoryAffiliation, \
    RepositoryDataType, RepositoryOrganism, RepositoryResearchArea, RepositoryDataFormat
from sqlalchemy import or_, and_, select

route_blueprint = Blueprint('route_blueprint', __name__)


def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="nichd",
        user="postgres",
        password="admin")

    return conn


def parseStrListToList(arg_string):
    return ast.literal_eval(arg_string)


def buildRepositoryQueryFromRequest(request):
    affiliation_arg = request.args.get("affiliation")
    organisms_arg = request.args.get("organisms")
    fee_arg = request.args.get("fee")
    data_type_arg = request.args.get("data_types")
    data_format_arg = request.args.get("data_formats")
    data_access_arg = request.args.get("ac")
    data_volume_arg = request.args.get("volume_limit")
    research_areas_arg = request.args.get("research_areas")
    metadata_arg = request.args.get("metadata")
    individual_arg = request.args.get("individual")
    cert_required_arg = request.args.get("cert_required")
    name_arg = request.args.get("names")

    query = db.session.query(Repository)

    # Filter out unpublished repositories
    query = query.filter(Repository.status == "Published")

    # Keyword search on name or nickname
    if name_arg:
        names_list = ast.literal_eval(name_arg)

        conditions = []
        for name in names_list:
            # query = query.filter(
            #     or_(Repository.name.ilike('%{}%'.format(name)), Repository.nickname.ilike('%{}%'.format(name))))
            conditions.append(Repository.name.ilike('%{}%'.format(name)))
            conditions.append(Repository.nickname.ilike('%{}%'.format(name)))
        query = query.filter(or_(*conditions))

    if organisms_arg:
        organisms_list = ast.literal_eval(organisms_arg)
        query = query.join(RepositoryOrganism, Repository.id == RepositoryOrganism.repository_id)
        query = query.join(Organism, RepositoryOrganism.organism_id == Organism.id)
        query = query.filter(or_(Repository.generalist, Organism.id.in_(organisms_list)))

    if research_areas_arg:
        research_areas = ast.literal_eval(research_areas_arg)
        query = query.join(RepositoryResearchArea, Repository.id == RepositoryResearchArea.repository_id)
        query = query.join(ResearchArea, RepositoryResearchArea.research_area_id == ResearchArea.id)
        query = query.filter(or_(Repository.generalist, ResearchArea.id.in_(research_areas)))

    if affiliation_arg:
        affiliation_list = ast.literal_eval(affiliation_arg)
        query = query.join(RepositoryAffiliation, Repository.id == RepositoryAffiliation.repository_id)
        query = query.join(Affiliation, RepositoryAffiliation.affiliation_id == Affiliation.id)
        query = query.filter(Affiliation.id.in_(affiliation_list))

    if data_type_arg:
        data_type_list = ast.literal_eval(data_type_arg)
        query = query.join(RepositoryDataType, Repository.id == RepositoryDataType.repository_id)
        query = query.join(DataType, RepositoryDataType.data_type_id == DataType.id)
        query = query.filter(or_(Repository.generalist, DataType.id.in_(data_type_list)))

    if data_format_arg:
        data_format_list = ast.literal_eval(data_format_arg)
        data_format_list.append(41)  # 'All'
        data_format_list.append(55)  # 'flexible'
        data_format_list.append(61)  # 'Other'
        query = query.join(RepositoryDataFormat, Repository.id == RepositoryDataFormat.repository_id)
        query = query.join(DataFormat, RepositoryDataFormat.data_format_id == DataFormat.id)
        query = query.filter(or_(Repository.generalist, DataFormat.id.in_(data_format_list)))

    if metadata_arg:
        query = query.filter(Repository.metadata_required == metadata_arg)

    if fee_arg:
        query = query.filter(Repository.cost_to_submit == fee_arg)

    if individual_arg:
        query = query.filter(Repository.accepts_individual_data == individual_arg)

    if data_access_arg:
        query = query.filter(Repository.data_access_controlled == data_access_arg)

    if cert_required_arg:
        query = query.filter(Repository.dua_or_cert_required == cert_required_arg)

    if data_volume_arg:
        query = query.filter(Repository.data_volume_limited == data_volume_arg)

    if data_access_arg:
        query = query.filter(Repository.data_access_controlled == data_access_arg)

    query = query.order_by(Repository.generalist.asc())

    return query


@route_blueprint.route('/repositories')
def get_repositories():
    keyword_arg = request.args.get('keyword')

    if len(request.args) > 0:
        query = buildRepositoryQueryFromRequest(request)
        repos = query.all()
        dash = None
        for idx, repo in enumerate(repos):
            if repo.name == "NICHD Data and Specimen Hub":
                dash = repos.pop(idx)

        if dash is not None:
            repos.insert(0, dash)

    else:
        # Find NICHD DASH first so we can force it to the top of the list
        dash = db.session.query(Repository).filter(Repository.name == 'NICHD Data and Specimen Hub').all()
        repos = dash + db.session.query(Repository).filter(
            and_(Repository.name != 'NICHD Data and Specimen Hub', Repository.status == "Published")).all()

    repos = [repo.serialize_repository() for repo in repos]

    return jsonify({"repositories": repos})


@route_blueprint.route('/repositories/<id>')
def get_repository_details(id):
    repo = db.session.query(Repository).filter(Repository.id == id).one()
    return jsonify(repo.serialize_repository())


@route_blueprint.route('/repositories/compare')
def get_repository_compare():
    print(request.query_string)
    ids = []
    repo1 = request.args.get('repo1')
    print(repo1)
    if (request.args.get('repo1')):
        ids.append(request.args.get('repo1'))
    if (request.args.get('repo2')):
        ids.append(request.args.get('repo2'))
    if (request.args.get('repo3')):
        ids.append(request.args.get('repo3'))
    print(ids)
    repos = db.session.query(Repository).filter(Repository.name.in_(ids))
    repos = [repo.serialize_repository() for repo in repos]

    return jsonify({"repositories": repos})


@route_blueprint.route('/names')
def get_repository_names():
    repos = db.session.query(Repository.name, Repository.nickname).order_by(Repository.name)\
        .filter(Repository.status == "Published").all()

    return jsonify([i._asdict() for i in repos])


@route_blueprint.route('/branches')
def get_branches():
    branches = db.session.query(Affiliation).order_by(Affiliation.name).all()

    return jsonify([i.as_dict() for i in branches])


@route_blueprint.route('/organisms')
def get_organisms():
    organisms = db.session.query(Organism).order_by(Organism.name).all()

    return jsonify([i.as_dict() for i in organisms])


@route_blueprint.route('/data_types')
def get_data_types():
    data_types = db.session.query(DataType).order_by(DataType.name).all()

    return jsonify([i.as_dict() for i in data_types])


@route_blueprint.route('/data_formats')
def get_data_formats():
    data_formats = db.session.query(DataFormat).filter(~DataFormat.name.in_(['All', 'flexible', 'Other'])).order_by(
        DataFormat.name).all()

    return jsonify([i.as_dict() for i in data_formats])


@route_blueprint.route('/data_formats_unfiltered')
def get_data_formats_unfiltered():
    data_formats = db.session.query(DataFormat).order_by(DataFormat.name).all()

    return jsonify([i.as_dict() for i in data_formats])


@route_blueprint.route('/research_areas')
def get_research_areas():
    research_areas = db.session.query(ResearchArea).order_by(ResearchArea.name).all()

    return jsonify([i.as_dict() for i in research_areas])
