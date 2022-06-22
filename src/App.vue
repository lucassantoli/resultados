<template>
  <div id="app">
    <img
      class="joc"
      src="@/assets/Logo JOC.png"
      alt="Logotipo da Jornada Olímpica do Coesi"
    />

    <router-view :key="$route.path" />

    <div class="spacer"></div>

    <footer class="credits">
      <img
        class="coesi"
        src="@/assets/Logo Coesi.png"
        alt="Logotipo do Coesi"
      />
      <small>Desenvolvido por Lucas Santoli</small>
    </footer>
  </div>
</template>

<script></script>

<style lang="scss">
@import "@/global.scss";
@import "@/fonts.scss";

* {
  font-family: "Roc Grotesk", sans-serif;
}

html {
  height: 100%;
}

body .wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background: url("./assets/Shape.png"), $dark-blue;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: auto 100vh;
  background-position: 50% 0;
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

  img.joc {
    margin: 4rem 0;
    max-width: min(60%, 480px);
  }

  .spacer {
    flex-grow: 1;
  }

  footer.credits {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 6rem 0 3rem 0;

    img.coesi {
      max-width: min(35%, 295px);
    }

    small {
      font-size: 0.7rem;
      font-weight: 300;
    }
  }
}
</style>
