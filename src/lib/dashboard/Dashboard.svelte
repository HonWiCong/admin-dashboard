<script lang="ts">
	import thickbars from '$lib/graphs/thickbars';
	import thinfillbars from '$lib/graphs/thinfillbars';
	import ChartWidget from '$lib/widgets/ChartWidget.svelte';
	import { Card, Chart, P } from 'flowbite-svelte';
	import type { PageData } from '../../routes/(sidebar)/$types';
	import Stats from './Stats.svelte';
	import { option } from '../../routes/(sidebar)/dashboard/store';

	import { onMount } from 'svelte';
	import Change from './Change.svelte';
	import DesktopPc from './DesktopPc.svelte';
	import Traffic from './Traffic.svelte';
	import Transactions from './Transactions.svelte';
	import chart_options_func from '../../routes/(sidebar)/dashboard/chart_options';

	export let data: PageData;

	let chartOptions = chart_options_func(false);

	async function fetch_today() {
		const res = await fetch('/api/graph');
		const data = await res.json();
		return data;
	}

	async function fetchCommonData() {
		const res = await fetch('/api/common');
		const data = await res.json();
		return data;
	}

	const timeRanges = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'];
	let counts: number[] = Array(timeRanges.length).fill(0);

	function countRecordsByTimeRange(data: any[]) {
		data.forEach(entry => {
			const enterTime = new Date(entry.enter_at).getHours() * 60 + new Date(entry.enter_at).getMinutes();
			
			for (let i = 1; i < timeRanges.length; i++) {
				const rangeStart = timeRanges[i - 1];
				const rangeEnd = timeRanges[i];
				
				const rangeStartTime = parseInt(rangeStart.split(':')[0]) * 60 + parseInt(rangeStart.split(':')[1]);
				const rangeEndTime = parseInt(rangeEnd.split(':')[0]) * 60 + parseInt(rangeEnd.split(':')[1]);
				
				if (enterTime >= rangeStartTime && enterTime < rangeEndTime) {
				counts[i - 1]++;
				break;
				}
			}
		});
	}

	onMount(() => {
		fetch_today().then(value => {
			if (value.body.length > 0) {
				countRecordsByTimeRange(value.body);
				chartOptions.series = data.today_series as [];
				(chartOptions.series as any)[0].data = counts;
			} else {
				chartOptions.series = data.today_series as [];
			}
		});
	});

	const optionValue = option.subscribe(value => {
		if (value === 'All time') {
			chartOptions.xaxis.categories = ['01 Jan', '02 Feb', '03 Mar', '04 Apr', '05 May', '06 Jun', '07 Jul', '08 Aug', '09 Sep', '10 Oct', '11 Nov', '12 Dec']
			chartOptions.series = data.all_time_series as [];
		} else if (value === 'This year') {
			chartOptions.xaxis.categories = ['01 Jan', '02 Feb', '03 Mar', '04 Apr', '05 May', '06 Jun', '07 Jul', '08 Aug', '09 Sep', '10 Oct', '11 Nov', '12 Dec']
			chartOptions.series = data.year_series as [];
		} else if (value === 'This month') {
			chartOptions.xaxis.categories = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
			chartOptions.series = data.month_series as [];
		} else if (value === 'This week') {
			chartOptions.xaxis.categories = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
			chartOptions.series = data.week_series as [];
		} else if (value === 'Today') {
			chartOptions.xaxis.categories = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00']
			// chartOptions.series = data.today_series() as [];
		}
	});

	let dark = false;

	function handler(ev: Event) {
		if ('detail' in ev) {
			chartOptions = chart_options_func(ev.detail);
			chartOptions.series = data.all_time_series as [];
			dark = !!ev.detail;
		}
	}

	onMount(() => {
		document.addEventListener('dark', handler);
		return () => document.removeEventListener('dark', handler);
	});
</script>

<div class="mt-px space-y-4">
	<!-- <div class="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
		<Card horizontal class="items-center justify-between" size="xl">
			<div class="w-full">
				<p>New products</p>
				<p class="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
					2,340
				</p>
				<Change size="sm" value={12.5} since="Since last month" />
			</div>
			<Chart options={thickbars} class="w-full" />
		</Card>
		<Card horizontal class="items-center justify-between" size="xl">
			<div class="w-full">
				<p>Users</p>
				<p class="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
					4,420
				</p>
				<Change size="sm" value={-3.4} since="Since last month" />
			</div>
			<Chart options={thinfillbars} class="w-full" />
		</Card>
		<Card horizontal class="items-center justify-between" size="xl">
			<div class="w-full">
				<p>Users</p>
				<p class="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
					4,420
				</p>
				<Change size="sm" value={-3.4} since="Since last month" class="w-full" />
			</div>
			<Chart
				options={{
					...thinfillbars,
					plotOptions: {
						...thinfillbars.plotOptions,
						bar: { ...thinfillbars.plotOptions?.bar, horizontal: true }
					}
				}}
			/>
		</Card>
	</div> -->
	<div class="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
		<Traffic {dark} />
		<ChartWidget {chartOptions} title="629" subtitle="Customer this year" />
	</div>
	<div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
		<div class="flex flex-col gap-4">
			<!-- <DesktopPc /> -->
			{#await fetchCommonData()}
				<p>Loading...</p>
			{:then data} 
				<Stats customersData={data.body} />
			{/await}
		</div>
		<!-- <Transactions {dark} /> -->
	</div>
</div>
