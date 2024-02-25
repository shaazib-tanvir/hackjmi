# MediTracker

MediTracker is a webapp to remind you and get info on your medications.

## Dependencies

To run the server you need [NodeJS](https://nodejs.org/en) and [MariaDB](https://mariadb.org/) (or alternatively any other SQL Database that supports JSON)

## Usage

- Go to `server/config/config.json` and add the details of your database server
```json
{
	"development": {
		"username": "root",
		"password": null,
		"database": "database_dev",
		"host": "127.0.0.1",
		"dialect": "mariadb"
	},
	"test": {
		"username": "root",
		"password": null,
		"database": "database_test",
		"host": "127.0.0.1",
		"dialect": "mariadb"
	},
	"production": {
		"username": "root",
		"password": null,
		"database": "database_production",
		"host": "127.0.0.1",
		"dialect": "mariadb"
	}
}
```
- Go to `server/config/server.json` and set the ip and port of the server you want to run the website on
```json
{
	"ip": "127.0.0.1",
	"port": 8080,
	"secret": ""
}
```
After that set the secret value (**don't leave the default since it'll be used for signing session IDs**)

- Finally go to the server folder and run `node .` after installing all the packages to run the application.
