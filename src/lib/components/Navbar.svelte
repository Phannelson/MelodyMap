<!-- Navbar.svelte -->

<script>
  </script>
<!-- <li><a href="/">Home</a></li>
<li><a href="/about">About</a></li>
-->

<nav>
    <div class="wrapper">
      <div class="logo"><enhanced:img id = "logoImg" src= "/static/melody map logo.png" alt="Logo"></div>
      <input type="radio" name="slider" id="menu-btn">
      <input type="radio" name="slider" id="close-btn">
      <ul class="nav-links">
        <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
        <li><a href="/">Home</a></li>
        <li>
          <a href="/about" class="desktop-item">About</a>
        </li>
        <li>
          <a href="/account" class="desktop-item">Account</a>
        </li>
        <li><a href="/Login">Sign In/Register</a></li>
      </ul>
      <label for="menu-btn" class="btn menu-btn"><i class="fas fa-bars"></i></label>
    </div>
  </nav>
  
  <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Ubuntu Sans', sans-serif;
    font-size: 20px;
    font-weight: 400;
  }

  @keyframes fadeLogo {
    from {
        opacity: 1;
    }
    to {
        opacity: 0.5;
    }
}

  #logoImg {
    width: 210px; /* Adjust the width as needed */
    height: auto; /* Maintain aspect ratio */
    margin-top: 38px;
    margin-left: 10px;
    animation: fadeLogo 3s infinite alternate;
  }

  #logoImg:hover {
    cursor: pointer;
  }

  #logoImg:active {
    transform: scale(0.95);
  }


  nav{
    /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
    z-index: 99; /* Stay on top */
    width: 100%;
    height: 78px;

    background: #61b0ff;
  }
  nav .wrapper{
    position: relative;
    max-width: 1300px;
    padding: 0px 30px;
    height: 70px;
    line-height: 70px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .wrapper .logo a{
    color: #f2f2f2;
    font-size: 30px;
    font-weight: 600;
    text-decoration: none;
  }
  .wrapper .nav-links{
    display: inline-flex;
  }
  .nav-links li{
    list-style: none;
    margin-top: 10px;
  }
  .nav-links li a{
    color: #f7f7f7;
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    padding: 9px 15px;
    border-radius: 5px;
    transition: all 0.3s ease;
  }
  .nav-links li a:hover{
    background: #3A3B3C;
  }

  .row .mega-links li a{
    padding: 0px;
    padding: 0 20px;
    color: #d9d9d9;
    font-size: 17px;
    display: block;
  }
  .row .mega-links li a:hover{
    color: #f2f2f2;
  }
  .wrapper .btn{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    display: none;
  }
  .wrapper .btn.close-btn{
    position: absolute;
    right: 30px;
    top: 10px;
  }
  nav input{
    display: none;
  }


  </style>