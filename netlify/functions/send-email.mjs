// Back-end email sending through nodemailer

// Imports
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
// import { create } from 'domain';

// Info from supabase to connect to database
const supabase_url = process.env.SUPABASE_URL;
const supabase_key = process.env.SUPABASE_KEY;

export const handler = async function (event){
    console.log('Checking httpMethod:', event.httpMethod);
    console.log('Checking body:', event.body);

    //Checking httpMethod
    if(event.httpMethod !== 'POST'){
        console.log("Error: Wrong method");
    }

    //Checking if body exists
    if(!event.body){
        console.log('Error: Body does not exist');
    }

    // Changing JSON string into javascript object
    let parsedBody;
    try{
        parsedBody = JSON.parse(event.body);
    } 
    catch (error){
        console.log('Error', error);
    }

    // Inserting 3 values into the database
    const {name, email, numberOfTickets} = parsedBody;

    try{
        // Connecting to database
        const supabase = createClient(supabase_url, supabase_key);
        const {data, error} = await supabase
            .from('ticket_reservations')
            .insert({name,email,numberOfTickets});

        if(error){
            console.error('Error: Inserting data', error);
        } else{
            console.log('Data successfully inserted', data);
        }

        // After getting values, send email with nodemailer
        // Connecting to email account
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        //sending email
        await transporter.sendMail({
            from: `'Event Team' <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Reservation Confirmation',
            html: `<h2>Hello ${name}, </h2>
            <p>Thank you for your reservation!</p>
            <p><strong>Tickets reserved:</strong>${numberOfTickets}</p>
            <p><strong>Event date:</strong>12/12/2025</p>
            <p><strong>Event location:</strong>SAE House, 297 Kingsland Rd, London E8 4DD</p>
            <a href=''>Website link</a>
            <p>We're excited to see you soon!</p>`
        });

        console.log('Email was sent');
    }
    catch (error){
        console.error('Error', error);
    }
}