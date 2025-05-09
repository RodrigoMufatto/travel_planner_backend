# ✈️ Travel Planner Backend

This is the backend of the **Travel Planner** project, built with [NestJS](https://nestjs.com/), [Prisma ORM](https://www.prisma.io/), and JWT-based authentication. It allows users to manage trips, destinations, activities, flights, hotels, and restaurants in an organized and secure way.

---

## 🚀 Technologies Used

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [Yarn](https://yarnpkg.com/)
- [Jest](https://jestjs.io/) for testing

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/travel_planner_backend.git
cd travel_planner_backend

# Install dependencies
yarn install
```

---

## 🔧 Environment Configuration

Create a `.env` file in the project root with:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/travel_planner"
JWT_SECRET="your_secret_key"
```

---

## 🔄 Database Setup with Prisma

```bash
# Run database migrations
npx prisma migrate dev --name init

# Open Prisma Studio (optional)
npx prisma studio
```

---

## 🧪 Running Tests

```bash
# Run all unit tests
yarn test

# Run tests with coverage report
yarn test:cov
```

> Test files are located alongside source files and named with `.spec.ts`.
> Jest is already configured via `jest.config.ts`.

---

## 📁 Project Structure

```
src/
├── activity/
├── auth/
├── destination/
├── flight/
├── hotel/
├── restaurant/
├── trip/
├── shared/
│   └── repositories/
├── prisma/
└── main.ts
```

---

## 🛡️ Security

Protected routes use `@UseGuards(AuthGuard)` and require a valid JWT token.

**Example:**

```
Authorization: Bearer your_jwt_token
```

---

## 📌 TODO

- [x] User signup and login with JWT
- [x] Trip and destination CRUD
- [x] Add flights, hotels, and restaurants
- [x] Paginated listing
- [x] Unit testing with Jest
- [ ] Swagger API documentation (in progress)
- [ ] Cloud deployment

---

## 📝 License

MIT © 2025

## 🗂️ Database Schema Overview

The following is a high-level description of the data model used in this project, based on the Prisma schema:

### 👤 User and Trip Management

- **User**
  - Can have multiple `UserTrips`
  - Stores personal information and credentials

- **UserTrip**
  - Many-to-many relationship between `User` and `Trip`
  - Has roles: `OWNER`, `MANAGER`, `SPECTATOR`

- **UserTripCheck**
  - Tracks status: `CONFIRMED`, `PENDING`, `DENIED` for user in a trip

### 🧭 Trip and Destination

- **Trip**
  - Has many `Destinations`
  - Linked to users via `UserTrips`

- **Destination**
  - Belongs to one `Trip`
  - Has many `Activities`, `Hotels`, `Restaurants`, and `GeneralFlights`

### 🗺️ Activities

- **Activity**
  - Has a title, description, cost, and time window
  - Related to `Destination` and `Address`
  - Has members via `UserTripActivityMember`

- **UserTripActivityMember**
  - Links a `UserTrip` to an `Activity` with a status

### 🏨 Hotels and Restaurants

- **Hotel / Restaurant**
  - Related to a `Destination` and `Address`
  - Stores rating and other location details

### ✈️ Flights

- **GeneralFlight**
  - Group of flights for a destination
  - Contains price, stop count, duration

- **Flight**
  - Specific segment of a flight
  - Linked to `GeneralFlight`

### 📍 Address

- Reused across `Activity`, `Hotel`, and `Restaurant`
- Contains common location fields

This structure promotes clean normalization, efficient querying, and flexibility for travel planning use cases.
