import React, {useState} from 'react';

import Calendar from 'react-calendar';

import { useNavigate } from 'react-router-dom';

const servicesList = [
    'Massage',
    'Body Treatment',
    'Package',
    'Special'
];

const TherapistList = [
    'Su',
    'Dimond'
];

const Reservation = ( ) => {
    //define state variables for form elements
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState(new Date());
    const [service, setService] = useState('');
    const [therapist, setTherapist] = useState('');

    const navigate = useNavigate();
//Handle form submitions, preventing default HTML actions.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try{
        const response = await fetch ('http://localhost:5001/api/book',{
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({name,email, date: date.toISOString(),service,therapist}),
        });
    const data = await ressponse.json();    
// tells the client if the booking was sucessful 
if(response.ok) {
    alert(`Booking for ${name} on ${date.toLocaleDateString()} sucessful.We will send a email to confirm`);
    //Reset Form 
        setName('');
        setEmail('');
        setDate(new Date());
        setService('');
        setTherapist('');
        navigate('/');

}else{
    alert('Booking failed. Please try again.');
    }
    }catch(error){
        console.error('Error:', error);
        alert('Booking failed.Please try again');
    }finally{
        setIsLoading(false);
    }
};
return(
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px'}}>
        <h2>Make an Appointment</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap:'15px'}}>
            <div>
                <label htmlFor='name'>Name: </label>
                <input
                    type='text'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    required
                    style={{width: '100%', padding: '8px', marginTop:'5px'}}
                    />
            </div>    

                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type ='email'
                        id = 'email'
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width:'100%', padding: '8px', marginTop: '5px'}}
                        />
                </div>        
                        
                    <div> 
                        <label>Date:</label>
                        <div style={{marginTop: '10px'}}>
                        <Calendar
                            onChange={setDate}
                            value={date}
                            required
                            />
                    </div>   
                         <p>Selected Date:{date.toLocaleDateString()}</p>
                    </div>

                        <div>
                            <label htmlFor="service">Service</label>
                            <select
                                id='service'
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                                required
                                style={{ width: '100%', padding: '8px', marginTop: '5px'}}
                                >    
                                    <option value ='' disabled>Select a sservice</option>
                                        {servicesList.map((serviceOption, index) => (
                                            <option key={index} value={serviceOption}>
                                                {serviceOption}</option>
                                        ))}
                                </select>
                            </div>    
                                    <div>
                                        <label htmlFor='therapist'>Therapist</label>
                                        <select
                                            id='therapist'
                                            value={therapist}
                                            onChange={(e) => setTherapist(e.target.value)}
                                            required
                                            style={{ width: '100%', padding: '8px', marginTop:'5px'}}
                                            >
                                                <option value ='' disabled>Select a therapist</option>
                                                    {TherapistList.map((therapistOption, index) => (
                                                    <option key={index} value={therapistOption}>
                                                        {therapistOption}
                                                    </option>    
                                                    ))}
                                            </select> 
                                        </div>    

                                <button 
                                    type='submit'
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#646cff',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Book Appointment 
                                </button>
                    </form>
    </div>
);
};
export default Reservation;