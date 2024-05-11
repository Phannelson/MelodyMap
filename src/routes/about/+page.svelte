<script>
    import Navbar from '$lib/components/Navbar.svelte';
</script>

<Navbar />

<div class="container">
    <h1>About Us</h1>
    <p class="description">
        This site aims to help you find venues near you that have upcoming concerts.
        We want to make it easier for those who want to find a concert near them without
        the hassle of going through each venue's website to see if anyone is playing there.
        Why go through each venue when you can see the concerts right on your screen?
    </p>
</div>

<div class="authors">
    <div class="author">
        <img src="blob.jpg" alt="Nelson Phan">
        <h3>Nelson Phan</h3>
    </div>
    <div class="author">
        <img src="seal.jpg" alt="Vivian Cao">
        <h3>Vivian Cao</h3>
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap');

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 90vh;
        text-align: center;
    }

    h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #333; /* Adjust color as needed */
    }

    .description {
        font-size: 1.2rem;
        line-height: 1.5;
        max-width: 800px;
        color: #666; /* Adjust color as needed */
    }

    .authors {
        display: flex;
        justify-content: center;
    }

    .author {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 1rem;
    }

    .author img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
    }

    .author h3 {
        font-size: 1.2rem;
        color: #333; /* Adjust color as needed */
    }

    @keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

    .description{
        animation: fadeIn 1s ease-in-out forwards;
        opacity: 0; /* Start with opacity 0 */    
    }

</style>

