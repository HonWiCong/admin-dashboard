<script lang="ts">
	import modeobserver from '$lib/modeobserver';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-french-toast';
	import { auth } from '$lib/firebase.client';
	import { goto } from '$app/navigation';

	import type { LayoutData } from './$types';
	export let data: LayoutData;

	onMount(async () => {
		const user: any = await data.getAuthUser();

		if (!user) {
			goto('/login');
		}
	});

	onMount(modeobserver);
</script>

<Toaster position="top-right" />
<slot />
