const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bcrypt = require('bcryptjs');
const { MongoClient, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const cors = require("cors");

const uri = "mongodb+srv://sathees:Sathees123@cluster1.a1nbh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
const client = new MongoClient(uri);
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

const secretKey = process.env.JWT_SECRET_KEY;

console.log("JWT_SECRET_KEY:", secretKey); // Debugging line to check if the value is loaded

if (!secretKey) {
    console.error("JWT_SECRET_KEY is not defined in the .env file.");
    process.exit(1); // Exit the application if the secret key is missing
}

// Test JWT functionality
const token = jwt.sign({ userId: "testUser" }, secretKey, { expiresIn: '1h' });
console.log("Generated Token:", token);

try {
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded Token:", decoded);
} catch (error) {
    console.error("Invalid Token:", error.message);
}

// Middleware for JWT validation
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = decoded;  // Attach user info to the request
        next(); // Proceed to the next middleware or route handler
    });
};

// Register route
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    console.log("Received data:", { name, email, password }); // Debug log

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await client.connect();
        console.log("Connected to MongoDB"); // Debug log

        const database = client.db("prime-seats");
        const users = database.collection("users");

        // Check for existing user
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            console.log("User already exists:", email); // Debug log
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user with hashed password
        const user = { name, email, password: hashedPassword }; // Store the hashed password in 'password' field
        const result = await users.insertOne(user);
        console.log("Inserted user:", result); // Debug log

        res.status(201).json({ message: "Registration successful", userId: result.insertedId });
    } catch (error) {
        console.error("Error during registration:", error); // Debug log
        res.status(500).json({ message: "An error occurred during registration" });
    } finally {
        await client.close(); // Clean up the MongoDB connection
    }
});

// Login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        await client.connect();
        const database = client.db("prime-seats");
        const users = database.collection("users");

        // Find user by email
        const user = await users.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.email }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "An error occurred during login" });
    } finally {
        await client.close(); // Clean up the MongoDB connection
    }
});
app.get('/event/:id', async (req, res) => {
    const { id } = req.params;
    
    console.log("Requested Event ID:", id); // Log the event ID
    
    try {
      await client.connect();
      const database = client.db('prime-seats');
      const eventsCollection = database.collection('events');
  
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid event ID' });
      }
  
      const event = await eventsCollection.findOne({ _id: new ObjectId(id) });
  
      if (!event) {
        console.log("Event not found for ID:", id); // Log when event is not found
        return res.status(404).json({ message: 'Event not found' });
      }
  
      res.json({ event, seats: event.seats || [] });
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({ message: 'Error fetching event details' });
    } finally {
      await client.close();
    }
  });
  
  
  
  // Booking seat endpoint
  app.post('/events/:id/book-seat', async (req, res) => {
    const { id } = req.params;
    const { seatLabel, userId } = req.body;
  
    try {
      await client.connect();
      const database = client.db('prime-seats');
      const eventsCollection = database.collection('events');
  
      const event = await eventsCollection.findOne({ _id: new ObjectId(id) });
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      const seatIndex = event.seats.findIndex(seat => seat.label === seatLabel);
      if (seatIndex === -1) {
        return res.status(400).json({ message: 'Invalid seat label' });
      }
  
      if (event.seats[seatIndex].occupied) {
        return res.status(400).json({ message: 'Seat already occupied' });
      }
  
      // Mark the seat as booked
      event.seats[seatIndex].occupied = true;
      event.seats[seatIndex].userId = userId;
  
      await eventsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { seats: event.seats } }
      );
  
      res.status(200).json({ message: 'Seat booked successfully' });
    } catch (error) {
      console.error('Error booking seat:', error);
      res.status(500).json({ message: 'Error booking seat' });
    } finally {
      await client.close();
    }
  });
    

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Access granted', user: req.user });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});