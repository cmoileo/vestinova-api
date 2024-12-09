# Vestinova

Vestinova is a web application that allows people to sell their used items. Users can create an account, list their items for sale, and browse items listed by other users. The application aims to promote sustainability by encouraging the reuse of items.

## To run project locally

1. Clone the repository
   ```bash
   git clone https://github.com/cmoileo/vestinova-api
    ```
   
2. Navigate to the project directory


3. Install dependencies
   ```bash
   npm install
   ```
   
4. Create a `.env` file in the root directory and add the necessary environment variables. You can use the `.env.example` file as a reference.


5. Lauch docker containers
   ```bash
   docker-compose up -d
   ```
   
6. Start the application
   ```bash
    npm run dev
    ```

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Docker
- TypeScript
- Sequelize

## Roadmap

- [x] User authentication and authorization
- [x] Item module
- [x] Search functionality
- [x] User profiles
- [x] Ratings and reviews