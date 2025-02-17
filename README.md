# Social Network API 🚀

## Description
This is a NoSQL social network API that allows users to share thoughts, react to friends' thoughts, and create a friend list.

## Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose ODM
- TypeScript
- Insomnia for API Testing

## Installation
Follow these steps to set up the project on your local machine:


1. **Clone the repository:**
   ```sh
   git clone https://github.com/mauricek12d/Social-Network-API.git

2. **Navigate into the project Folder:**
```
   cd Social-Network-API
```
3. **Install dependencies:**
```
   npm install
```
4. **Start the Application:**
```
   npm run dev

```
## API Endpoints 
User Routes

- GET /api/users - Get all users
- GET /api/users/:id - Get a single user
- POST /api/users - Create a new user
- PUT /api/users/:id - Update a user
- DELETE /api/users/:id - Delete a user

Friend Routes

- POST /api/users/:userId/friends/:friendId - Add a friend
- DELETE /api/users/:userId/friends/:friendId - Remove a friend

Thought Routes

- GET /api/thoughts - Get all thoughts
- GET /api/thoughts/:id - Get a single thought
- POST /api/thoughts - Create a thought
- PUT /api/thoughts/:id - Update a thought
- DELETE /api/thoughts/:id - Delete a thought

Reaction Routes
- POST /api/thoughts/:thoughtId/reactions - Add a reaction
- DELETE /api/thoughts/:thoughtId/reactions/:reactionId - Remove a reaction

## Walkthrough Video

https://drive.google.com/file/d/1bLcwWJyR8e_nKqDIVJQRV5r5IaakZF1N/view
