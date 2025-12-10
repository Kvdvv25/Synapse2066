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
        return {
            statusCode: 405,
            body: JSON.stringify({error: 'problem with method'})
        }
    }

    //Checking if body exists
    if(!event.body){
        console.log('Error: Body does not exist');
        return {
            statusCode: 400,
            body: JSON.stringify({error: 'missing body'})
        }
    }

    // Changing JSON string into javascript object
    let parsedBody;
    try{
        parsedBody = JSON.parse(event.body);
    } 
    catch (error){
        console.error('Error', error);
        return {
            statusCode: 400,
            body: JSON.stringify({error: 'JSON is incorrect'})
        }
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
            alert('Error: ' + error.message);
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
            html: `
                <!DOCTYPE html>
                    <html lang="en">
                        <body style="margin:0; padding:0;">
                        <h2 style="margin:0; font-size:24px;">Hello ${name}, </h2>
                        <p>Thank you for your reservation!</p>
                        <p style="margin:0; font-size:16px; line-height:1.5;";><strong style="margin-right:10px;">Tickets reserved:</strong>${numberOfTickets}</p>
                        <p style="margin:0; font-size:16px; line-height:1.5;"><strong style="margin-right:10px;">Event date:</strong>12/12/2025</p>
                        <p style="margin:0; font-size:16px; line-height:1.5;"><strong style="margin-right:10px;">Event location:</strong>SAE House, 297 Kingsland Rd, London E8 4DD</p>
                        <br>
                        <a href='https://synapse2066.netlify.app/' style="padding: 10px 30px; border: 1px solid #b3bfbf; border-radius: 30px;background-color: #b3bfbf ; text-decoration:none; color:black; margin-bottom:30px;">Visit Website</a>
                        </body>
                    </html>`    
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Success! Email sent.' })
          };
    }
    catch (error){
        console.error('Error', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
          };
    }
}