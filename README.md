# FarmFlow Designer

This project is a React-based web application for the FarmFlow Designer, providing a central navigation hub to various modules for managing and simulating smart greenhouse workflows.

## Project Structure

- `src/components`: Contains reusable UI components.
  - `src/components/ui`: Auto-generated components from `shadcn/ui`.
  - `src/components/layout`: Components used for page layout, like the navigation cards and sections.
- `src/pages`: Contains the main page components for each route.
- `src/lib`: Contains utility functions, such as the `cn` helper for class names.
- `src/App.tsx`: The main application component that sets up the React Router.
- `src/main.tsx`: The entry point of the application.

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation

1.  Clone the repository to your local machine.
2.  Install the dependencies using npm:
    ```bash
    npm install
    ```

### Running the Development Server

To start the local development server, run the following command. The application will be available at `http://localhost:5173`.

```bash
npm run dev
```

### Running Tests

This project uses `vitest` for unit and integration testing. To run the tests, use the following command:

```bash
npm run test
```

**Note:** The test execution environment has been unstable. If `npm test` fails with a "command not found" error, it indicates a problem with the local `npm` path resolution. The tests themselves are located in `*.test.tsx` files alongside the components they test.

### Building for Production

To create a production-ready build of the application, run:

```bash
npm run build
```

This will create a `dist` directory with the optimized and minified static assets for deployment.
