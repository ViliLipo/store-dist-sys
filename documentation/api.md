## Definition of the API.

## User
- POST `/api/user`, params: email, password
- DELETE `/api/user`, params email, password

### auth
- POST `/api/auth/login`, params email, password
- `/api/auth/logout`

### files
- GET `/api/${user}/files`, return list of the file-metadata in JSON-form
- GET `/api/${user}/files/${file}`, send file to the requester.
- POST `/api/${user}/files/${file}`, params: file
- DELETE `/api/${user}/files/${file}`

### Sharing

- GET `/api/${user}/shared`, returns list of the metadata of files that are
  from different users but shared with you.

- POST `/api/${user}/sharing`, params: filename, email. Share a file with user
  with the given email.

- DELETE `/api/${user}/sharing` params: filename, email. Remove sharing
  connection that matches file and email.


