# Task Manager Web Application

Welcome to the Task Master App, a simple task managment app.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)

## Introduction

The Task Master App is a simple, user-friendly web application built with the MERN Stack. It integrates with a Mongo database to store and manage your tasks.

## Features

Here are the key features of the Task Master App:

- **Create Tasks:** Easily add and manage Tasks with an interactive Calendar, with options of selecting day of the month, month and year.
- **Check off completed tasks:** Update the task completion status with a simple click.
- **Change task name:** Edit Task name with an togglable form.
- **Delete Tasks:** Remove tasks that no longer need to be tracked with a click of a button.

## Getting Started

Getting started with the Task Master is quick and straightforeward. Just follow these steps:

1. **Clone the Repository:**
2. **Run npm install:** Install all the dependencies required to run the app
3. **Setup a MongoDB account:** Go to mongodb.com and create an account, start a cluster, and copy the db uri and save it to an env variable so the server has a db to connect to.
4. **Update the Fetch URLs:** make sure that the port the server is running on is in the env file as PORT= \*\*\*\*, make sure the port the client is running on is the same as the proxy end point in the vite.config

## Usage

1. **Run server:** cd into the server directory and run 'npm run dev' to fire up the server.
2. **Run client:** cd into the client directory and run 'npm run dev' to fire up the front end.
3. **Open:** click the link next to local in the terminal and the app will open in the browser.
4. **Account:** Signup for an account with email and password and login to start interacting with the Task Master app.
5. **Tasks:** Start creating tasks by selecting a day in the calendar (which is collapsed by default, click the + next to the date), fill in the name of the task in the form and it will populate down below. The task object can by interacted with in a few ways: check the task off, edit the task name, delete the task.
