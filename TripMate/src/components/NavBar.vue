<template>
    <nav class="navbar">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">TripMate</a>
      </div>
      <div class="navbar-menu">
        <a class="navbar-item" href="/">Home</a>
        <a class="navbar-item" href="/destinations">Destinations</a>
        <a class="navbar-item" href="/plans">Plans</a>
        <a class="navbar-item" href="/about">About</a>
        <a class="navbar-item" href="/contact">Contact</a>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: #3f51b5;
    color: white;
  }
  
  .navbar-brand .navbar-item {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    text-decoration: none;
  }
  
  .navbar-menu {
    display: flex;
    gap: 1rem;
  }
  
  .navbar-item {
    color: white;
    text-decoration: none;
    font-size: 1rem;
  }
  
  .navbar-item:hover {
    text-decoration: underline;
  }
  </style>
  