# Facebook Clone

Welcome to my Facebook Clone project, a full-stack web application that replicates the core functionality of the popular social networking service. This project was built using the MERN stack, Cloudinary, Sendgrid and more, aiming to highlight the breadth and depth of my full-stack development skills. Although it's still under construction, I think you'll find the progress intriguing.

## Table of Contents

- [Technologies](#technologies)
- [Roadmap](#roadmap)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Technologies

This project is built with the following technologies:

- **MERN Stack**: MongoDB, Express.js, React.js, Node.js
- **Cloudinary**: For image uploading and management.
- **Sendgrid**: For reliable email delivery service.

These technologies were chosen to create a scalable, high performance, and robust application.

## Roadmap

The following features are being implemented:

1. **🔐 User Authentication**: Secure sign-up and login functionality using bcrypt encryption for password security and and JSON Web Tokens.
2. **📝 Posts**: Users can create, update, and delete posts.
3. **💬 Comments**: Users can comment on posts.
4. **👍 Likes**: Users can like posts and comments.
5. **☁️ Image Upload**: Users can upload profile and post images to Cloudinary.
6. **📧 Email Delivery**: Sendgrid is used for email verification and password reset functionality.

More features are on the way!

## Installation

To get this project up and running, follow these steps:

1. Clone this repository:

```bash
git clone https://github.com/ney-l/facebook-clone.git
```

2.Install the necessary packages:
In the project directory, you can run:

```bash
cd frontend
yarn install
cd ../backend
yarn install
```

3.Create a `.env` file in the backend and frontend directories of the project respectively and fill in your MongoDB URI, Cloudinary credentials, and Sendgrid API key, etc like so:

If you miss any environment variables the app is going to throw a tantrum and refuse to start the server 😅. Check `backend/src/config/envVars.ts` to find out what you need.

backend/.env

```txt
PORT=<PORT YOU WANT THE SERVER TO RUN ON eg. 3000>
BASE_URL=<SERVER BASE URL, EG. http://localhost:3000>
CLIENT_URL=http://localhost:5173
JWT_SECRET=<JWT SECRET WOULD GO HERE>
EMAIL=<THE "FROM" EMAIL FOR SENDGRID TO USE>
DATABASE_URL=<YOUR MONGO URL WOULD GO HERE>
CLOUDINARY_NAME=<YOUR CLOUDINARY NAME HERE>
CLOUDINARY_API_KEY=<YOUR CLOUDINARY API KEY HERE>
CLOUDINARY_API_SECRET=<YOUR CLOUDINARY API SECRET HERE>
SENDGRID_API_KEY=<YOUR SENDGRID API KEY HERE>
```

frontend/.env

```txt
VITE_API_URL=your_api_url
```

4.Start the server and the frontend

```bash
cd backend
yarn dev
```

From another terminal

```bash
cd frontend
yarn
```

## Usage

Navigate to localhost:{{PORT}} in your web browser to access the application. From there, you can create an account, login, and start interacting with the posts!

## Contributing

While this project is mainly for portfolio purposes, I'm open to collaboration and constructive feedback. Feel free to open an issue or pull request if you have something to contribute.

## License

This project is licensed under the MIT License

✨ This project is a work in progress and is part of my journey in full-stack development. Feel free to reach out to me with your feedback or if you're interested in working on similar projects.
