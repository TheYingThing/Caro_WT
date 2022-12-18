<template>
  <div class="fixed-top">
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg ps-5" id="caro-nav">
      <a class="navbar-brand navBrandFont" href="#">Caro</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-buttons" aria-controls="navbar-buttons" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id= "navbar-buttons" class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" to="/">Menu</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/game">Game</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/rules">Rules</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style>
.full-page {

}
#caro-nav .navbar-brand {
  font-size: 30px;
  font-family: Tahoma, Arial, sans-serif;
  background: rgba(0,0,0,0);
}

#caro-nav .navbar-collapse,
#caro-nav .nav-item,
#caro-nav .navbar-nav,
#caro-nav .collapse,
#caro-nav .close,
#caro-nav .alert-icon,
#caro-nav .a,
#caro-nav .container-fluid{
  background: rgba(0,0,0,0);
  color: #4e5965;
}

#caro-nav .navbar-toggler-icon{
  background-color: transparent;
}

</style>

