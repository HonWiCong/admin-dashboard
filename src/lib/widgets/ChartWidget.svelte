<script lang="ts">
	import Change from '$lib/dashboard/Change.svelte';
	import type { ApexOptions } from 'apexcharts';
	import { Card, Chart, Heading } from 'flowbite-svelte';
	import LastRange from './LastRange.svelte';

	export let title: string = '';
	export let subtitle: string = '';
	export let chartOptions: ApexOptions;
</script>

<Card size="xl" class="w-full max-w-none 2xl:col-span-2">
	<div class="mb-4 flex items-center justify-between">
		<div class="flex-shrink-0">
			<div class="flex">
				<Heading tag="h3" class="text-2xl">{title}</Heading>
				<Change value={5.8} since="" class="justify-end font-medium" />
			</div>
			<p class="text-base font-light text-gray-500 dark:text-gray-400">{subtitle}</p>
		</div>
		<LastRange />
	</div>

	<Chart options={chartOptions}></Chart>
</Card>

<!--
@component
[Go to docs](https://flowbite-svelte-admin-dashboard.vercel.app/)
## Props
@prop export let title: string = '';
@prop export let subtitle: string = '';
@prop export let chartOptions: ApexOptions;
-->
