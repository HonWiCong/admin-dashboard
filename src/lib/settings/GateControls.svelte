<script lang="ts">
	import { Toggle } from 'flowbite-svelte';
	import { Button } from 'flowbite-svelte';
	import Card from '../widgets/Card.svelte';
	import { toast } from 'svelte-french-toast';

	type Setting = {
		id: number;
		name: string;
		value: number;
	}

	let loading: boolean = false;
	export let list: Setting[];
	
	const alwaysOpenGate = list.find((item) => item.name === 'public_always_open_gate');
	const alwaysCloseGate = list.find((item) => item.name === 'public_always_close_gate');
	let automation: boolean = localStorage.getItem("gate_automation") === 'true' ?? true;
	const gateList = list.filter((item) => item.name === 'public_always_open_gate' || item.name === 'public_always_close_gate');
	
	const items = gateList.map((item: Setting) => {
		let subtitle = "";
		if (item.name === 'public_always_open_gate') {
			subtitle = "The gate will always be open";
		} else if(item.name === 'public_always_close_gate') {
			subtitle = "The gate will always be closed";
		}

		let name = item.name.replace(/_/g, ' ');
		name = name.charAt(0).toUpperCase() + name.slice(1);

		return {
			id: item.id,
			title: name,
			subtitle: subtitle,
			value: item.value,
		}
	});

	async function update() {
		loading = true;
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

	function handleToggle(id: number) {
		if (id === alwaysOpenGate?.id) {
			items[1].value = 0;
			for (let i = 0; i < list.length; i++) {
				if (list[i].id === alwaysCloseGate?.id) {
					list[i].value = 0;
				}
			}
		} else if (id === alwaysCloseGate?.id) {
			items[0].value = 0;
			for (let i = 0; i < list.length; i++) {
				if (list[i].id === alwaysOpenGate?.id) {
					list[i].value = 0;
				}
			}
		}
	}

	function handleAutomation() {
		automation = !automation;
		localStorage.setItem("gate_automation", automation.toString());
		if (automation) {
			items[0].value = 0;
			items[1].value = 0;
			list[0].value = 0;
			list[1].value = 0;
		}
	}

</script>

<form on:submit|preventDefault={update} method="post">
	<Card title="Gate Controls" size="md">
		<p class="text-sm font-normal text-gray-500 dark:text-gray-400">You can control the parking system preferences here</p>
	
		<ul class="divide-y divide-gray-200 dark:divide-gray-700">
			<li class="py-4">
				<div class="flex items-center justify-between">
					<div class="flex flex-grow flex-col">
						<div class="text-lg font-semibold text-gray-900 dark:text-white">Automation</div>
						<div class="text-base font-normal text-gray-500 dark:text-gray-400">
							Enable automation or manual control
						</div>
					</div>
					<Toggle checked={automation}
						on:click={() => {
							handleAutomation();
						}}
						classDiv="peer-focus:ring-0 me-0"
					/>
				</div>
			</li>
			{#each items as item}
				<li class="py-4">
					<div class="flex items-center justify-between">
						<div class="flex flex-grow flex-col">
							<div class="text-lg font-semibold text-gray-900 dark:text-white {automation ? "opacity-50" : "opacity-100"}">{item.title}</div>
							<div class="text-base font-normal text-gray-500 dark:text-gray-400 {automation ? "opacity-50" : "opacity-100"}">
								{item.subtitle}
							</div>
						</div>
						<Toggle disabled={automation} checked={item.value === 1 ? true : false}
							on:click={() => {
								for (let i = 0; i < list.length; i++) {
									if (list[i].id === item.id) {
										list[i].value = list[i].value === 1 ? 0 : 1;
										handleToggle(item.id);
									}
								}
							}}
							classDiv="peer-focus:ring-0 me-0"
						/>
					</div>
				</li>
			{/each}
		</ul>
		<Button disabled={loading} type="submit" class="mt-2 w-fit">
			{#if !loading}
				<span>Save / Update</span>
			{:else}
				<span>Saving...</span>
			{/if}
		</Button>
	</Card>
</form>

