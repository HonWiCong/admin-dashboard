<script lang="ts">
	import modeobserver from '$lib/modeobserver';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-french-toast';

	onMount(modeobserver);
</script>

<Toaster position="top-right" />
<slot />
