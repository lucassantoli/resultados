<template>
  <div id="olimpiada" class="container" v-if="dados">
    <h2 v-text="dados.nome" class="olympiad-name"></h2>

    <form @submit.prevent="revealResult">
      <label for="key">Qual sua matrícula?</label>

      <div class="grid">
        <input type="number" id="key" v-model="key" />

        <button type="submit" class="search">
          <img class="icon" src="@/assets/icon_lupa.png" alt="Ícone de lupa" />
        </button>

        <button class="back" type="button" @click="goToHome">
          <img
            class="icon"
            src="@/assets/icon_backarrow.png"
            alt="Ícone de uma seta retrocedendo"
          />
        </button>
      </div>

      <input type="submit" hidden />
    </form>

    <div class="not-found" v-if="displayNotFound" style="margin-top: 1rem">
      <h4>Não conseguimos encontrar nenhum resultado para esta matrícula</h4>
    </div>
    <div class="selected" v-else-if="selected">
      <div
        v-for="(prop, index) in showSelected"
        :key="index"
        :class="['prop', dados.destaque.includes(prop.key) ? 'special' : '']"
      >
        <p>
          <strong>{{ prop.key }}:</strong> {{ prop.value }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Olympiad",

  data: () => ({
    key: "",
    dados: null,
    selectedKey: "",
    clicked: false,
    selected: null,
    displayNotFound: false,
  }),

  methods: {
    revealResult: function () {
      this.clicked = true;
      this.selectedKey = this.key.toString();
      this.selected = this.planilha.find((student) => {
        try {
          const decrypted = this.$CryptoJS.AES.decrypt(
            student["check"].toString(),
            this.key.toString()
          ).toString(this.CryptoJS.enc.Utf8);
          return decrypted === "coesi";
        } catch {
          return false;
        }
      });

      this.displayNotFound = this.selected == null;
    },

    goToHome: function () {
      this.$router.push("/");
    },
  },

  computed: {
    showSelected: function () {
      const secret = this.selectedKey;
      return Object.keys(this.selected)
        .map((key) => ({
          key: key.startsWith("- ") ? key : "- " + key,
          value: this.$CryptoJS.AES.decrypt(
            this.selected[key].toString(),
            secret
          ).toString(this.CryptoJS.enc.Utf8),
        }))
        .sort((propA, propB) => {
          const condA = this.dados.destaque.includes(propA.key);
          const condB = this.dados.destaque.includes(propB.key);

          return condA === condB ? 0 : condA ? -1 : 1;
        })
        .filter((res) => {
          return res.key != "- check" && res.key != this.dados.chave;
        });
    },

    getKey: function () {
      const chave = this.dados.chave;
      return chave.toUpperCase().charAt(0) + chave.toLowerCase().slice(1);
    },
  },

  mounted() {
    const olimpiada = this.$route.params.olimpiada;

    this.dados = this.$config.resultados.find(
      (resultado) => resultado.id == olimpiada
    );

    if (this.dados == null) {
      this.$router.push({ name: 404 });
      return;
    }

    fetch(
      `${this.$baseURL}/resultados/${olimpiada}.json?nocache=` +
        new Date().getDate()
    )
      .then((res) => res.json())
      .then((res) => (this.planilha = res));
  },
};
</script>

<style lang="scss">
@import "./Olympiad.scss";
</style>
