<!-- Navbar.svelte -->

<script>
  </script>
<!-- <li><a href="/">Home</a></li>
<li><a href="/about">About</a></li>
-->

<nav>
    <div class="wrapper">
      <div class="logo"><enhanced:img id = "logoImg" src= "/static/whitelogo.png" alt="Logo"></div>
      <input type="radio" name="slider" id="menu-btn">
      <input type="radio" name="slider" id="close-btn">
      <ul class="nav-links">
        <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
        <li><a href="/">Home</a></li>
        <li><a href="/venues">Venues</a></li>
        <li>
          <a href="/concerts" class="desktop-item">Concerts</a>
          <input type="checkbox" id="showDrop">
          <label for="showDrop" class="mobile-item">Concerts</label>
          <ul class="drop-menu">
            <li><a href="/">Drop menu 1</a></li>
            <li><a href="/">Drop menu 2</a></li>
            <li><a href="/">Drop menu 3</a></li>
            <li><a href="/">Drop menu 4</a></li>
          </ul>
        </li>
        <li>
          <a href="/about" class="desktop-item">About</a>
          <input type="checkbox" id="showDrop2">
          <label for="showDrop2" class="mobile-item">Venues</label>
          <div class="drop-menu2">
            <div class="content">
              <div class="row">
                <img id = concertimg src="/concertvenue.jpg" alt="Concert Venue Img">
              </div>
              <div class="row">
                <header>Title</header>
                <ul class="mega-links">
                  <li><a href="/">Drop menu 1</a></li>
                  <li><a href="/">Drop menu 2</a></li>
                  <li><a href="/">Drop menu 3</a></li>
                  <li><a href="/">Drop menu 4</a></li>
                </ul>
              </div>
              <div class="row">
                <header>Title 2</header>
                <ul class="mega-links">
                  <li><a href="/">Drop menu 1</a></li>
                  <li><a href="/">Drop menu 2</a></li>
                  <li><a href="/">Drop menu 3</a></li>
                  <li><a href="/">Drop menu 4</a></li>
                </ul>
              </div>

            </div>
          </div>
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
    font-family: 'Poppins', sans-serif;
  }

  #logoImg {
    width: 120px; /* Adjust the width as needed */
    height: auto; /* Maintain aspect ratio */
    margin-top: 38px;
    margin-left: 30px;
  }

  nav{
    position: fixed; /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
    z-index: 99;
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
  .nav-links .mobile-item{
    display: none;
  }
  .nav-links .drop-menu{
    position: absolute;
    background: #242526;
    width: 180px;
    line-height: 45px;
    top: 85px;
    opacity: 0;
    visibility: hidden;
    box-shadow: 0 6px 10px rgba(0,0,0,0.15);
  }
  .nav-links li:hover .drop-menu,
  .nav-links li:hover .drop-menu2{
    transition: all 0.3s ease;
    top: 70px;
    opacity: 1;
    visibility: visible;
  }
  .drop-menu li a{
    width: 100%;
    display: block;
    padding: 0 0 0 15px;
    font-weight: 400;
    border-radius: 0px;
  }
  .drop-menu2{
    position: absolute;
    left: 0;
    width: 100%;
    padding: 0 30px;
    top: 85px;
    opacity: 0;
    visibility: hidden;
  }
  .drop-menu2 .content{
    background: #242526;
    padding: 25px 20px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    box-shadow: 0 6px 10px rgba(0,0,0,0.15);
  }
  .drop-menu2 .content .row{
    width: calc(25% - 30px);
    line-height: 45px;
  }
  .content .row img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .content .row header{
    color: #f2f2f2;
    font-size: 20px;
    font-weight: 500;
  }
  .content .row .mega-links{
    margin-left: -40px;
    border-left: 1px solid rgba(255,255,255,0.09);
  }
  .row .mega-links li{
    padding: 0 20px;
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

  @media screen and (max-width: 970px) {
    .wrapper .btn{
      display: block;
    }
    .wrapper .nav-links{
      position: fixed;
      height: 100vh;
      width: 100%;
      max-width: 350px;
      top: 0;
      left: -100%;
      background: #242526;
      display: block;
      padding: 50px 10px;
      line-height: 50px;
      overflow-y: auto;
      box-shadow: 0px 15px 15px rgba(0,0,0,0.18);
      transition: all 0.3s ease;
    }
    /* custom scroll bar */
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: #242526;
    }
    ::-webkit-scrollbar-thumb {
      background: #3A3B3C;
    }
    #menu-btn:checked ~ .nav-links{
      left: 0%;
    }
    #menu-btn:checked ~ .btn.menu-btn{
      display: none;
    }
    #close-btn:checked ~ .btn.menu-btn{
      display: block;
    }
    .nav-links li{
      margin: 15px 10px;
    }
    .nav-links li a{
      padding: 0 20px;
      display: block;
      font-size: 20px;
    }
    .nav-links .drop-menu{
      position: static;
      opacity: 1;
      top: 65px;
      visibility: visible;
      padding-left: 20px;
      width: 100%;
      max-height: 0px;
      overflow: hidden;
      box-shadow: none;
      transition: all 0.3s ease;
    }
    #showDrop:checked ~ .drop-menu,
    #showDrop2:checked ~ .drop-menu2{
      max-height: 100%;
    }
    .nav-links .desktop-item{
      display: none;
    }
    .nav-links .mobile-item{
      display: block;
      color: #f2f2f2;
      font-size: 20px;
      font-weight: 500;
      padding-left: 20px;
      cursor: pointer;
      border-radius: 5px;
      transition: all 0.3s ease;
    }
    .nav-links .mobile-item:hover{
      background: #3A3B3C;
    }
    .drop-menu li{
      margin: 0;
    }
    .drop-menu li a{
      border-radius: 5px;
      font-size: 18px;
    }
    .drop-menu2{
      position: static;
      top: 65px;
      opacity: 1;
      visibility: visible;
      padding: 0 20px;
      max-height: 0px;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    .drop-menu2 .content{
      box-shadow: none;
      flex-direction: column;
      padding: 20px 20px 0 20px;
    }
    .drop-menu2 .content .row{
      width: 100%;
      margin-bottom: 15px;
      border-top: 1px solid rgba(255,255,255,0.08);
    }
    /* .drop-menu2.content .row:nth-child(1), */
    .drop-menu2 .content .row:nth-child(2){
      border-top: 0px;
    }
    .content .row .mega-links{
      border-left: 0px;
      padding-left: 15px;
    }
    .row .mega-links li{
      margin: 0;
    }
    .content .row header{
      font-size: 19px;
    }
  }
  nav input{
    display: none;
  }

  #concertimg {
    width: 150%; /* Adjust the width as needed */
    height: auto; /* Maintain aspect ratio */
  }

  </style>