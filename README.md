# NodePhotolio

#Setup
This will guide you through the setup process of NodePhotolio for **Debian**.

##Dependencies
NodePhotolio requires the following dependencies. Make sure to install all of them before you proceed.
* [Node.js](http://nodejs.org/)
* [NPM](http://nodejs.org/)
* [ImageMagick](http://www.imagemagick.org/)

ImageMagick can be installed with the following command.
```
$ apt-get install imagemagick
```

NodePhotolio does also require a database to work, the following databases are supported:
* MySQL
* MariaDB
* SQLite
* PostgeSQL

##Step 1
Clone the project from GitHub to directory of choice

```
$ git clone https://github.com/kalkih/node-portfolio.git

```

##Step 2
Go into the project folder and run npm install. This will install all package dependencies that's required to get NodePhotolio up and running.
This might take a while depending on your setup and internet connection.

```
$ cd NodePhotolio
$ npm install
```

##Step 3 - Setup database settings
To get NodePortfolio to talk with your database you'll need to edit the settings in the database json configuration file under 'production'.

```
$ vim config/database.json

```

##Step 4(Optional) - Choose a port for the server
The default port for NodePhotolio is 3000 but you can change it to another port if you like.

```
$ vim bin/www

```

Edit the port number (3000) on the following row in the www file.

```
app.set('port', process.env.PORT || 3000);

```

##Step 5 - Setup database settings
To get NodePortfolio to talk with your database you'll need to edit the settings in the database json configuration file.


```
$ vim config/database.json

```

##Step 6 - Edit personal information
Open data.json with vim or your text editor of choice and edit the data to fit your needs.

```
$ vim data.json

```

##Step 7 - Start the server
Make sure you are in the root directory of your NodePhotolio installation and enter the following command.

```
$ npm start
```

The server should now fire up.

##Step 8 - Access the website
The server is now up and running and you should be able to access the website on localhost:3000.
