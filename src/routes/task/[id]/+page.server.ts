import { getTasksByList } from "$lib/tasks";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


export const load = (async ({ params, locals: { getGoogleSession } }) => {

    const id = params.id;

    const session = getGoogleSession();

    if (!session) {
        return error(401, 'Not Logged In!');
    }

    const { data, error: taskError } = await getTasksByList(session.client, id);

    if (taskError) {
        return error(404, (taskError as Error).message);
    }

    if (!data || !data.items) {
        return error(404, 'No Tasks Apparently!');
    }

    return {
        tasks: data.items
    };

}) satisfies PageServerLoad;