const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const vehicles = [
    {
        id: 1,
        type: 'Bike',
        pricePerKm: 10,
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop',
        description: 'Fast and affordable for solo rides.'
    },
    {
        id: 2,
        type: 'Car',
        pricePerKm: 25,
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
        description: 'Comfortable ride for up to 4 passengers.'
    },
    {
        id: 3,
        type: 'Taxi',
        pricePerKm: 30,
        image: 'https://images.unsplash.com/photo-1556122071-e404eaedb77f?q=80&w=1934&auto=format&fit=crop',
        description: 'Professional service for city travel.'
    }
];

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cabgo')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Define Booking Schema
const bookingSchema = new mongoose.Schema({
    bookingId: Number,
    vehicleId: Number,
    name: String,
    pickup: String,
    drop: String,
    paymentMethod: String,
    price: Number,
    date: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);



app.get('/api/vehicles', (req, res) => {
    res.json(vehicles);
});

app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ date: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/bookings', async (req, res) => {
    const { vehicleId, name, pickup, drop, paymentMethod } = req.body;
    if (!vehicleId || !name || !pickup || !drop || !paymentMethod) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const vehicle = vehicles.find(v => v.id === vehicleId);
    const price = vehicle ? vehicle.pricePerKm * 5 : 0; // Mock 5km distance

    const bookingId = Math.floor(Math.random() * 10000);

    const newBooking = new Booking({
        bookingId,
        vehicleId,
        name,
        pickup,
        drop,
        paymentMethod,
        price
    });

    try {
        await newBooking.save();
        res.json({ message: 'Booking confirmed!', bookingId, vehicleId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Keep the process alive
setInterval(() => { }, 1000);
