# Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
# Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
# SPDX-License-Identifier: MIT
# See LICENSE.txt

import os
import logging
from logging.handlers import RotatingFileHandler

from flask import Flask
from flask_cors import CORS

from .extensions import db
from .extensions import Base


def create_app():
    app = Flask(__name__)

    if app.config["ENV"] == "production":
        app.config.from_object('config.ProductionConfig')
    elif app.config["ENV"] == "testing":
        app.config.from_object('config.TestingConfig')
    else:
        app.config.from_object('config.DevelopmentConfig')
    app.config.from_prefixed_env()
    cors = CORS(app, origins=app.config['CORS_ORIGIN'])

    db.init_app(app)

    if not app.debug and not app.testing:

        if not os.path.exists('logs'):
            os.mkdir('logs')
        file_handler = RotatingFileHandler('logs/rst.log',
                                           maxBytes=10240, backupCount=10)
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s '
            '[in %(pathname)s:%(lineno)d]'))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)

        app.logger.setLevel(logging.INFO)
        app.logger.info('RST startup')

    with app.app_context():


        from api.routes import route_blueprint
        from api.admin_login import init_admin_interface
        init_admin_interface(app)
        app.register_blueprint(route_blueprint)
        Base.prepare(autoload_with=db.engine)
        print(app.url_map)

    return app




# if __name__ == "__main__":
#     app = create_app()
#     app.run()