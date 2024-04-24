<script lang="ts">
	import { Avatar, Card, Heading, Popover, TabItem, Tabs } from 'flowbite-svelte';
	import Change from '$lib/dashboard/Change.svelte';
	import Customers from '../../routes/data/users.json';
	import { avatarPath, imagesPath } from '$lib/variables';
	import LastRange from '$lib/widgets/LastRange.svelte';
	import More from '$lib/widgets/More.svelte';
	import { QuestionCircleSolid } from 'flowbite-svelte-icons';
	
	type CustomerData = {
		carplate: string;
		total_duration: string;
	}
	export let customersData: CustomerData[] = [];

	const products = [
		{
			src: 'iphone.png',
			image: 'iphone',
			label: 'iPhone 14 Pro',
			change: 2.5,
			price: '$445,467'
		},
		{
			src: 'imac.png',
			image: 'imac',
			label: 'Apple iMac 27',
			change: 12.5,
			price: '$256,982'
		},
		{
			src: 'watch.png',
			image: 'watch',
			label: 'Apple Watch SE',
			change: -1.35,
			price: '$201,869'
		},
		{
			src: 'ipad.png',
			image: 'ipad',
			label: 'Apple iPad Air',
			change: 12.5,
			price: '$103,967'
		},
		{
			src: 'imac.png',
			image: 'imac',
			label: 'Apple iMac 24',
			change: -2,
			price: '$98,543 '
		}
	];

</script>

<Card size="xl">
	<div class="mb-4 flex items-center gap-2">
		<Heading tag="h3" class="w-fit text-lg font-semibold dark:text-white">
			Statistics this month
		</Heading>
		<button>
			<span class="sr-only">Show information</span>
			<QuestionCircleSolid size="sm" class="text-gray-400 hover:text-gray-500" />
		</button>
		<Popover placement="bottom-start">
			<div class="w-72 space-y-2 text-sm font-normal text-gray-500 dark:text-gray-400">
				<h3 class="font-semibold text-gray-900 dark:text-white">Statistics</h3>
				<p>
					Statistics is a branch of applied mathematics that involves the collection, description,
					analysis, and inference of conclusions from quantitative data.
				</p>
				<More title="Read more" href="#top" flat />
			</div>
		</Popover>
	</div>
	<Tabs
		style="full"
		defaultClass="flex divide-x rtl:divide-x-reverse divide-gray-200 shadow dark:divide-gray-700"
		contentClass="p-3 mt-4"
	>
		<TabItem class="w-full" open>
			<span slot="title">Top Customers</span>
			<ul class="-m-3 divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
				{#each customersData as { carplate, total_duration }}
					<li class="py-3 sm:py-4">
						<div class="flex items-center justify-between">
							<div class="flex min-w-0 items-center">
								<div class="ml-3">
									<p class="truncate font-medium text-gray-900 dark:text-white">
										{carplate}
									</p>
								</div>
							</div>
							<div
								class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
							>
								{total_duration} minutes
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</TabItem>
	</Tabs>

	<div
		class="mt-4 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6"
	>
		<More title="Full Report" href="/crud/records" />
	</div>
</Card>
