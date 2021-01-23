# trial-project-doc-management

## Run the application
- Execute `npm install && npm start`
## Current features
The project allows to create new user and login by that user
By login with registerd user, we can:
- Create new documents.
- Get the current created documents.
- Pagination
- Update the document
- Soft Delete the document by changing the status

## Some enhancements in the future
- Providing more tests for the functions
- Implementing refresh/accesstoken concept
- Adding more validation for each input parameters in back-end
- Implementing seach feature for email/name for getting documents list
- Applying automatically delete feature for some items which are softly deleted
- Providing an UI for the application
- Implement serverless/lambda for the back-end instead of current simple expressJS