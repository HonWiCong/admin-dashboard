<script lang="ts">
	import QrCode from "svelte-qrcode"
	import Card from '$lib/widgets/Card.svelte';

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

	import LightControl from '$lib/settings/LightControl.svelte';

	let openUser: boolean = false;
	let openDelete: boolean = false;

	let current_user: any = {};
	const path: string = '/crud/users';
	const description: string = 'CRUD users examaple - Flowbite Svelte Admin Dashboard';
	const title: string = 'Flowbite Svelte Admin Dashboard - CRUD Users';
	const subtitle: string = 'CRUD Users';
</script>

<main class="relative min-h-screen h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
	<div class="p-4">
		<Breadcrumb class="mb-5">
			<BreadcrumbItem home>Home</BreadcrumbItem>
			<BreadcrumbItem href="/crud/setting">QR</BreadcrumbItem>
		</Breadcrumb>
		<Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
			QR Code
		</Heading>
	</div>

	<div class="flex gap-3">
		<Card title="Private" size="xs">
			<QrCode value={window.location.origin + "/slot/private"} />
		</Card>
		<Card title="Public" size="xs">
			<QrCode value={window.location.origin + "/slot/public"} />
		</Card>
	</div>
</main>

<style>
	.grid-layout {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
		grid-gap: 1rem;
	}
</style>