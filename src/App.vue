<template>
  <div id="app">
    <img
      class="joc"
      src="@/assets/joc-coesi.png"
      alt="Logotipo da Jornada Olímpica do Coesi"
    />

    <router-view :key="$route.path" />

    <div class="spacer"></div>

    <footer class="credits">
      <img class="coesi" src="@/assets/coesi.png" alt="Logotipo do Coesi" />
      <small>Desenvolvido por Lucas Santoli</small>
    </footer>
  </div>
</template>

<style lang="scss">
#app {
  height: 100%;
  text-align: center;
  width: 100%;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  img.joc {
    max-width: 60%;
    width: 100%;
  }

  .spacer {
    flex-grow: 1;
  }

  footer.credits {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 2rem;

    img.coesi {
      max-width: 25%;
      width: 100%;
    }

    small {
      font-size: 0.6rem;
      font-weight: 300;
    }
  }
}
</style>
