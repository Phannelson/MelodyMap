<script>
    import Navbar from '$lib/components/Navbar.svelte';
</script>
<Navbar />

<div>
    <h1>Sign up</h1>
    <form>
        <label>
            Email
            <input type="text" placeholder="Email"/>
        </label>
        <label>
            Password
            <input type="password" placeholder="Password"/>
        </label>
        <button type="submit">Login</button>
    </form>
</div>