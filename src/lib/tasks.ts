import { google } from 'googleapis';
import { type OAuth2Client } from 'google-auth-library';


export async function getTaskLists(auth: OAuth2Client) {

    try {
        const taskAPI = google.tasks({
            version: 'v1',
            auth
        });

        const taskList = await taskAPI.tasklists.list();

        return {
            data: taskList.data
        };
    } catch (error) {

        console.error('Error fetching tasks:', (error as Error).message);
        
        return {
            error
        };
    }
}

export async function getTasksByList(auth: OAuth2Client, tasklist: string) {

    try {
        const taskAPI = google.tasks({
            version: 'v1',
            auth
        });

        const tasks = await taskAPI.tasks.list({
            tasklist
        });

        return {
            data: tasks.data
        };
    } catch (error) {

        console.error('Error fetching tasks:', (error as Error).message);
        
        return {
            error
        };
    }
}