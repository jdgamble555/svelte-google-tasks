<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';
	let { children } = $props();
</script>

{@render children()}
{#if $page.data?.user}
	<nav class="flex gap-3 justify-center mt-5">
		<a href="/">Home</a>
		<a href="/task">Tasks</a>
	</nav>
{/if}
