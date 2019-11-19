## Definition of the API.

## User
- POST `/api/user`, params: email, password
- DELETE `/api/user`, params email, password

### auth
- POST `/api/auth/login`, params email, password
- POST `/api/auth/logout`

### files
- GET `/api/${user_email}/files`, return list of the file-metadata in JSON-form
- GET `/api/${user_email}/files/${folder_id}/${file_id}`, download a file.
- POST `/api/${user_email}/folder/new`, create a new folder, params: name, path
- POST `/api/${user_email}/files/${folder_id}`, params: file, upload a new file to folder
- DELETE `/api/${ususer_emailer}/files/${file_id}`, delete file
- PUT `/api/${ususer_emailer}/files/${file_id}`, rename a file, params: name

### Sharing

- GET `/api/${user_id}/shared`, returns list of the metadata of files that are
  from different users but shared with you.

- POST `/api/${user}/sharing`, params: filename, email. Share a file with user
  with the given email.

- DELETE `/api/${user}/sharing` params: filename, email. Remove sharing
  connection that matches file and email.


