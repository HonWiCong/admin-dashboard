<script lang="ts">
	import dayjs from 'dayjs';
	import LocalizedFormat from 'dayjs/plugin/localizedFormat';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { option } from '../../routes/(sidebar)/dashboard/store'

	dayjs.extend(LocalizedFormat);

	type TimeSlot = keyof typeof timeslots;

	export let timeslot: TimeSlot = 'Today';
	export let timeslots = {
		Today: -1,
		'This week': 7,
		'This month': 30,
		'This year': 365,
		'All time': 0
	};

	let timeslots_keys: TimeSlot[] = Object.keys(timeslots) as TimeSlot[];
</script>

<div class="font-normal">
	<button
		class="mt-0.5 inline-flex gap-1 rounded-lg p-2 text-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
		>{timeslot} <ChevronDownOutline size="lg" /></button
	>
	<Dropdown class="min-w-48">
		{#each timeslots_keys as slot}
			<DropdownItem class="font-normal" on:click={() => {
				timeslot = slot
				option.set(slot)
				console.log($option)
			}}>
				{slot}
			</DropdownItem>
		{/each}
	</Dropdown>
</div>
