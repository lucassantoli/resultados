<template>
  <div id="app">
    <img
      class="tropa clickable"
      src="@/assets/Logo Tropa.png"
      alt="Logotipo da Tropa Olímpica MASTER"
      @click="redirectToHome"
    />

    <router-view :key="$route.path" />

    <div class="spacer"></div>

    <footer class="credits">
      <img
        class="master"
        src="@/assets/Logo Master.png"
        alt="Logotipo do Master"
      />
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToHome: function () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
@import "@/global.scss";

* {
  font-family: 'Poppins', sans-serif;
}

html {
  height: 100%;
}

body .wrapper {
  position: absolute;
  top: 0.1px;
  left: 0;
  right: 0;
  bottom: 0.1px;
  overflow-x: hidden; /* or any other value */
  overflow-y: auto; /* or any other value */
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background: $dark-blue;
}

body * {
  color: white;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  height: 100%;
  width: 100%;
  max-width: 576px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  img.tropa {
    margin: 2rem 0;
    max-width: min(30%, 250px);
  }

  .spacer {
    flex-grow: 1;
  }

  footer.credits {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 3rem 0 1rem 0;

    img.master {
      margin: 2rem 0;
      max-width: min(50%, 420px);
    }

    small {
      font-size: 0.7rem;
      font-weight: 300;
    }
  }
}
</style>
