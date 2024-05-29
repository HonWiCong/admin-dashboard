<script lang="ts">
	import type { PageData } from '../../routes/(sidebar)/$types';
	import { Card, Chart } from 'flowbite-svelte';
	import options from '$lib/graphs/traffic';
	import SmallPanel from './SmallPanel.svelte';
	import { CheckOutline ,CloseOutline } from 'flowbite-svelte-icons';
	import More from '$lib/widgets/More.svelte';

	export let dark: boolean = false;

	let carParkData;
	let modifiedOptions = options(dark)
	let max: number;
	let current: number;

	async function fetchData() {
		const response = await fetch('/api/carpark');
		const data = await response.json();
		console.log(data);
		carParkData = data.body;
		max = carParkData[0].value;
		current = carParkData[1].value;

		modifiedOptions.series = [max - current, current]
		modifiedOptions.tooltip.y.formatter = function (val) {
			return ((val / (max)) * 100).toFixed(2) + '%';
		}
		return modifiedOptions;
	}
	
</script>

{#await fetchData()}
	<p>Loading...</p>
{:then data}
	<Card size="xl" class="h-fit">
		<div
			class="mb-4 items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700 sm:flex"
		>
			<div class="mb-4 w-full sm:mb-0">
				<span class="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl"
					>Public Carpark capacity</span
				>
			</div>
			<div>
				Total {max} Carpark
			</div>
		</div>
		<Chart options={data}></Chart>
		<div class="mb-4 flex items-center justify-between pt-4 sm:pt-6 lg:justify-evenly">
			<SmallPanel title="Available" subtitle={data.series[0].toString()}>
				<CheckOutline slot="icon" size="xl" class="mb-1" />
			</SmallPanel>
			<SmallPanel title="Taken" subtitle={data.series[1].toString()}>
				<CloseOutline slot="icon" size="xl" class="mb-1" />
			</SmallPanel>
		</div>
	</Card>
{/await}
