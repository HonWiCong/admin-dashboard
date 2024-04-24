<script>
	import modeobserver from '$lib/modeobserver';
	import { onMount } from 'svelte';
<<<<<<< HEAD
	import { Toaster } from 'svelte-french-toast';

	onMount(modeobserver);
</script>

<Toaster position="top-right" />
=======
	import Runatics from './utils/Runatics.svelte';
  export let data;
  const analyticsId = data.ANALYTICS_ID

	onMount(modeobserver);
</script>
<Runatics {analyticsId} />
>>>>>>> d7ab5888871177f2fcd6217a7385f520ee27534e
<slot />
