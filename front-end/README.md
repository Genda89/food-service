# Food Service Front-End

This is the front-end for the Food Service application, built with React and TypeScript. It provides a user interface for authentication, food ordering, and other features, communicating with the back-end via RESTful APIs.

## Features

- User authentication (login/register)
- Food menu browsing
- Order creation and management
- Multi-language support (English, Hungarian)
- Responsive design

## Project Structure

```
src/
  App.tsx                # Main application component
  index.tsx              # Entry point
  constants.ts           # App-wide constants
  variables.scss         # SCSS variables
  components/            # Reusable UI components
    Header/
    LanguageSelector/
    LanguageWrapper/
    Sign/
      Login/
      Register/
  helpers/               # Helper functions
  languages/             # Language files (en-US, hu-Hu)
  utils/                 # Utility functions (e.g., fetchData)
public/                  # Static assets and HTML
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. Navigate to the `front-end` directory:
   ```sh
   cd front-end
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Configuration

- Update API endpoint URLs in `src/utils/fetchData.ts` or relevant files if your back-end is not running on the default port or host.

### Running the App

```sh
npm start
```

The app will start on [http://localhost:3000](http://localhost:3000) by default.

## Scripts

- `npm start` — Start the development server
- `npm run build` — Build the app for production
- `npm test` — Run tests (if available)

---
