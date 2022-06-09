<template>
  <div id="not-found">
    <div class="container">
      <h3>Não temos resultado dessa competição ainda</h3>
      <br />
      <a href="/">Volte ao início</a>
    </div>
  </div>
</template>

<style>
body {
  background: #1f1b5f;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
}
body * {
  color: white;
  font-family: "Secular One", sans-serif;
}
#not-found {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 400px;
  width: 400px;
}

#not-found .container h2,
#not-found .container h1 {
  margin-top: 0;
  margin-bottom: 0;
}

#not-found .container a {
  text-decoration: none;
  font-size: 13.333px;
  width: 100%;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  border: none;
  background: #d32123;
  color: white;
  margin-top: 1rem;
  cursor: pointer;
}
</style>
