# Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
# Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
# SPDX-License-Identifier: MIT
# See LICENSE.txt

import os
basedir = os.path.abspath(os.path.dirname(__file__))


def build_db_uri(dialect=None, driver=None, port=None, username=None, host=None, database=None):
    import urllib.parse
    if dialect is None:
        dialect = 'postgresql'
    if driver:
        driver = '+' + driver
    else:
        driver = ''
    if port is None:
        port = os.environ.get('DRF_SQLALCHEMY_PORT', 5432)
    password = urllib.parse.quote_plus(os.environ.get('DRF_SQLALCHEMY_PASSWORD', ""))
    host = os.environ.get('DRF_SQLALCHEMY_HOST', host)
    database = os.environ.get('DRF_SQLALCHEMY_DATABASE', database)
    username = os.environ.get('DRF_SQLALCHEMY_USER', username)
    return "{}{}://{}:{}@{}:{}/{}".format(
        dialect, driver, username, password, host, port, database)


class Config:
    DEBUG = False
    DEVELOPMENT = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = build_db_uri(username='postgres', host='localhost', database='nichd')
    DATABASE_USER = os.environ.get('DRF_SQLALCHEMY_USER', 'postgres')
    DATABASE_PASSWORD = os.environ.get('DRF_SQLALCHEMY_PASSWORD', "")
    CORS_ORIGIN = 'mydomain.com'


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = build_db_uri(username='',
                                           host='',
                                           database='')
    DATABASE_USER = os.environ.get('DRF_SQLALCHEMY_USER', '')
    DATABASE_PASSWORD = os.environ.get('DRF_SQLALCHEMY_PASSWORD', "")
    CORS_ORIGIN = ''


class TestingConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = build_db_uri(username='postgres', host='localhost', database='nichd')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DATABASE_USER = os.environ.get('DRF_SQLALCHEMY_USER', 'postgres')
    DATABASE_PASSWORD = os.environ.get('DRF_SQLALCHEMY_PASSWORD', "postgres")
    CORS_ORIGIN = '*'


class DevelopmentConfig(Config):
    DEBUG = True
    DEVELOPMENT = True
    SQLALCHEMY_DATABASE_URI = build_db_uri(username='', host='localhost', database='')
    DATABASE_USER = os.environ.get('DRF_SQLALCHEMY_USER', '')
    DATABASE_PASSWORD = os.environ.get('DRF_SQLALCHEMY_PASSWORD', "")
    CORS_ORIGIN = '*'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
