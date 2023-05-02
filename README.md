# MyIonicReactUserManagementApp
is an Ionic/React app with a web service that implements simple user management with only name, email, and password. It is just an example of a web application that works well on mobile devices using the Ionic framework.

Essentially, the following concepts are demonstrated:

- Docker
- Ionic/React
- JSON as a data source
- PostgreSQL as a data source with Prisma
- REST web service with JavaScript

A PostgreSQL database or simple JSON files can be used for local data storage. The web service is implemented in a Docker container and can be run with the following command if Docker is installed:

`docker run -d -p 8081:8081 uhwgmxorg/my-user-management-json-docker-image:0.0.0`

![img](https://github.com/uhwgmxorg/MyIonicReactUserManagementApp.node/blob/master/Doc/95_1.png)

The web application can be started with: 

`ionic serve`. 

The node modules must first be installed using: 

`npm install`.

![img](https://github.com/uhwgmxorg/MyIonicReactUserManagementApp.node/blob/master/Doc/95_2.png)

You can get more Information on: https://uhwgmxorg.wordpress.com/2023/05/02/myionicreactusermanagementapp/
