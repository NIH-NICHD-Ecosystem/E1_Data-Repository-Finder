# Copyright 2024, MASSACHUSETTS INSTITUTE OF TECHNOLOGY
# Subject to FAR 52.227-11 – Patent Rights – Ownership by the Contractor (May 2014).
# SPDX-License-Identifier: MIT
# See LICENSE.txt

from api.extensions import Base

class Repository(Base):
    __tablename__= "repository"

    def serialize_repository(self, preview=False):
        ret = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        if self.repositoryaffiliation_collection:
            affiliations = [affiliation.serialize_repository_affiliation() for affiliation in self.repositoryaffiliation_collection]
            ret["affiliations"] = affiliations
        if self.repositoryorganism_collection:
            organisms = [organism.serialize_repository_organism() for organism in self.repositoryorganism_collection]
            ret["organisms"] = organisms
        if self.repositorydataformat_collection:
            data_formats = [data_format.serialize_repository_data_format() for data_format in self.repositorydataformat_collection]
            ret["data_formats"] = data_formats
        if self.repositorydatatype_collection:
            data_types = [data_type.serialize_repository_data_type() for data_type in self.repositorydatatype_collection]
            ret["data_types"] = data_types
        if self.repositoryresearcharea_collection:
            research_areas = [research_area.serialize_research_area() for research_area in self.repositoryresearcharea_collection]
            ret["research_areas"] = research_areas
        if self.repositorycontact_collection:
            repository_contacts = [repository_contact.serialize_repository_contact() for repository_contact in self.repositorycontact_collection]
            person = repository_contacts[0]
            ret["registering_name"] = person["name"]
            if "phone" in person:
                ret["registering_phone"] = person["phone"]
            if "email" in person:
                ret["registering_email"] = person["email"]
        if self.repositoryadditionalfields_collection:
            repository_additional_fields = [repository_additional_fields.as_dict() for repository_additional_fields in self.repositoryadditionalfields_collection]
            repository_additional_fields = repository_additional_fields[0]

            if repository_additional_fields["new_affiliation"] is not None:
                if preview:
                    aff_array = repository_additional_fields["new_affiliation"].strip().split(",")
                    ret["new_affiliations"] = aff_array
                else:
                    ret["new_affiliations"] = repository_additional_fields["new_affiliation"]
            if repository_additional_fields["new_organisms"] is not None:
                if preview:
                    org_array = repository_additional_fields["new_organisms"].strip().split(", ")
                    ret["new_organisms"] = org_array
                else:
                    ret["new_organisms"] = repository_additional_fields["new_organisms"]
            if repository_additional_fields["new_data_types"] is not None:
                if preview:
                    dt_array = repository_additional_fields["new_data_types"].strip().split(", ")
                    ret["new_data_types"] = dt_array
                else:
                    ret["new_data_types"] = repository_additional_fields["new_data_types"]
            if repository_additional_fields["new_data_formats"] is not None:
                if preview:
                    df_array = repository_additional_fields["new_data_formats"].strip().split(", ")
                    ret["new_data_formats"] = df_array
                else:
                    ret["new_data_formats"] = repository_additional_fields["new_data_formats"]
            if repository_additional_fields["new_research_areas"] is not None:
                if preview:
                    ra_array = repository_additional_fields["new_research_areas"].strip().split(", ")
                    ret["new_research_areas"] = ra_array
                else:
                    ret["new_research_areas"] = repository_additional_fields["new_research_areas"]
        return ret

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Affiliation(Base):
    __tablename__ = "affiliation"

    def serialize_affiliation(self):
        ret = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        return ret

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class RepositoryAffiliation(Base):
    __tablename__ = "repository_affiliation"

    def serialize_repository_affiliation(self):
        ret = {}
        if (self.affiliation):
            ret = { "id": self.affiliation.id, "name": self.affiliation.name, "nickname": self.affiliation.nickname }
        else:
            ret = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        return ret

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class RepositoryOrganism(Base):
    __tablename__ = "repository_organism"

    def serialize_repository_organism(self):
        ret = {}
        if(self.organism):
            ret = {"id": self.organism.id, "name": self.organism.name}
        else:
            ret = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        return ret

class Organism(Base):
    __tablename__ = "organism"

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class RepositoryResearchArea(Base):
    __tablename__ = "repository_research_area"

    def serialize_research_area(self):
        ret = {}
        if (self.researcharea):
            ret = {"id": self.researcharea.id, "name": self.researcharea.name}
        else:
            ret = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        return ret

class ResearchArea(Base):
    __tablename__ = "research_area"

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class RepositoryDataFormat(Base):
    __tablename__ = "repository_data_format"

    def serialize_repository_data_format(self):
        ret = {}
        if (self.dataformat):
            ret = {"id": self.dataformat.id, "name": self.dataformat.name}
        else:
            ret = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        return ret

class DataFormat(Base):
    __tablename__ = "data_format"

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class RepositoryDataType(Base):
    __tablename__ = "repository_data_type"

    def serialize_repository_data_type(self):
        ret = {}
        if (self.datatype):
            ret = {"id": self.datatype.id, "name": self.datatype.name}
        else:
            ret = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        return ret

class DataType(Base):
    __tablename__ = "data_type"

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Person(Base):
    __tablename__ = "person"

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class RepositoryContact(Base):
    __tablename__ = "repository_contact"

    def serialize_repository_contact(self):
        ret = {}
        if (self.person):
            ret = {"id": self.person.id, "name": self.person.name, "phone": self.person.phone, "email": self.person.email}
        else:
            ret = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        return ret

class RepositoryAdditionalFields(Base):
    __tablename__ = "repository_additional_fields"

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class DRFUser(Base):
    __tablename__ = "drf_user"