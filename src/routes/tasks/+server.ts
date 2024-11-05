import { oauth2Client } from '$lib/google-auth';
import { google } from 'googleapis';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
    const tokenCookie = cookies.get('tokens');
    if (!tokenCookie) {
        return new Response('User not authenticated', { status: 401 });
    }

    const tokens = JSON.parse(tokenCookie);
    oauth2Client.setCredentials(tokens);

    const tasksApi = google.tasks({ version: 'v1', auth: oauth2Client });

    try {
        // Get the list of task lists
        const taskLists = await tasksApi.tasklists.list();
        if (taskLists.data.items) {
            const tasks = await Promise.all(
                taskLists.data.items.map(async (taskList) => {
                    const tasksResponse = await tasksApi.tasks.list({
                        tasklist: taskList.id || ''
                    });
                    return {
                        taskListTitle: taskList.title,
                        tasks: tasksResponse.data.items || [],
                    };
                })
            );
            return new Response(JSON.stringify(tasks), { status: 200 });
        }
        return new Response('No task lists found', { status: 404 });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return new Response('Error fetching tasks', { status: 500 });
    }
};
