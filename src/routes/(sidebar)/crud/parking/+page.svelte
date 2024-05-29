<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Button, Checkbox, Drawer, Heading } from 'flowbite-svelte';
	import { Input, Table, TableBody, TableBodyCell, TableBodyRow, TableHead } from 'flowbite-svelte';
	import { TableHeadCell } from 'flowbite-svelte';
	import Products from '../../../data/product.json';
	import MetaTag from '../../../utils/MetaTag.svelte';
	import type { PageData } from './$types';

	const path: string = '/crud/products';
	const description: string = 'CRUD products examaple - Flowbite Svelte Admin Dashboard';
	const title: string = 'Flowbite Svelte Admin Dashboard - CRUD Products';
	const subtitle: string = 'CRUD Products';

	export let data: PageData;

	function formatDate(dateString?: string): string {
		if (!dateString) {
			return 'The user has not yet exited';
		}

		const options = { month: 'short', day: '2-digit', year: 'numeric', hour: 'numeric', minute: '2-digit' };
		const date = new Date(dateString);
		return date.toLocaleString('en-US', options).replace(/,/g, '') + ' ' + (date.getHours() >= 12 ? 'p.m.' : 'a.m.');
	}
</script>

<MetaTag {path} {description} {title} {subtitle} />


<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
	<div class="p-4">
		<Breadcrumb class="mb-5">
			<BreadcrumbItem home>Home</BreadcrumbItem>
			<BreadcrumbItem href="/crud/records">Parking</BreadcrumbItem>
		</Breadcrumb>
		<Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
			All Parking Records
		</Heading>
	</div>
	<Table divClass="px-4">
		<TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
			{#each ['ID', 'Slot ID', 'Start Time', 'End Time', 'Status'] as title}
				<TableHeadCell class="ps-4 font-normal">{title}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#each data.parkings as parking}
				<TableBodyRow class="text-base">
					<TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4">
						<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
							<div class="text-base font-semibold text-gray-900 dark:text-white">
								{parking.id}
							</div>
						</div>
					</TableBodyCell>
					<TableBodyCell class="p-4">{parking.slot_id}</TableBodyCell>
					<TableBodyCell class="p-4">{formatDate(parking?.start_time)}</TableBodyCell>
					<TableBodyCell class="p-4">{formatDate(parking?.end_time)}</TableBodyCell>
					<TableBodyCell class="p-4">{parking.status}</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</main>