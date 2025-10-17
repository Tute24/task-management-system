# task-management-system
This project was made for case resolution purposes

The present repository contains the codebase for a task management app.

# Technologies used:
  - React: a JavaScript-based UI development library;
  - Next.js: a React framework that enables, amongst other thing, server-side and static rendering, and facilitates the application's routing;
  - Tailwind CSS: an utility-first CSS framework for rapidly building modern websites;
  - React Hook Form: library for managing forms in React applications;
  - Zod: TypeScript-first schema validation library for defining and validating data, using it on both the app's front and backend (creation of routes schemas and forms data schemas);
  - Dayjs: Javascript library that parses dates and times;
  - Prettier: a code style formatter library;
  - Node.Js: a JavaScript runtime built on Chrome's V8 JavaScript engine;
  - Nodemon: a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected;
  - tRPC: Typescript remote procedure call library that enables the developer to create APIs with typesafe endpoints that can be used both on the front and backend with tRPC/client and tRPC/server;

# Main features:
  - HomePage: Exhibits a list of the created tasks in card format, with the task title, its description and create date-time. Every task card has buttons that gives the user the possibility to delete or update a task (its title or description);
  - Create Task Form: a simple form that enables the user to create a new task, with a task title (required) and a task description input;

# How to run the project
  - First, clone this repository with `git clone https://github.com/Tute24/task-management-system`;
  - The project has two folder (frontend and backend). You can go to each one and run `npm install` to install the project's dependencies;
  - After installing all the dependencies, you can run the backend locally with `npm run start` - The server will run at port 3000, but you can change it if you want on backend/src/index.ts;
  - To run the frontend locally, you can go to the frontend folder and run `npm run dev` - If you are not running the backend on PORT 3000, you need to change the localhost address on frontend/src/trpcClient.ts  -  Using the port as an .env variable would be the best approach here to avoid errors;

# Some tidbits about the project
  - I opted to use shadcnUI components for practical purposes. Since I had a short time to develop the project, I thought it would be better to use imported inputs, buttons and cards to make the frontend simpler and easier to implement
  - I thought it would make more sense to implement the update task feature directly on the tasks list, with a form there, instead of implementing this feature on a different page. In my opinion, it would be better for user experience;
  - I had problems with CORS becausethe frontend and backend were running on different ports, so I had to google my way to solve this problem (which could've been solved using the express app router, but I didn't want to use anything more than tRPC on the backend);
  - I didn't implement the extra (bonus) feature of Infinite Scroll on the list because I truly didn't know how to use the Intersection Observer API, and didn't want to just copy a piece of code to implement the feature;

