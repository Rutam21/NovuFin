# NovuFin
This is the base folder for the NovuFin project specially made for the Novu Connect Hackathon.

![Cover](https://github.com/Rutam21/NovuFin/assets/47860497/3d3eabaa-3a9e-4088-8f72-8507571bd802)

## App Deployment

The App has been deployed on DigitalOcean App Platform.
Feel free to try it yourself and reach out to [me](https://twitter.com/RutamHere) if you have any suggestions or feedback.

Live Deployment URL: https://shark-app-nvoag.ondigitalocean.app/



## About the App

- The App has been designed as per one of the ideas suggested in the Novu Connect Dashboard.
- The App basically works as finance notification system for users that keeps track of the current market price of crypto coins/stocks in real-time and notifies the user.
- The App provides 6 Crypto Coins and 4 Stocks options as a part of this Prototype App.
- The App uses Realtime APIs like CoinGecko and AlphaVantage to fetch and populate latest pricing of all the assets.
- The Users can subscribe to any coin or stock as per their wish and will receive the updated prices of them directly in their inboxes or in-app notifications.
- The App doesn't bother the users with a signup process, rather it stores Subscriber Pairs in the `sessionStorage` for the current session.
- The App provides both in-app and Email Notifications.
- The Users can even choose the time interval at which they want to receive the Price updates.
- There are 4 time intervals available
   - 2 Minutes (In-App Notifications only on the browser page as NovuMailProvider has 300 free mails only.)
   - 1 Hour (Both In-App and Email)
   - 6 Hours (Both In-App and Email)
   - 24 Hours (Both In-App and Email)
- The In-App notification gets set for the Primary User only i.e., if you wish to see the in-app notifications in the webpage, then always use the same email that you entered in the popup when you opened the page to subscribe. However, one can use different emails to subscribe and the app creates and assigns them as unique Subscribers and they will receive their respective subscription emails.

## App Workflow

- Once the app loads, a popup appears where you need to enter the Primary user details. For each unique email entered, the app creates and assigns a unique subscriberID to the user and the `{email,subscriberID}` pair is stored in the `sessionStorage` for the current session.
- The user can then visit the Crypto or the Stocks sections of the App. The realtime market prices for those stocks will be visible to the user on each section.
- The user can choose to subscribe any of those crypto coins or stocks as per their interest and the can get the realtime price updates. For this, the user has to enter the name and the email which shall be used in the notification trigger payload to send customised alerts.
- The user has the ability to opt for a time interval at which they want the app to send them notifications with the updated price of their subscribed crypto coins or stocks. However, this is completely optional. The user can choose to ignore the time interval selection and just hit the subscribe button to get a one-time in-app and email notification with the current market price of the asset.
- If the user chooses a time interval, then they are assigned to a respective `topic`. The App then triggers the notification to the `topics` at their specified intervals and all the subscribed users get the notifiactions.

The below flowchart briefly shows how the app works.

![NovuFin Workflow](https://github.com/Rutam21/NovuFin/assets/47860497/aa267caa-0602-4b02-a308-bd8af86d27ea)

## Notification Template Workflows

You can find the snaps of the Novu Notification templates that are used for this App below.

### Notification 1 Workflow

This is the Notification Workflow for the subscribers that don't choose a time interval at all or choose a time interval of 1 Hour, 6 Hours and 24 Hours.

![Workflow 1](https://github.com/Rutam21/NovuFin/assets/47860497/9d1b949c-2b07-4617-9d56-c52e79d96f5b)

The contents for the in-app email templates are given below.

#### In-App Template
![in-app template](https://github.com/Rutam21/NovuFin/assets/47860497/e391feda-9a9c-4977-823f-4f8a8b9abec6)

#### Email Template
![email template](https://github.com/Rutam21/NovuFin/assets/47860497/520a4e64-da15-4db0-879a-36a480836980)

### Notification 2 Workflow

This is the Notification Workflow for the subscribers that choose the time interval of 2 minutes.

![Workflow 2](https://github.com/Rutam21/NovuFin/assets/47860497/22e1672a-5b6c-4f23-960f-fd125337a244)

#### In-App Template

![in-app template](https://github.com/Rutam21/NovuFin/assets/47860497/e391feda-9a9c-4977-823f-4f8a8b9abec6)

## Local Deployment

The app is available Live as mentioned [here](https://github.com/Rutam21/NovuFin#app-deployment). However, you can also choose to run it locally on your machine as well.
Simply follow the steps below.

- Clone the repository
```
git clone https://github.com/Rutam21/NovuFin.git
```

- Open the repository in your preferred editor for e.g., VSCode.
```
cd NovuFin
code .            //This will work if VSCode is installed in your machine and has been configured properly. Or else you can simple open your editor and use the file explorer to open this folder.
```

- Add a .env file with the required credentials. Follow the .env.example file to set it up properly.
- Install the all packages/node_modules using npm.
```
npm install
```
- Now run the app with the command below.
```
npm start
```

This will start the app at **localhost:3000**.

## 

                                                      Made with 💖 For
![Novu Hackathon](https://github.com/Rutam21/NovuFin/assets/47860497/ad8709da-66e0-4810-a546-ceaaf8d0dc62)

