import axios from "axios";
import config from "../config/config.js";

const SendEmail = async (email, variables,template_id) => {
    const apiKey = config.msg91_api_key;    
    const templateId = template_id;   
    const fromEmail = 'contact@theuniversitiesusa.com'; 
    const senderName = 'The Universities USA';       
    const domain = 'theuniversitiesusa.com'
    console.log("API KEYS -----------", apiKey,"----temp",templateId);
    try {
        const response = await axios.post('https://api.msg91.com/api/v5/email/send', {
            from: {
                email: fromEmail,          
                name: senderName           
            },
            to: [
                {
                    email: email           
                }
            ],
            domain: domain,                
            template_id: templateId,      
            variables: variables
        }, {
            headers: {
                authkey: apiKey,            
                'Content-Type': 'application/json', 
            }
        });

        if (response?.data?.status === 'success') {
            console.log('OTP sent to email successfully using the global template!');
            console.log(response)
        } else {
            console.log('Failed to send OTP:', response.data);
        }
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with an error code
            console.error('Error response from API:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Some other error occurred
            console.error('Error in request setup:', error.message);
        }
    }
};

export default SendEmail