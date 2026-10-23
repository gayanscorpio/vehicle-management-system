# Full Startup Checklist: Backend + Frontend

This checklist helps you start both the Spring Boot backend and the React + TypeScript frontend correctly.

## 1. Prerequisites

Make sure the following are installed:

- Java JDK 17+
- Maven
- Node.js 18+
- npm
- Git

Check versions:

java -version
mvn -v
node -v
npm -v


2. Start the Backend
Open the backend project folder:

cd backend
Run the backend:

mvn spring-boot:run
Or run the Spring Boot main class from your IDE.

Verify backend is running

Open:
http://localhost:8080

Then check GraphQL endpoint:
http://localhost:8080/graphql


You should see the GraphQL playground or endpoint response depending on your configuration.

If the GraphQL endpoint is not available:

verify the application started successfully
check application logs
confirm database connection is active
confirm GraphQL dependency is included in the backend


3. Backend GraphQL Check

Test the backend with a simple query:
query {
  vehicles(page: 0, size: 20) {
    content {
      id
      vin
      plateNumber
      make
      model
      year
    }
    totalElements
    totalPages
    page
    size
  }
}


If this works, the backend is ready.

4. Frontend Setup
Open the frontend folder:

cd frontend

npm install

Create .env file:
VITE_GRAPHQL_ENDPOINT=http://localhost:8080/graphql

Make sure the file exists in the frontend root:
frontend/.env

5. Run the Frontend

npm run dev

Open the browser to:
http://localhost:5173

6. Frontend Routes to Test

http://localhost:5173/

Vehicles list:
http://localhost:5173/vehicles

New vehicle form:
http://localhost:5173/vehicles/new

Detail page:
http://localhost:5173/vehicles/1

Edit page:
http://localhost:5173/vehicles/1/edit

7. TypeScript Validation

cd frontend
npx tsc --noEmit

8. Production Build

When ready for deployment:

cd frontend
npm run build

9. Common Issues and Fixes

Issue: Frontend cannot connect to backend

Check:

backend is running
VITE_GRAPHQL_ENDPOINT is set correctly
backend listens on port 8080
GraphQL endpoint is reachable at /graphql
Issue: GraphQL query fails

Check:

backend GraphQL schema has vehicles
your query variable names match the backend
your schema types match the frontend code
Issue: Blank page

Check:

BrowserRouter is wrapping the app
routes exist in App.tsx
there are no console errors
the root element exists in index.html


Issue: TypeScript errors
npx tsc --noEmit

10. Quick Start Sequence

Run both together in separate terminals:

Terminal 1 - Backend

bash
cd backend
mvn spring-boot:run


Terminal 2 - Frontend

bash
cd frontend
npm install
npm run dev

Then open: http://localhost:5173

11. Final Check

The app is ready when:

backend responds at http://localhost:8080/graphql
frontend runs at http://localhost:5173
list page loads
create form loads
vehicle detail page loads
editing works
deleting works

12. Optional: Use Docker or CI Later

If needed later, you can add:

Docker Compose
database containers
CI pipeline
environment files for dev/staging/prod



