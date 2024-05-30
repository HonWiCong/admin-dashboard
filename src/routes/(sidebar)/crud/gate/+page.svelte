<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Heading } from 'flowbite-svelte';
	import { Tabs, TabItem, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	import MetaTag from '../../../utils/MetaTag.svelte';
	import type { PageData } from './$types';

	const path: string = '/crud/products';
	const description: string = 'CRUD products example - Flowbite Svelte Admin Dashboard';
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
			<BreadcrumbItem href="/crud/records">Records</BreadcrumbItem>
		</Breadcrumb>
		<Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
			All Entry and Exit Records
		</Heading>
	</div>
	
	<Tabs>
		<TabItem label="Public Records">
			<Table divClass="px-4">
				<TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
					{#each ['ID', 'Car Plate', 'Enter', 'Exit', 'Duration (Minutes)'] as title}
						<TableHeadCell class="ps-4 font-normal">{title}</TableHeadCell>
					{/each}
				</TableHead>
				<TableBody>
					{#each data.publicRecords as record}
						<TableBodyRow class="text-base">
							<TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4">
								<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
									<div class="text-base font-semibold text-gray-900 dark:text-white">
										{record.id}
									</div>
								</div>
							</TableBodyCell>
							<TableBodyCell class="p-4">{record.carplate}</TableBodyCell>
							<TableBodyCell class="p-4">{formatDate(record?.enter_at)}</TableBodyCell>
							<TableBodyCell class="p-4">{formatDate(record?.exit_at)}</TableBodyCell>
							<TableBodyCell class="p-4">{record.duration}</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</TabItem>
		<TabItem label="Private Records">
			<Table divClass="px-4">
				<TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
					{#each ['ID', 'User ID', 'Type', 'Access Time',] as title}
						<TableHeadCell class="ps-4 font-normal">{title}</TableHeadCell>
					{/each}
				</TableHead>
				<TableBody>
					{#each data.privateRecords as record}
						<TableBodyRow class="text-base">
							<TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4">
								<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
									<div class="text-base font-semibold text-gray-900 dark:text-white">
										{record.id}
									</div>
								</div>
							</TableBodyCell>
							<TableBodyCell class="p-4">{record.user_id}</TableBodyCell>
							<TableBodyCell class="p-4 capitalize">{record?.event_type}</TableBodyCell>
							<TableBodyCell class="p-4">{formatDate(record?.timestamp)}</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</TabItem>
	</Tabs>
</main>
