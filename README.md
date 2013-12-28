From here to Heroku

Prerequisites:
==============
* Git
* Heroku command line
* MySQL and/or MongoDb
* NodeJs
* karma - npm install -g karma
* mocha - npm install -g mocha
* Optional: Growl (growl for Windows + growlnotify)


1. git clone https://github.com/jhannes/addressBookJs
2. Start MongoDb or MySQL server
3. For MySQL - create database and user:
   * mysql -uroot -p
   * create user monty identified by some_pass
   * create database addressbook
   * grant all privileges on addressbook.* to 'monty'@'localhost" with grant option
   * grant all privileges on addressbook.* to 'monty'@'%" with grant option
4. mocha # runs the server-side tests
5. karma # runs the client-side tests
6. node server.js # starts the server
7. http://localhost:3000
   * Add a contanct
   * See that the list of contacts is updated
8. Heroku: Create a new application
   * heroku login
   * heroku create
9. Heroku: Add database
   * For MySQL: heroku addons:add cleardb:ignite
   * For MongoDB: heroku addons:add mongohq:small
   * You can check the config to see that it went ok: heroku config
10. git push heroku master
11. The application should now run on your herokuapp.com domain
