# TenisPlayer API

A Node.js API for storing and retrieving player and match data using MongoDB.

### Endpoints

- **`/players`** - Retrieve all players (supports pagination)
- **`/player/:id`** - Retrieve a player by ID
- **`/statistics`** - Retrieve global statistics

### Prerequisites

- **Node.js** and **Yarn**
- Local MongoDB (start with `brew services start mongodb-community`)

### Cloud Access

Access the cloud instance at:

- `http://3.249.163.234:3000/players`
- `http://ec2-3-249-163-234.eu-west-1.compute.amazonaws.com:3000/players`

The cloud deployment uses AWS DocumentDB, nested within a VPC subnet for security and scalability.

### Setup and Running

1. **Install dependencies**:

   ```bash
   yarn install
   ```

2. **Build**:

   ```bash
   yarn build
   ```

3. **Run locally**:

   ```bash
   yarn start
   ```

4. **Run with Docker**:

   ```bash
   docker build -t tenisPlayerApi .
   docker run -p 3000:3000 tenisPlayerApi
   ```

5. **Testing**:
   ```bash
   yarn test
   ```
