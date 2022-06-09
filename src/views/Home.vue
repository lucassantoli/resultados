<template>
  <div id="home">
    <div class="container">
      <h1>Resultados</h1>
      <br />
      <h3>Selecione um resultado para ver</h3>
      <div class="opcoes">
        <a
          v-for="(olimpiada, index) in olimpiadas"
          :key="index"
          v-text="olimpiada.nome"
          :href="`#/${olimpiada.rota}`"
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",

  data: () => ({
    olimpiadas: [],
  }),

  mounted() {
    this.olimpiadas = this.$config.resultados.map((resultado) => ({
      nome: resultado.nome,
      rota: resultado.id,
    }));
  },
};
</script>

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
#home {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#home .container h2,
#home .container h1 {
  margin-top: 0;
  margin-bottom: 0;
}

#home .container .opcoes {
  display: flex;
  flex-direction: column;
}

#home .container .opcoes a {
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
