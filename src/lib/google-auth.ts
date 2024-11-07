import { PUBLIC_CLIENT_ID, PUBLIC_CLIENT_SECRET } from '$env/static/public';
import { google } from 'googleapis';
import type { OAuth2Client } from 'google-auth-library';


export const COOKIE_NAME = 'user';

const REDIRECT_URI = '/auth/callback/google';


export const createOAuth2Client = (origin: string) => {
    return new google.auth.OAuth2(
        PUBLIC_CLIENT_ID,
        PUBLIC_CLIENT_SECRET,
        origin + REDIRECT_URI
    );
};

export const getAuthUrl = (client: OAuth2Client) => {
    return client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/tasks'
        ]
    });
};



