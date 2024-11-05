<script>
	import { page } from '$app/stores';
</script>

<main class="flex items-center flex-col gap-5 my-5">
	{#if $page.data.user}
		<div class="border w-80 p-3 break-words">{JSON.stringify($page.data, null, 4)}</div>
		<a class="p-3 border rounded" href="/logout">Logout</a>
		<a class="p-3 border border-red-600 rounded" href="/tasks">Google Tasks</a>
	{:else}
		<a class="bg-red-600 p-3 text-white rounded" href="/login">Login with Google</a>
	{/if}
</main>
