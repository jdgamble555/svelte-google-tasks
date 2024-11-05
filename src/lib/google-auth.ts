import { PUBLIC_CLIENT_ID, PUBLIC_CLIENT_SECRET } from '$env/static/public';
import { google } from 'googleapis';


const REDIRECT_URI = 'http://localhost:5173/auth/callback/google';

export const oauth2Client = new google.auth.OAuth2(
    PUBLIC_CLIENT_ID,
    PUBLIC_CLIENT_SECRET,
    REDIRECT_URI
);

export const getAuthUrl = () => {
    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/tasks'
        ]
    });
};


// Function to exchange authorization code for tokens
export async function getAccessToken(code: string): Promise<void> {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log('Access token acquired');
}

// Function to list tasks
export async function listTasks(): Promise<void> {
    const tasks = google.tasks({ version: 'v1', auth: oauth2Client });
    try {
        const res = await tasks.tasks.list({
            tasklist: '@default'
        });
        console.log('Tasks:', res.data.items);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}
