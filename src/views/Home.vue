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
@import "./Home.scss";
</style>
