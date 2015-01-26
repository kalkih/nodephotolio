#NodePhotolio
NodePhotolio is a online photo portfolio well suited for both professional and amateur photographers. NodePhotolio makes it easy for you to upload and share your best photos with the world.
NodePhotolio comes with a fresh, modern and fully responsive design. The portfolio looks just as good on an iPhone or android device as it does on a laptop or a full sized desktop computer.

NodePhotolio is a one of a kind online photo portfolio, the competitors solutions doesn't stand a chance. The design is the big thing that makes this photo portfolio stand out from the rest, combine that with the easy to use administration features and that makes it a obvious choice.

NodePhotolio is still in the very first stage of releases and there are much stuff to come in the near feature that will make it better than it already is.

##Features
* MVC based
* Works in all major browsers (incl IE)
* Landing page
* Responsive design
* Mobile friendly
* Administration panel
* Add/remove gallery
* Upload photo to gallery
* Batch upload of photos
* Slideshows

##Coming soon...
* Improved performance
* Improved admin panel
* Remove specific photos
* Photowall


#Live demo
[HERE](http://www.kalkih.com:3000)


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

##Step 1 - Get the source
Clone the project from GitHub to directory of choice.

```
$ git clone https://github.com/kalkih/NodePhotolio.git

```

##Step 2 - Install package dependencies
Go into the project folder and run npm install. This will install all package dependencies that's required to get NodePhotolio up and running.
This might take a while depending on your setup and internet connection.

```
$ cd NodePhotolio
$ npm install
```

##Step 3 - Setup database
Create a new database with a name of your choice. If you are running mysql on debian you can use the following command. Just replace root with your user and DbNameHere with a database name of your choice.

```
$ mysql -u root -p -e "create database DbNameHere";

```

To get NodePortfolio to talk with your database you'll need to edit the settings in the database json configuration file under 'production', make sure to enter the database name for the database you created earlier.

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

##Step 5 - Edit personal information
Open data.json with vim or your text editor of choice and edit the data to fit your needs.

```
$ vim data.json

```

##Step 6 - Start the server
Make sure you are in the root directory of your NodePhotolio installation and enter the following command.

```
$ npm start
```

The server should now fire up.

##Step 7 - Access the website
The server is now up and running and you should be able to access the website on localhost:3000.

If you are unable to login to the admin part of the website with the details you entered in the data.json file, restart the server and that should setup the user.

Ctrl + C followed by:
```
$ npm start
```
