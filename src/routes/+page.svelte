<script>
	import { page } from '$app/stores';

	const user = $derived($page.data?.user);
</script>

<main class="flex items-center flex-col gap-5 my-5">
	{#if $page.data.user}
		<div class="flex flex-col justify-center items-center gap-3">
			<h3 class="text-2xl font-bold">Hi {user.name}!</h3>

			{#if user.picture}
				<img src={user.picture} height="100" width="100" alt="user avatar" />
			{/if}
			<p>Your userID is {user.id}</p>
		</div>
		<a class="p-3 border rounded" href="/logout">Logout</a>
	{:else}
		<a class="bg-red-600 p-3 text-white rounded" href="/login">Login with Google</a>
	{/if}
</main>
