<script lang="ts">
	export let data;
	console.log(data);
</script>

<h1>Hello</h1>
<h1>{data.message}</h1>
{#each data.body as item}
	<li>{item.name} : {item.value}</li>
{/each}