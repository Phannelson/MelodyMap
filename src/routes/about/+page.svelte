<script>
    import Navbar from '$lib/components/Navbar.svelte';
</script>
<Navbar />
<div class="container">
    <h1>About Us</h1>
    <h2>This site aims to help you find venues near you that has upcoming concerts.<br>
        We want to make it easier for those who want to find a concert near them without <br>
        the hassle of of going through each website of a venue to see if anyone is playing there. <br>
        Why go through each venue when you can see the concerts in front of your screen.
    </h2>
</div>
<div class="authors">
    <div class="author">
        <img src="blob.jpg" alt="Nelson Phan">
        <h3>Nelson Phan</h3>
    </div>
    <div class="author">
        <img src="blob.jpg" alt="Vivian Cao">
        <h3>Vivian Cao</h3>
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Prompt', sans-serif;
    }
    .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 90vh;
    text-align: center;
    }
    h1 {
        max-width: 80%;
        transform: translateY(10%)
    }

    h2 {
        transform:translateY(60%)
    }

    .authors {
        position: absolute;
        width: 50%;
        top: 70%; /* Adjust this value based on your layout */
        text-align: center;
        transform: translate(47%, -50%);
    }
    .author {
        display: inline-block;
        margin: 70px;
    }
    .author img {
        width: 150px; /* Adjust size as needed */
        height: 150px;
        border-radius: 40%; /* Makes the image circular */
        object-fit: cover; /* Ensures the image covers the area without distortion */
    }
    .author h3 {
        margin-top: 20px;
    }

</style>
