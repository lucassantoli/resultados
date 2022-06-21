<template>
  <div id="home" class="container">
    <p>Selecione uma competição<br />para ver os resultados disponíveis</p>

    <div class="opcoes">
      <a
        v-for="(olimpiada, index) in olimpiadas"
        :key="index"
        v-text="olimpiada.nome"
        :href="`#/${olimpiada.rota}`"
      ></a>
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

<style lang="scss">
#home {
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  p {
    font-weight: 400;
  }

  .opcoes {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    a {
      background: white;
      color: #fb0010;
      text-decoration: none;
      padding: 1rem;
      border-radius: 0.4rem;
    }
  }
}
</style>
