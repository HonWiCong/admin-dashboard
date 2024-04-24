<script lang="ts">
	async function fetchControls() {
		const response = await fetch('/api/setting')
		return response.json()
	}

	async function fetchConfiguration() {
		const response = await fetch('/api/carpark')
		return response.json()
	}

	import GateControls from '$lib/settings/GateControls.svelte';
	import Configuration from '$lib/settings/Configuration.svelte';
	import {
		Breadcrumb,
		BreadcrumbItem,
		Heading,
	} from 'flowbite-svelte';

	import User from './User.svelte';
	import Delete from './Delete.svelte';
	import MetaTag from '../../../utils/MetaTag.svelte';
	import LightControl from '$lib/settings/LightControl.svelte';

	let openUser: boolean = false;
	let openDelete: boolean = false;

	let current_user: any = {};
	const path: string = '/crud/users';
	const description: string = 'CRUD users examaple - Flowbite Svelte Admin Dashboard';
	const title: string = 'Flowbite Svelte Admin Dashboard - CRUD Users';
	const subtitle: string = 'CRUD Users';
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="relative min-h-screen h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
	<div class="p-4">
		<Breadcrumb class="mb-5">
			<BreadcrumbItem home>Home</BreadcrumbItem>
			<BreadcrumbItem href="/crud/setting">Setting</BreadcrumbItem>
		</Breadcrumb>
		<Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
			Settings and Controls
		</Heading>
	</div>

	<div class="grid-layout">
		<div class="p-4">
			{#await fetchControls()}
				<p>Loading...</p>
			{:then data}
				<GateControls list={data.body} />
			{/await}
		</div>
		<div class="p-4">
			{#await fetchControls()}
				<p>Loading...</p>
			{:then data}
				<LightControl list={data.body} />
			{/await}
		</div>
		<div class="p-4">
			{#await fetchConfiguration()}
				<p>Loading...</p>
			{:then data}
				<Configuration list={data.body} />
			{/await}
		</div>
	</div>


</main>

<!-- Modals -->

<User bind:open={openUser} data={current_user} />
<Delete bind:open={openDelete} />

<style>
	.grid-layout {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
		grid-gap: 1rem;
	}
</style>