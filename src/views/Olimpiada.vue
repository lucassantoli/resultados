<template>
  <div id="olimpiada">
    <div class="container" v-if="dados">
      <h1>Resultados</h1>
      <h2 v-text="dados.nome"></h2>

      <form @submit.prevent="revelResult" class="inputs">
        <label for="matricula">{{ getChave }}</label>
        <input type="text" id="matricula" v-model="matricula" />
        <small v-if="clicked && !matricula">Por favor, preencha o campo acima</small>
        <small v-else>&nbsp;</small>

        <input type="submit" hidden />
        <button type="submit">Ver resultado</button>
        <button
          class="dark"
          @click="
            () => {
              $router.push('/');
            }
          "
        >
          Voltar
        </button>
      </form>

      <div class="selected" v-if="selected">
        <p
          v-for="(prop, index) in showSelected"
          :key="index"
          :class="[dados.destaque.includes(prop.key) ? 'special' : '']"
        >
          {{ prop.key }}: {{ prop.value }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "olimpiada",

  data: () => ({
    matricula: "",
    dados: null,
    selectedMatricula: "",
    clicked: false,
    selected: null,
  }),

  methods: {
    revelResult: function () {
      this.clicked = true;
      this.selectedMatricula = this.matricula.toString();
      this.selected = this.planilha.find((student) => {
        try {
          const decrypted = this.$CryptoJS.AES.decrypt(
            student["check"].toString(),
            this.matricula.toString()
          ).toString(this.CryptoJS.enc.Utf8);
          return decrypted === "coesi";
        } catch {
          return false;
        }
      });
    },
  },

  computed: {
    showSelected: function () {
      const secret = this.selectedMatricula;
      return Object.keys(this.selected)
        .map((key) => ({
          key: key,
          value: this.$CryptoJS.AES.decrypt(this.selected[key].toString(), secret).toString(
            this.CryptoJS.enc.Utf8
          ),
        }))
        .sort((propA, propB) => {
          const condA = this.dados.destaque.includes(propA.key);
          const condB = this.dados.destaque.includes(propB.key);

          return condA === condB ? 0 : condA ? -1 : 1;
        })
        .filter((res) => res.key != "check");
    },

    getChave: function () {
      const chave = this.dados.chave;
      return chave.toUpperCase().charAt(0) + chave.toLowerCase().slice(1);
    },
  },

  mounted() {
    const olimpiada = this.$route.params.olimpiada;

    this.dados = this.$config.resultados.find((resultado) => resultado.id == olimpiada);

    if (this.dados == null) {
      this.$router.push({ name: 404 });
      return;
    }

    fetch(`${this.$baseURL}/resultados/${olimpiada}.json?nocache=` + new Date().getDate())
      .then((res) => res.json())
      .then((res) => (this.planilha = res));
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
#olimpiada {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#olimpiada img {
  max-width: 200px;
}

#olimpiada .hr {
  height: 2px;
  width: 100%;
  background: #080352;
  margin: 2rem 0;
}

#olimpiada .container .refresh {
  border: none;
  display: flex;
  padding: 0.25rem;
  border-radius: 4px;
  position: absolute;
  background: #d32123;
  cursor: pointer;
}

#olimpiada .container .refresh svg {
  fill: white;
}

#olimpiada .container h2,
#olimpiada .container h1 {
  margin-top: 0;
  margin-bottom: 0;
}

#olimpiada .container .inputs {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: self-start;
  width: 100%;
}

#olimpiada .container .inputs input {
  color: black;
}

#olimpiada .container .inputs button {
  background: #d32123;
  color: white;
  margin-top: 1rem;
  cursor: pointer;
}

#olimpiada .container .inputs button.dark {
  background: #342caa;
}

#olimpiada .container .inputs button,
#olimpiada .container .inputs input {
  width: 100%;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  border: none;
}

#olimpiada .container .inputs small {
  color: #ddd;
  margin-top: 0.25rem;
}

#olimpiada .container .selected {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: flex-start;
  border-radius: 0.5rem;
  background: white;
  padding: 1rem;
}

#olimpiada .container .selected p {
  color: black;
  margin-top: 0;
  margin-bottom: 0;
  box-sizing: border-box;
  word-break: break-all;
  text-align: left;
}

#olimpiada .container .selected p.special {
  color: #d32123;
}
</style>
