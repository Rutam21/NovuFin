# NovuFin
This is the base folder for the NovuFin project specially made for the Novu Connect Hackathon.

![Cover](https://github.com/Rutam21/NovuFin/assets/47860497/3d3eabaa-3a9e-4088-8f72-8507571bd802)

## App Deployment

The App has been deployed on DigitalOcean App Platform.
Feel free to try it yourself and reach out to [me](https://twitter.com/RutamHere) if you have any suggestions or feedback.

Live Deployment URL: https://shark-app-nvoag.ondigitalocean.app/

## About the App

- The App has been designed as per one of the ideas suggested in the Novu Connect Dashboard.
- The App basically works as finance notification system for users.
- The App provides 6 Crypto Coins and 4 Stocks as a part of the Prototype App.
- The App uses Realtime APIs like CoinGecko and AlphaVantage to fetch and populate latest pricing of all the assets.
- The Users can subscribe to any coin or stock as per their wish.
- The App doesn't bother the users with a signup process, rather it stores Subscriber Pairs in the `sessionStorage` for the current session.
- The App provides both in-app and Email Notifications.
- The Users can even choose the time interval at which they want to receive the Price updates.
- There are 4 time intervals available
   - 2 Minutes (In-App Notifications only on the browser page as NovuMailProvider has 300 free mails only.)
   - 1 Hour (Both In-App and Email)
   - 6 Hours (Both In-App and Email)
   - 24 Hours (Both In-App and Email)
- The In-App notification gets set for the Primary User only. However, one can use different emails to subscribe and the app creates and assigns them as unique Subscribers and they will receive their respective subscription emails.

## App Workflow

The below flowchart briefly shows how the app works.

![NovuFin Workflow](https://github.com/Rutam21/NovuFin/assets/47860497/6f20ce16-5db0-43a4-9d49-49a0005d46f5)



