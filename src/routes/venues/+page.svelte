<script>
    import Navbar from '$lib/components/Navbar.svelte';
</script>
<Navbar />
<div class="container">
    <h1>Venues Page</h1>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }
    .container {
        position:relative;
        height: 100vh; /* This makes the container take up the full viewport height */
    }
    h1 {
        position: absolute;
        top: 10%; /* Adjust this value to move the heading up */
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%; /* Ensures text alignment is centered */
    }
</style>