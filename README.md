## Description

## run project

```bash
$ docker pull lyubov98/admin
$ docker run -t -p 3060:3060 lyubov98/admin
```

## Running the app

Roles = ['boss', 'admin', 'user']

#### Header Authorization: "Bearer [access_token]"

### POST / createAdmin

http://localhost:3060/create-admin -
Create ADMIN - only one time
Request body
{
"userName": ,
"boss": ,
"role": "admin",
"password"
}

response {
"access_token": "string"
}

### POST / create user

require Header

http://localhost:3060/create/:[userName]

create user - only user with role - boss

Request body
{
"userName": "1fsf6",
"password": "fsfffsss"

}
"access_token": "string"
}

response {
"userName": "1fsf6",
"password": "fsfffsss",
"boss": "ddgf",
"role": "user"
}

### POST / create boss

require Header

http://localhost:3060/create-boss

create user - only user with role - admin

Request body
{
"userName": "ddsfsffefegf",
"boss": "ffdf",
"role": "boss",
"password": "9"
}

response {
"userName": "ddsfsffefegf",
"role": "boss",
"boss": "ffdf",
"password": "9"
}

### PATCH /update boss

require Header
http://localhost:3060/update-boss

request {
"newBoss": "9",
"userName": "96",
"currentBoss": "3"
}

response updated object or "Was updated before"

### POST /login

http://localhost:3060/login

request
{
"userName": "ddsfsffefegf",
"password": "9"
}

response }
"access_token": "string"
}

### GET /subordinates

require Header

http://localhost:3060/subordinates

response
{
"[role]": "[userName]",
"subs": [...subordinators]
}
