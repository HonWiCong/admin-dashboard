<script lang="ts">
	import type { PageData } from './$types';
	import { Card } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	export let data: PageData;

	async function fetchData() {
		const res = await fetch('/api/public/slot');
		const data = await res.json();
		console.log(data);
		return data;
	}

	// fetch data every 3 seconds
	onMount(() => {
		const interval = setInterval(async () => {
			data = await fetchData();
		}, 3000);

		return () => clearInterval(interval);
	});
</script>

<div class="p-4">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
		<Card horizontal class="items-center justify-between" size="xl" color="blue">
			<div class="w-full">
				<p>All</p>
				<p class="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
					{data.rows.length}
				</p>
			</div>
		</Card>
		<Card horizontal class="items-center justify-between" size="xl" color="green">
			<div class="w-full">
				<p>Available</p>
				<p class="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
					{data.rows.filter(slot => slot.status).length}
				</p>
			</div>
		</Card>
		<Card horizontal class="items-center justify-between" size="xl" color="purple">
			<div class="w-full">
				<p>Percentage</p>
				<p class="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
					{((data.rows.filter(slot => slot.status).length / data.rows.length) * 100).toFixed(2)}%
				</p>
			</div>
		</Card>
	</div>
</div>

<div class="p-4 grid grid-cols-5 gap-3">
	{#each data.rows.slice(0, 5) as slot}
		<Card class="h-[200px]" color={slot.status ? "green" : "red"}>
			<div class="grid place-items-center h-full">
				<p>Slot {slot.id}</p>
			</div>
		</Card>
	{/each}
</div>
<div class="road">
	<div class="top-road-line"></div>
	<div class="road-direction">
		<div class="rectangle"></div>
		<div class="right-triangle"></div>
	</div>
	<div class="bottom-road-line"></div>
</div>
<div class="p-4 grid grid-cols-5 gap-3">
	{#each data.rows.slice(6, 11) as slot}
		<Card class="h-[200px]" color={slot.status ? "green" : "red"}>
			<div class="grid place-items-center h-full">
				<p>Slot {slot.id}</p>
			</div>
		</Card>
	{/each}
</div>

<style>
	.road {
		height: 220px;
		background-color: #212121;
		position: relative;
		width: 100%;
	}
	.top-road-line {
		position: absolute;
		top: 16px;
		width: 100%;
		height: 10px;
		background-color:#fff;
	}
	.bottom-road-line {
		position: absolute;
		bottom: 16px;
		width: 100%;
		height: 10px;
		background-color:#fff;
	}
	.road-direction {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
	}
	.rectangle {
		width: 100px;
		height: 20px;
		background-color: #fbff00;
	}
	.right-triangle {
		width: 0;
		height: 0;
		border-top: 24px solid transparent;
		border-bottom: 24px solid transparent;
		border-left: 44px solid #fbff00;
	}
</style>