# ad-auth-app

This project is an example of calling Azure AD platform for AuthN and AuthZ 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Getting started
Create a .env file with the following settings from azure.
```
CLOUD_INSTANCE="https://login.microsoftonline.com/" # cloud instance string should end with a trailing slash
TENANT_ID=""
CLIENT_ID=""
CLIENT_SECRET=""

REDIRECT_URI="http://localhost:3000/auth/redirect"
POST_LOGOUT_REDIRECT_URI="http://localhost:3000"

GRAPH_API_ENDPOINT="https://graph.microsoft.com/" # graph api endpoint string should end with a trailing slash

EXPRESS_SESSION_SECRET="" # random string for express session cookie

```
