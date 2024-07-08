# Data Repository Finder Backend 

## Description
This Python code serves as the backend for the Data Repository Finder(DRF) web application. It is implemented using Flask.

## Running
### Requirements
* Python 3.7 or higher (fully tested on 3.7)

After cloning this Git repository into your development machine:

1.Navigate to flask directory:
```commandline
cd flask
```

2.Create your virtual environment:
On Linux:
```commandline
python3 -m venv drf-venv
```
On Windows:
```commandline
python -m venv drf-venv
```
3.Activate your virtual environment:
On Linux:
```commandline
source drf-venv/bin/activate
``` 
On Windows:
```commandline
drf-venv/Scripts/activate
```
4.Upgrade your pip:
On Linux:
```commandline
python3 -m pip install --upgrade pip
```
On Windows:
```commandline
python -m pip install --upgrade pip
```
5.Install all requirements for your new virtual environment:
On Linux:
```commandline
cd api
python3 -m pip install -r requirements.txt
```
On Windows:
```commandline
cd api
python -m pip install -r requirements.txt
```
6.Modify config.py with appropriate connection information to Postgres. 

7.Set the necessary environment variables before running
```commandline
export DRF_SQLALCHEMY_PASSWORD=<password for Postgres instance>
export FLASK_ENV=testing; # set this to whichever environment from config.py you want to use
```
8.Switch into /db directory
```commandline
cd api
```
9. Run the .sql files in /db in the following order to populate a Postgres database with the necessary tables. The application won't run without a connection to a database with the neccessary tables.
```commandline
create_tables.sql
create_tables_update.sql
alter_db_add_registration.sql
```

9.Switch into /flask/api directory
```commandline
cd api
```

10.Run flask for local access only:
```commandline
flask run
```
