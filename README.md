# Task Schedule Application

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Components](#components)
4. [Global State Management](#global-state-management)
5. [Task Scheduling](#task-scheduling)
6. [Design Decisions](#design-decisions)
7. [Docker Containerization](#docker-containerization)
8. [Setup and Installation](#setup-and-installation)
9. [Usage](#usage)

## Project-Overview

A task management application that allows users to create, schedule, and manage tasks. Tasks can be one-time or recurring, with the ability to view and delete tasks as needed.

## Architecture

- **Frontend**: React.js, Tailwind CSS, shadcn UI components.
- **Backend**: Firebase Firestore for data storage.
- **State Management**: `useContext` for global state.
- **Task Scheduling**: Cron syntax for recurring tasks, time-based scheduling for one-time tasks.
  **Docker**: Containerization platform for packaging the application.

## Components

- **TaskBox**: Main component for displaying tasks.
- **TaskComponent**: Reusable component for rendering individual tasks.
- **Modal**: Reusable modal component for creating and editing tasks.
- **SelectBox**: Filter component using shadcn UI for task filtering.
- **TaskDetails**: Component for viewing task details.

## Global State Management

We used `useContext` to create a global state for managing the list of all tasks and executed tasks. This ensures that different components can access and update the state without prop drilling.

## Task Scheduling

Users are allowed to create two types of task, a recurring task and a one-time task. The recurring task will be executed and reoccur 3 minutes after the schedule time. The one time task is executed exactly 10 seconds after schedule time.

## Services

**FirebaseService**: Interacts with Firebase for CRUD operations.
**TaskScheduler**: Handles the scheduling and execution of tasks.

## Features

**Task Creation**: Create one-time or recurring tasks.
**Task Update**: Edit existing tasks.
**Task Deletion**: Delete tasks from the list.
**Task View**: View details of a specific task.
**Task Execution Logging**: Log and display the execution time of tasks.
**Filtering**: Filter tasks based on different criteria (alphabetically, date created, time executed).

## Actions Made

The recurring tasks was set to reoccur 3 minutes after the schedule, this reason was to maintain performance and durabilty of the app, figured out low time setting for the recurring task, will cause multiple data fetching, which will render the speed of this application at a low rate. The one time task execute once is 10 secs after the schedule time.

A custom hook was created to fetch the data from the backend faster, and updating the state as it function is triggered.

Cronstrue library was used for the cron syntax function, scheduling task for the right time to be executed, and recurring them when schedule.

## Reasons for Actions

- **Custom Hook**: for quick data fetching and state rendering,
- **Reusable Task Component**: for displaying the data for each component with this data types without building a new component with the same structure
- **Cronstrue Library**: better used for creating a cron syntax functionality without the use of writing a direct backend server using nodeJs. I used the library for this function due to it's use cases and works well with firebase.

## Design Decisions

A task box was created as the container for the task component.
The task component is designed for the rendering of the data fetched, reusbale for both all tasks and the executed task, to make development faster.

A preloader was added to both welcoming of users to the home page, this is to avoid a static schedule app, also a preloader was added to display before the data is being fetched from the backend.

All components on this app are useful based on the specific use cases.

## Docker-Containerization

This project was handled using docker to contain the application for quick and efficient deplyment.

## Setup-and-Installation

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
