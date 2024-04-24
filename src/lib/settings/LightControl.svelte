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

	export let list: Setting[];
	let automation: boolean = localStorage.getItem("light_automation") === 'true' ?? true;
	let check: boolean = false;
	const switchOnLight = list.find((item) => item.name === 'switch_on_light');
	const switchOffLight = list.find((item) => item.name === 'switch_off_light');

	if (switchOnLight?.value === 1 && switchOffLight?.value === 0) {
		check = true;
	} else if (switchOnLight?.value === 0 && switchOffLight?.value === 1) {
		check = false;
	}

	$: console.log(check);

	async function update() {
		if (automation) {
			if (switchOnLight) {
				switchOnLight.value = 0;
			}
			if (switchOffLight) {
				switchOffLight.value = 0;
			}
		} else {
			if (switchOnLight) {
				switchOnLight.value = check ? 1 : 0;
			}
			if (switchOffLight) {
				switchOffLight.value = check ? 0 : 1;
			}
		}

		const response = await fetch('/api/setting', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify([switchOnLight, switchOffLight]),
		});

		if (response.ok) {
			console.log('Settings updated');
			toast.success('Settings updated');
		} else {
			console.error('Settings update failed');
		}
	
	}

	function handleAutomation() {
		automation = !automation;
		console.log(automation);
		localStorage.setItem("light_automation", automation.toString());
		if (automation) {
			check = false;
		}
	}

</script>

<form on:submit|preventDefault={update} method="post">
	<Card title="Light Controls" size="md">
		<p class="text-sm font-normal text-gray-500 dark:text-gray-400">You can control the parking lighting system preferences here</p>
	
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
			<li class="py-4">
				<div class="flex items-center justify-between">
					<div class="flex flex-grow flex-col">
						<div class="text-lg font-semibold text-gray-900 dark:text-white {automation ? "opacity-50" : "opacity-100"}">Turn On / Off light</div>
					</div>
					<Toggle disabled={automation} checked={check}
						on:click={() => {
							check = !check;
						}}
						classDiv="peer-focus:ring-0 me-0"
					/>
				</div>
			</li>
		</ul>
		<Button type="submit" class="mt-2 w-fit">Save / Update</Button>
	</Card>
</form>

