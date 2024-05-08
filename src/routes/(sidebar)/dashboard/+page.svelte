<script lang="ts">
	import Dashboard from '$lib/dashboard/Dashboard.svelte';
	import MetaTag from '../../utils/MetaTag.svelte';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	
	export let data;

	const path: string = '/dashboard';
	const description: string = 'Admin Dashboard example using Flowbite Svelte';
	const title: string = 'Flowbite Svelte Admin Dashboard - Dashboard';
	const subtitle: string = 'Admin Dashboard';
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="p-4">
	<Dashboard {data} />
</main>
