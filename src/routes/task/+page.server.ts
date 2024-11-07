import { getTaskLists } from '$lib/tasks';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { getGoogleSession } }) => {

    const session = getGoogleSession();

    if (!session) {
        return error(401, 'Not Logged In!');
    }

    const { data, error: taskError } = await getTaskLists(session.client);

    if (taskError) {
        return error(404, (taskError as Error).message);
    }

    if (!data || !data.items) {
        return error(404, 'No Tasks Apparently!');
    }

    return {
        taskLists: data.items
    };

}) as PageServerLoad;
