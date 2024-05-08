<script>
    async function fetch_user_with_id() {
        const res = await fetch(`/api/users/${5}`);
        const data = await res.json();
        return data;
    }
</script>

{#await fetch_user_with_id()}
    <p>Loading...</p>
{:then user}
    <h1>{user.body.id}</h1>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}