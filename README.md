#Nodepholio
Nodepholio: a photo portfolio made in nodejs.

##Features
* Works in all major browsers (incl IE)
* Landing page
* About page
* Responsive design
* Mobile friendly
* Administration panel
* Add/remove gallery
* Add/remove photo
* Reorder photos
* Batch upload photos
* Slideshows

#Setup
This will guide you through the setup process of nodepholio for **Debian**.

##Dependencies
nodepholio requires the following dependencies. Make sure to install all of them before you proceed.
* [Node.js](http://nodejs.org/)
* [NPM](http://nodejs.org/)
* [ImageMagick](http://www.imagemagick.org/)

ImageMagick can be installed with the following command.
```
$ apt-get install imagemagick
```

nodepholio also require a database to run, the following databases are supported:
* MySQL
* MariaDB
* SQLite
* PostgeSQL

##Step 1 - Get the source
Clone the project from GitHub to directory of choice.

```
$ git clone https://github.com/kalkih/nodepholio.git

```

##Step 2 - Install package dependencies
Go into the project folder and run npm install. This will install all package dependencies that's required to get nodepholio up and running.
This might take a while depending on your setup and internet connection.

```
$ cd nodepholio && npm install
```

##Step 3 - Setup database
Create a new database with a name of your choice. If you are running mysql on debian you can use the following command. Just replace root with your user and DbNameHere with a database name of your choice.

```
$ mysql -u root -p -e "create database DbNameHere";

```

To get NodePortfolio to talk with your database you'll need to edit the settings in the database json configuration file under 'production', make sure to enter the database name for the database you created earlier.

```
$ vim config/config.json

```

##Step 4(Optional) - Choose a port for the server
The default port for nodepholio is 3000 but you can change it to another port if you like.

```
$ vim bin/www
```

Edit the port number (3000) on the following row in the www file.

```
app.set('port', process.env.PORT || 3000);
```

##Step 5 - Edit personal information
Open data.json with vim or any other text editor and edit the data to suit your needs.

```
$ vim data.json
```

##Step 6 - Start the server
Make sure you are in the root directory of your nodepholio installation and enter the following command.

```
$ npm start
```

##Step 7 - Access the website
The servershould now be up and running and you should be able to access the website on localhost:3000.

If you are unable to login to the admin section of the website with the details you provided in the data.json file, restart the server one time and the user should be set up.

cmd/ctrl + C followed by:
```
$ npm start
```
