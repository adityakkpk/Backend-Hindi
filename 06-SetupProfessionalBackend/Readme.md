# How to setup a professional backend project

- Starting our first mega project
- [Model Link](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)


## Setup the project

- Create a new project folder and initialize node environment by using the following command : `npm init` or `npm init -y`.

- Initialize `git` repository and push it to the remote repository.

- Make a Folder `Public` for our images and other stuff. As we know that git does not track empty folders so we will add `.gitkeep` file inside `Public` folder.

- Add `.gitignore` file and use gitignore generators to generate the .gitignore file.

- Create a file `.env`. And also create a `.env.sample` file for the `.env` reference.

- Create `src` folder where we will keep our all the source code files. And create some files like `app.js`, `constants.js` and `index.js`.

- Update the `package.json` file to use modules and add some `scripts` for the production.

- Install `nodemon` packege as a development dependency by using `npm i nodemon` command.

- Add, commit and push the changes to the remote repository.

- Now create some folders inside the `src` folder: 
    - `controllers` : All the functionalities put inside this 
    - `db` : Code for connecting to the database
    - `middlewares` : All the codes for some checking before `request` reching to the server.
    - `models` : for our data points
    - `routes` : code for all routes
    - `utils` : code for utilities like file upload, mailing etc

- Install `Prettier` for the format of the code that what structure we will use for this project.
    - Install it using `npm  i -D prettier`.
    - Add some file for the formating of the code file
    - add `.prittierrc` file for the code formatting and `.prittierignore` file to ignore by the prittier.