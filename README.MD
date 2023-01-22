# Rest Server
# 07-node-restserver
- author: ANGERSON JOSE AMUNDARAY RENGIFO
- type: NodeJs

<h2>1. Deploy Configurations:</h2>
must create .env file to deploy or local test - Structure:</p>

```

#SERVER CONFIGURATION
PORT=<SERVER PORT>

#APP CONFIGURATION - BBDD CONNECTION
MONGO_USER=<MONGO USER>
MONGO_PASSWORD=<MONGO PASSWORD>
#MONGO_DOMAIN=<MONGO DOMAIN OR IP>
MONGO_DATABASE=<MONGO DATABASE>
MONGO_PORT=<MONGO PORT>

#AUTH SECRET
JWT_SECRET=<JWT SECRET TO GENERATE SIGNATURE>

#MONGO SERVER TO LOCAL DEPLOY ON DOCKER-COMPOSE
MONGO_ROOT_USER=<MONGO ROOT USER>
MONGO_ROOT_PASSWORD=<MONGO ROOT PASSWORD>

 ------ .env file example: ------

#SERVER CONFIGURATION
PORT=8080

#APP CONFIGURATION - BBDD CONNECTION
MONGO_USER=user
MONGO_PASSWORD=password
#MONGO_DOMAIN=127.0.0.1
MONGO_DATABASE=users_db
MONGO_PORT=27017

#AUTH SECRET
JWT_SECRET=123456abcdef

#MONGO SERVER TO LOCAL DEPLOY ON DOCKER-COMPOSE
MONGO_ROOT_USER=superuser
MONGO_ROOT_PASSWORD=super_password

```
<h2>2. Init mongodb scripts</h2>
<p>
Can exec scripts on the first startup of mongodb . For this must create the file:<br><br>
<b>./database/scripts/mongo-init.js</b><br><br>
File content example:<br>
</p>

```
db.createUser(
  {
      user: "user",
      pwd: "password",
      roles: [ { role: "readWrite", db: "users_db" } ]
  }
)

db.createCollection("user_collection")
db.coffee_users.insert({greeting: 'hello-world'})

```

<h2>3. Init application</h2>
<p>Init local command:</p>

```
npm run dev
```

<p>Deploy on docker (must exist .env file, step #1):</p>

```
docker-compose up -d
```