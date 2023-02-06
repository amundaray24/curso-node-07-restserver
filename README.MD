<h1 style="color:#075982;font-weight:bold"> Nodejs Rest Server </h1>

```
- Author: ANGERSON JOSE AMUNDARAY RENGIFO
- Type: NodeJs
```
#

<h2 style="color:#075982;font-weight:bold">1. Sign in with Google configuration</h2>
<p>
The "consent screen" must be configured and the client_id and client_secret must be generated in the google console, in addition, the domains from which authentication with google will be allowed must also be configured.

https://developers.google.com/identity/gsi/web/guides/overview<br><br>
</p>


<h2 style="color:#075982;font-weight:bold">2. Init mongodb scripts (Local cases or initial load)</h2>
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

<h2 style="color:#075982;font-weight:bold">3. Deploy Configurations:</h2>
<h3 style="color:#b56402;font-weight:bold">(must exist google configuration, step #1)<h3>
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

#GOOGLE AUTH
GOOGLE_AUTH_CLIENT_ID=<GOOGLE AUTH SERVICE OAUTH CLIENT ID>
GOOGLE_AUTH_CLIENT_SECRET=<GOOGLE AUTH SERVICE OAUTH CLIENT SECRET>


#TEMPORAL IMAGES PATH
IMAGES_TMP_PATH=<IMAGE PATH>
IMAGES_TMP_CACHE_KEY=<IMAGE CACHE BUS KEY>
IMAGES_TMP_CACHE_SECONDS_TTL=<IMAGE CACHE BUS TTL>
IMAGES_TMP_CACHE_SECONDS_DELETE_TTL=<TMP IMAGES INTERVAL TIME>
IMAGES_TMP_CACHE_SECONDS_SAVE_DELETE_TTL=<TMP IMAGES INTERVAL SAVE TIME THIS WILL BE ADDED TO IMAGES_TMP_CACHE_SECONDS_TTL>
IMAGES_TMP_CACHE_HOST=<IMAGE CACHE HOST>
IMAGES_TMP_CACHE_PORT=<IMAGE CACHE PORT>
IMAGES_TMP_CACHE_PASSWORD=<IMAGE CACHE PASSWORD>

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

#GOOGLE AUTH
GOOGLE_AUTH_CLIENT_ID=123client_id
GOOGLE_AUTH_CLIENT_SECRET=456client_secret

#MONGO SERVER TO LOCAL DEPLOY ON DOCKER-COMPOSE
MONGO_ROOT_USER=superuser
MONGO_ROOT_PASSWORD=super_password


#GOOGLE AUTH
GOOGLE_AUTH_CLIENT_ID=123456
GOOGLE_AUTH_CLIENT_SECRET=789101112


#TEMPORAL IMAGES PATH
IMAGES_TMP_PATH=/usr/app
IMAGES_TMP_CACHE_KEY=IMAGE_KEY
IMAGES_TMP_CACHE_SECONDS_TTL=60
IMAGES_TMP_CACHE_SECONDS_DELETE_TTL=60
IMAGES_TMP_CACHE_SECONDS_SAVE_DELETE_TTL=20
IMAGES_TMP_CACHE_HOST=127.0.0.1
IMAGES_TMP_CACHE_PORT=1234
IMAGES_TMP_CACHE_PASSWORD=1234567890

```

<h2 style="color:#075982;font-weight:bold">4. Init application</h2>
<h3 style="color:#b56402;font-weight:bold">(must exist .env file, step #3)<h3>
<p>Init local command:</p>

```
npm run dev
```

<p>Deploy on docker:</p>

```
docker-compose up -d
```