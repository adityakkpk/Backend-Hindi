# Javascript Backend Roadmap

Server -> Server means a software that serves.

## Backend Development
- Backend Development is `Processing the Data` and `save it into the database`. And fetch the data from database and show it to the Frontend part.

## Prerequisites
* **A Programming Language**
    - You must have a good knowledge of any one programming language like JAva, JavaScript, C++, etc.

* **A Database**
    - Stores the Data
    - Example:- Mongo, MySQL, PostgreSQL etc.

## Frameworks and ORM/ODM
- For the ease of development we will use some frameworks and ORM/ODM.

## How Backend Works with Database
- Firstly we have a database, in backend we have write some functionality. 
- We receive some data from the Frontend. Then we ask database to check whether the data is correct or not. If data is correct then send a particular response or if the data is wrong then send some another response(error).

- Suppose you visit a website and you hit the '/login' route, the what function is need to be called is done by Backend. And after that Backend send respnse as API.

## Javascript Based Backend
- In this we will handle data, files and Third party APIs.
- A JS Runtime : Node.js / Deno / Bun

## File Structure
* **src, .env, (Readme, git, lint etc.)**
    - All the source code file will be placed in the src directory.
    - In src, index, app, constants files are there
    - All the environment variables will be placed in the .env file.
    
* **DB**
    - Code files to connect to the database
* **Models**
    - Code files of the model to store the data in the database
* **Controller**
    - Methods/Functions
* **Routes**
    - Routes
* **Middleware**
    - Middleware
* **Utils**
    - Utility