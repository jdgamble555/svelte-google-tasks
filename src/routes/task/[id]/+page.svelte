<script lang="ts">
	import { page } from '$app/stores';
</script>

<main class="flex items-center flex-col my-5 gap-5">
	<h1 class="text-3xl">Task for ID:</h1>
	<h2>{$page.params.id}</h2>
	<p>Here are your tasks:</p>
	{#each $page.data.tasks as task (task.id)}
		{@const updated = new Date(task.updated).toLocaleDateString()}
		<nav class="flex">
			<div class="p-3 border rounded flex flex-col gap-3">
				<span class="text-xl">{task.title}</span>
				<div class="flex gap-3"><span class="font-semibold">Updated:</span>{updated}</div>
			</div>
		</nav>
	{/each}
</main>
