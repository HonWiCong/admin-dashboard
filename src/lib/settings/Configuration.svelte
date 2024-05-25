<script lang="ts">
	import { toast } from 'svelte-french-toast';
	import { Button, Input } from 'flowbite-svelte';
	import Card from '../widgets/Card.svelte';

	type Setting = {
		id: number;
		name: string;
		value: number;
	}

	export let list: Setting[];
	let isDataChanged: boolean = false;
	let loading: boolean = false;

	const items = list.map((item: Setting) => {
		let name = item.name.replace(/_/g, ' ');
		name = name.charAt(0).toUpperCase() + name.slice(1);

		return {
			id: item.id,
			title: name,
			subtitle: "",
			value: item.value,
		}
	});

	async function update() {
		loading = true;
		// assign the new values to the original list
		list.forEach((item: Setting) => {
			item.value = Number(items.find((i: Setting) => i.id === item.id)?.value);
		});
		console.log(list);
	
		const responsePromise = fetch('/api/setting', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(list),
		}).then(response => {
			if (!response.ok) {
				throw new Error('Settings update failed');
			}
			loading = false;
			return response.json();
		});
	
		toast.promise(responsePromise, {
			loading: 'Updating settings...',
			success: 'Settings updated',
			error: 'Settings update failed',
		});
	}

	$: isDataChanged = list.some((item: Setting) => item.value !== items.find((i: Setting) => i.id === item.id)?.value);
</script>

<form on:submit|preventDefault={update} method="post">
	<Card title="Configuration" size="md">
		<p class="text-sm font-normal text-gray-500 dark:text-gray-400">You can adjust the parking system configuration and preferences here</p>
	
		<ul class="divide-y divide-gray-200 dark:divide-gray-700">
			{#each items as item}
				<li class="py-4">
					<div class="flex items-center justify-between">
						<div class="flex flex-grow flex-col">
							<div class="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</div>
							<div class="text-base font-normal text-gray-500 dark:text-gray-400">
								{item.subtitle}
							</div>
						</div>
						<div class="flex items-center">
							<Input type="number" bind:value={item.value} class="w-20" />
						</div>
					</div>
				</li>
			{/each}
		</ul>
		<Button type="submit" class="mt-2 w-fit" disabled={!isDataChanged || loading}>
			{#if loading}
				Loading...
			{:else}
				Save / Update
			{/if}
		</Button>
	</Card>
</form>

