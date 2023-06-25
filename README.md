# Blog Project Readme

This project is a web application built using ReactJS, Firebase, and Bootstrap that allows users to manage blog posts. Users can view, add, update, and delete blog posts after logging in with OAuth.

Live Demo: https://firestock.vercel.app/

## Getting Started

To run this project on your local machine, you will need to have Node.js and NPM installed. Once you have installed these, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the project's dependencies.
4. Create a Firebase project and enable Authentication, Firestore, and Storage services.
5. Create a `.env` file in the root directory of the project and add the following environment variables:

   ````
   REACT_APP_API_KEY =
   REACT_APP_AUTH_DOMAIN =
   REACT_APP_PROJECT_ID =
   REACT_APP_STORAGE_BUCKET =
   REACT_APP_MESSAGING_SENDER_ID =
   REACT_APP_APP_ID =
   ```

   You can find these values in your Firebase project settings.

   ````

6. Run `npm start` to start the development server. This will open the application in your default browser.

Alternatively, you can view the live version of this application deployed on a hosting platform.

## Features

This application has the following features:

- Authentication: users can create an account and log in to the application using OAuth.
- View blog posts: users can view a list of blog posts available.
- Add blog posts: users can create new blog posts by providing post details such as title, content, and image.
- Update blog posts: users can edit an existing blog post and save the changes.
- Delete blog posts: users can delete a blog post.

## Technologies Used

The following technologies were used to build this application:

- ReactJS: A JavaScript library for building user interfaces.
- ContextApi : React hook for managing the project state.
- Firebase Authentication: A service that provides authentication and user management for web and mobile applications.
- Firebase Firestore: A cloud-hosted NoSQL database that lets you store and sync data in real-time.
- Firebase Storage: A cloud storage solution for storing user-generated content, such as images and videos.
- Bootstrap: A popular CSS framework for building responsive and customizable user interfaces.
- OAuth: An open-standard protocol for authorization that allows users to authenticate with third-party applications without sharing their credentials.
