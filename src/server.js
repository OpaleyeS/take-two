const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true

}));
app.use(express.json());
//test route to verify server is working
app.get('/api/record',(req, res) => {
    res.json({status: 'Server is running', Timestamp:new Date()});
});

const password = encodeURIComponent('BlueAgate90+');
const MONGODB_URI = `mongodb+srv://mtsusyap:${password}@cluster1.fwfz6f2.mongodb.net/reservationDB?appName=Cluster1`;

console.log('Testing connection to:', connectionString.replace(password, '***'));

//Booking Schema 

const bookingSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email:{type: String, required: true},
    date:{type: Date, required: true},
    service:{ type: String, required: true},
    therapist: {type: String, required: true},
    createdAt:{type: Date, default: Date.now}
});

const Booking = mongoose.model('Booking', bookingSchema);
//connecting to mongodb
mongoose.connect(MONGODB_URI)
.then(() => {
    console.log("MongoDB connected successfully");
//verify if server is working 
app.get('/api/record', (req, res) => {
    res.json({status: "Server is Running", Timestamp: new Date()});
});

//booking endpoint
app.post('/api/book', async(req, res) => {
    try{
        const { name, email, date, service, therapist} = req.body;
    //basic validation
    if(!name || !email || !date || !service || !therapist) {
        return res.status(400).json({error: 'All fields are required'});    
    } 
//create new booking
const booking = new Booking({
    name, 
    email,
    date: new Date(date),
    service,
    therapist
});
//save to database
await booking.save();

console.log('New booking created:', booking);

    res.status(201).json({
        message: 'Booking successful',
        booking:{
            id:booking._id,
            name:booking.name,
            email:booking.email,
            date:booking.date,
            service:booking.service, 
            therapist:booking.therapist
        }
    });
    }catch(error){
        console.error('Booking error:', error);
        res.status(500).json({error: 'Internal server error'});
        }
    });
//get all bookings 
app.get('/api/bookings', async (req, res) => {
    try{
        const bookings = await Booking.find().sort({createdAt: -1 });
        res.json(bookings);
    }catch(error){
        res.status(500).json({error: 'Failed to fetch bookings'});
    }
    });
    app.listen(PORT,() => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.error('MOngoDB connection error:', err);
    process.exit(1);
});
  
