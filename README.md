# NASCENT TAKE HOME TEST

## Assignment
Please thoroughly review the provided Assignment requirements PDF for the description.

## Candidate Notes

### Designs

The following files contain my brainstormings, wireframes and ideas for the application:

- Excalidraw: https://excalidraw.com/#json=v3RtcFDORBZlwzvYRTuGf,idzrYyTMrRM_jlTFyjMLSw
- Figma: https://www.figma.com/design/lf2V2aTS3Az6VhfkDZ3Pol/Nascent---Frontend-Test?node-id=0-1&t=nJU7wRRLDaQLVfEY-1

### Library/tool choices

#### Shadcn UI:

Since the project had to be developed quickly, I chose Shadcn UI because it provides ready-to-use components out of the box. It’s built on top of Radix UI, which ensures great accessibility. Additionally, Shadcn offers an excellent developer experience and clean, modern components that contribute to a solid user experience.

#### React Hook Form:

I used React Hook Form to manage the application's forms. The main reason was its seamless integration with validation libraries like Zod, and the wide range of features it provides, such as watching field values, resetting the form, and handling loading states. These capabilities made form handling much more efficient.

#### Zod: 

I used Zod for data validation. I chose it mainly because of its strong TypeScript support, which allowed me to ensure type safety and consistency across the application.

#### Zustand:

I used Zustand for global state management. As the mid-market price information is consumed by different parts of the application, I needed a global state management tool to help me with that.

#### TanStack React Query: 

I used TanStack React Query to handle data fetching. It helped me manage server state more effectively by caching responses, automatically revalidating data, and exposing useful methods and state for request control.

#### Axios: 

I used Axios for API requests. It was helpful because I could configure a base URL, avoiding repetition in every request, and it automatically parses JSON responses, unlike the native fetch, which requires manual parsing.

#### Tailwind CSS: 

In addition to being highly productive with Tailwind CSS, I used it because Shadcn UI is built on top of Tailwind. Its utility-first approach allowed me to style components quickly and consistently.

#### React Router:

I used React Router to manage application routes and navigation. It’s a well-established solution that offered the flexibility I needed for client-side routing.

## How to Run

### 1. Install the dependencies

```bash
npm install
```

### 2. Start Web & Server

```bash
npm start
```

### 3. Access the app

```bash
http://localhost:3000
```

## About the Template

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode along with the mock server\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The mock server is running on [http://localhost:3001](http://localhost:3001).

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
