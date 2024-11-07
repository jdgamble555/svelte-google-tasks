<script lang="ts">
	import { page } from '$app/stores';
</script>

<main class="flex items-center flex-col my-5 gap-5">
	<h1 class="text-3xl">Task Lists</h1>
	<p>Choose a task list:</p>
	{#each $page.data.taskLists as task (task.id)}
		<nav class="flex">
			<a class="p-3 border rounded bg-blue-500 text-white" href={'/task/' + task.id}>
				{task.title}
			</a>
		</nav>
	{/each}
</main>
