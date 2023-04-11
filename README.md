## Description


## Error 
{
    "statusCode": number,
    "message"?: string,
    "error"?: string
}

### POST / signup


http://localhost:3060/signup


Request body
{
"userName": string,
"password": string,
"email": string

}

response: {
"access_token": string
}


### POST /changepassword

http://localhost:3060/changepassword

request {
    "password":string
}

response: {
"access_token": string
}
request: 
### POST /login

http://localhost:3060/login

request
{
"email": "ddsfsffefegf",
"password": "9"
}

response {
"access_token": string
}


