const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://mtsusyap@gmail:BlueAgate90+@cluster1.fwfz6f2.mongodb.net/?appName=Cluster1',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

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

//booking endpoint
app.post('/api/book', async(req, res) => {
    try{
        const { name, email, date, service, therapist} = req.body;
    //basic validation
    if(!name || !email || !date || !service || !therapist) {
        return res.status(400).json({error: 'All field are required'});    
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
        message: 'Booking succesful',
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
        const booking = await Booking.find().sort({createdAt: -1 });
        res.json(bookings);
    }catch(error){
        res.status(500).json({error: 'Failed to fetch bookings'});
    }
    });
    app.listen(PORT,() => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
  
