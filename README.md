# DevTinder

- Created a Vite + React application
- Remove unecessary code and create a Hello World app
- Install Tailwind CSS
- Install Daisy UI
- Add Navbar
- Add NavBar component to App.js
- Create a Navbarjsx separate Component file
- Install react router dom
- Create BrowserRouter > Routes > Routes=/ Body > RouteChildren
- Create an Outlet in your Body Component
- Create a footer
- Create Login page
- Install axios
- CORS - install cors in backend => add middleware to with configaration : orgin , credentials : true
- Whenever you're making API call so pass  axios => {withCredentials: true}
- Install Redux Toolkitt - https://redux-toolkit.js.org/tutorials/quick-start
- configureStore => provider => createSlice => add reducer to store
- Add redux devtools in chrome
- Login and see if your data is coming properly in the store
- NavBar should update as soon as user logs in
- Refactor our code to add constants file + create a component folder
- You should not be access other routes without login
- If token is not present, redirect user to login page
- Logout Feature
- Get the Feed and add the feed in the store
- build the user card on feed
- Edit Profile Feature
- Show Toast message on show message
- New Page - See all my connections
- New Page - See all my connections Requests
- Feature - Accept/Reject Connection Request
- Send/ignore the user card from Feed

Remaining:

- Signup New User
- End To End Testing


- Body 
-       NavBar
-       Route=/  => Feed
-       Route=/login  => Login
-       Route=/connection  => Connection
-      Route=/profile  => Profile


# Deployment
- Signup on AWS
- Launch instance
- create mod 400 <secret>.pen


# Razorpay Payment Gateway Integration
- Sign up on Razorpay  & complete KYC


# Real Time CHat using Websocket(Socket.io)
- Build the UI for a chat window on /chat/:targetUserId
- Setup install Socket.io
- npm i socket.io
- Setup frontend socket.io-client
- Initialise the chat
- Listen to events
- Homework: improve the UI
- Homework : Fix Security Bug - Can I send messages to a person who is not my friend (auth in web sockets)
- Homework: Fix bug - If I'm not friend then I should not be able send message
- Homework: feat: Show Green Symbol online???? - [last seen 2 hours ago]
- Homework: Limit messages when fetching from DB
- Project Ideas: Ideas: Tic tac toe game
- Project Ideas2: Chess
