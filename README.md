# Travel Destinations

An Angular application for discovering travel destinations, attractions, and photos using external APIs.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.7.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Keys

The application requires API keys from two services:

#### Geoapify (for geocoding and places data)
- Sign up at: https://www.geoapify.com/
- Get your API key from your dashboard
- Add the key to `src/environments/environment.ts` and `src/environments/environment.prod.ts`

#### Pexels (for photos)
- Sign up at: https://www.pexels.com/api/
- Get your API key from your account
- Add the key to `src/environments/environment.ts` and `src/environments/environment.prod.ts`

### 3. Environment Configuration

The API keys are stored in environment files:
- **Development**: `src/environments/environment.ts`
- **Production**: `src/environments/environment.prod.ts`

The production environment file will be automatically used when building for production.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
# Travel-Destinations
