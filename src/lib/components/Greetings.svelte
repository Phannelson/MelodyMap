<script>
    import { onMount, onDestroy } from 'svelte';
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    let showGreetings = true;
    let currentSection = 1;
    let interval;

    onMount(() => {
        interval = setInterval(() => {
            currentSection = currentSection === 2 ? 1 : currentSection + 1;
            document.getElementById(`toggle${currentSection}`).checked = true;
        }, 5000); // Rotate every 5 seconds
    });

    onDestroy(() => {
        clearInterval(interval); // Clear the interval when the component is destroyed
    });

    function handleExplore() {
        showGreetings = false;
        goto('/');
    }
</script>


<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Ubuntu+Sans:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Style+Script&family=Ubuntu+Sans:ital,wght@0,100..800;1,100..800&family=Zeyada&display=swap" rel="stylesheet">

{#if showGreetings}
    <div class="greetings-container" transition:fade="{{ duration: 500, easing: quintOut }}">
        <div class="page-wrapper">
            <div class="content-wrapper">
                <input type="radio" name="toggle" id="toggle1">
                <input type="radio" name="toggle" id="toggle2">
              <input type="radio" name="toggle" id="toggle3">
              <section id="section-1">
                <div class="image-container">
                  <img src="concertphoto2.jpg" alt="concert with man holding arms up">
                </div>
                <div class="info-container">
                  <h1>Welcome to Melody Map</h1>
                </div>
              </section>
              <section id="section-2">
                <div class="image-container">
                    <img src="concertphoto.png" alt="concert">
                </div>
                <div class="info-container">
                  <h1>Find concerts and venues near you</h1>
                </div>
              </section>
            </div>
              </div>
        <button on:click={handleExplore}>Explore</button>
    </div>
{/if}



<style>
    .greetings-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        text-align: center;
        z-index: 999;
    }

    h1 {
        font-size: 50px;
        color: #fafafa;
        padding: 0 1rem;
        animation: fadeIn 1s;
        font-family: 'Zeyada', cursive;
    }

    button {
        padding: 1rem 2rem;
        font-size: 2rem;
        background-color: #61b0ff;
        color: white;
        border: none;
        border-radius: 40px;
        cursor: pointer;
        transition: background-color 0.3s;
        margin-top: 1rem;
        font-family: 'Ubuntu', sans-serif;
        font-weight: 100;
        margin-bottom: 3rem;
    }

    button:hover {
        background-color: #3A3B3C;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
.content-wrapper {
  display: flex;
  width: 80vw;
  min-height: 80vh;
  position: relative;
}

input {
  display: none;
}

#section-1, #section-2 {
  display: flex;
  width: 80vw;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

#section-1 {
  opacity: 1;
  z-index: 5;
  transition: transform 0.5s, opacity 0.5s;
}

#section-2 {
  opacity: 0;
  transition: transform 0.5s, opacity 0.5s;
}

.image-container {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Ensure the entire image fits inside the container */
}

img {
  flex-shrink: 0;
    min-width: 100%;
    min-height: 100%;
}

.info-container {
  width: 50%;
  height: 100%;
  background-color: #61b0ff;
  font-weight: 100;
  font-size: 20px;  
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#section-2 .image-container {
  opacity: 0;
  transform: translateY(2em);
  transition: all 1s 0.7s;
}
#section-2 .info-container {
  opacity: 0;
  transform: translateY(-2em);
  transition: all 1s 0.7s;
}

#toggle2:checked ~ #section-2 {
  opacity: 1;
}

#toggle2:checked ~ #section-1 {
  opacity: 0;
  transform: scale(0.95);
  pointer-events: none;
}

#toggle2:checked ~ #section-2 .image-container,
#toggle2:checked ~ #section-2 .info-container {
  opacity: 1;
  transform: translateY(0);
}

#toggle3:checked ~ #section-1 {
  transition: transform 0.5s 0.5s, opacity 0.5s 0.5s;
}

#toggle3:checked ~ #section-2 .image-container,
#toggle3:checked ~ #section-2 .info-container {
  transition: transform 0.5s, opacity 0.5s;
}

</style>