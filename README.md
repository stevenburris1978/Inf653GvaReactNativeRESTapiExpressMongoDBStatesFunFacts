## INF653GVA - Back-end Development I
# Steven Burris
# 4/27/2024
# *Final Project - State Fun Facts React Native Expo iOS and Android App - Production with EAS build*
# *State Fun Facts mobile app uses Express server with Heroku and Mongodb database for the backend, Bcrypt to hash the admin passwords, edit state fun facts info in the mongodb*
# *State Fun Facts has a Node JavaScript REST API web app in the webview of the Home Screen for searching state fun facts and is in the funfacts-backend directory*

# *State Fun facts mobile app install and setup instructions*
## Testers can install State Fun Facts iOS & Android Expo React Native mobile app by 

# iOS production Apple App Store download url - Must Download TestFlight app by Apple first then click on this link: 
[TestFlight iOS App Store Link](https://testflight.apple.com/join/PDHOblFr)
### This code can be deployed through the iOS App Store external test link.

# Android production Google Play Store download url: 
[Google Play Store Android app Link](https://play.google.com/apps/internaltest/4700875330572731561)
### This code can be deployed through the Google Play Store internal test link.

# State fun facts Github url for React Native Expo mobile app. Users view in webview and Admin to do Mongodb CRUD operations for the states collection has node js web app with expressServer.js and reat native expo app with server.js : 
[Final Project Git Url](https://github.com/stevenburris1978/Inf653GvaReactNativeRESTapiExpressMongoDBStatesFunFacts)
### This code can be deployed locally with Expo Go or through the iOS App Store and Google Play Store links provided.

# States' Fun Facts Heroku url for Home Screen's webview of State Fun Facts Node JS REST api web app with expressServer.js - backend/frontend for displaying all states' fun facts from Mongodb (this link will display the REST API web app alone in a browser):
[funfacts-backend web app back-end w/front-end Heroku Url](https://statefunfactsapp-8b273eab827f.herokuapp.com)

# funfacts-backend Node REST API directory backup git url with expressServer.js for Mongodb to get all states' facts for viewing:
[funfacts-backend Directory Git Url](https://github.com/stevenburris1978/Inf653GvaFinalFunFactsRestApi)

# Backend Heroku url for kayscrochet-backend directory with server.js - mobile app backend for MongoDB add, edit, and delete of states' fun facts(Runs React Native Backend):
[kayscrochet-backend Directory Heroku Url ](https://statefunfactsmobileapp-0911da4049ba.herokuapp.com)

# *With this app Users can make facts selections for states in the app's webview of the website; and Admin can Add, Edit, Delete state fun facts in Mongodb*

## Admin can add fun facts with images to the app's Notifications Screen and MongoDB states collections. Admin can delete a states collection in the Mongodb, edit each fun fact's description, and delete each fun fact's description.

### To open the hidden admin login screen, open the app menu left drawer navigator and tap 6 times in less than 2 seconds below the notifications icon.

## Android and iOS users can see the State Fun Facts webview at the Home Screen to search state facts and view the Contact, Policy, and new fun facts Notifications screens of the drawer menu navigator.

## State Fun Facts also opens with the Expo Go app

### These environment variables to to be set up in Heroku or in .env for Expo Go for the react native app and the REST API.
JWT_SECRET=
AWS_SECRET_ACCESS_KEY=
AWS_ACCESS_KEY_ID=
S3_BUCKET_NAME=
FIREBASE_SERVICE_ACCOUNT_PATH=
MONGODB_URI= for react native app mongodb url
DATABASE_URI= for the REST API mongodb url (this is the only .env needed for the funfacts-backend REST API)

## *State Fun Facts files needed*
### State Fun Facts needs the google-services.json file from Firebase Cloud Messaging for Android devices and iOS devices need the APNs key for expo push notifications to work.

### State Fun Facts uses a createAdmin.js file to add the admin usernames and hashed passwords with Bcrypt into the Mongodb manually.
