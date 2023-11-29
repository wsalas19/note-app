# Note App

A simple note app that allows users to view, create, delete, and edit notes. The project is built using React (TypeScript) for the client and NestJS for the API, with a database hosted on Neon.tech.

## Technologies Used

### Frontend

- **React (TypeScript):** A JavaScript library for building user interfaces, enhanced with TypeScript for static typing.

- **Vite:** A fast build tool for modern web development.

- **React Router Dom:** Declarative routing for React.js applications.

- **React Query (by TanStack):** A library for managing, caching, and syncing asynchronous data in React applications.

- **React Modal:** A simple and accessible modal dialog component for React.

### Backend

- **NestJS:** A progressive Node.js framework for building efficient and scalable server-side applications.

- **TypeORM:** An Object-Relational Mapping (ORM) library for TypeScript and JavaScript.

## Features

- **View Notes:** Browse through all the notes in the app.

- **Create Notes:** Add new notes to the app.

- **Edit Notes:** Modify the content of existing notes.

- **Delete Notes:** Remove notes from the app.

- **Filter Notes:**

  - **All:** View all notes, both archived and unarchived.
  - **Archived:** View only archived notes.
  - **Unarchived:** View only unarchived notes.

- **API Endpoints:**

  - `/notes`: CRUD operations for managing notes.
  - `/categories`: CRUD operations for managing categories.

To specify the versions, you can find each version of every dependency right on the package.json of each side on `/backend` and `/frontend`.

## Backend Setup

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Run the development server: `npm run start:dev`.

## Frontend Setup

1. Navigate to the `client` directory.
2. Install dependencies: `npm install`.
3. Run the development server: `npm run dev`.

## Database

- The database is hosted on [Neon.tech](https://neon.tech/).

## Contributions

Contributions are welcome! If you find a bug or have suggestions, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
