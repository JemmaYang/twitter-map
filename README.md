# D3 Twitter Trends

A D3.js project for the visualization of the trends of Twitter.

![alt text](https://raw.githubusercontent.com/lucamarchi/d3_twitter_trends/master/preview/image.png "Preview")

###Require:
* Node.JS
* A Twitter account

###How to start on localhost:
1. Clone the repository or download the project
2. Put the customer keys and tokens in the file `server/config/config.json`
3. Start with `node server/app.js` in the main directory
4. Goto `http://localhost:8080/`

For the point 2 it require registering the application on [The Twitter Application Management](https://apps.twitter.com) and generate customer_key, customer_secret_key, twitter_access_token and twitter_access_token_secret.

###Libs used:
* [D3.js](https://github.com/d3/d3)
* [socket.io](https://github.com/socketio/socket.io)
* [Twit](https://github.com/ttezel/twit)
