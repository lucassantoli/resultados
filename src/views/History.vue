<template>
  <div id="olimpiada" class="container" v-if="dados">
    <h2 v-text="dados.nome" class="olympiad-name"></h2>

    <form @submit.prevent="revealResult">
      <label for="key">Qual a sua matrícula?</label>

      <div class="grid">
        <input type="number" id="key" v-model="key" />

        <button type="submit" class="search">
          <img class="icon" src="@/assets/icon_lupa.png" alt="Ícone de lupa" />
        </button>
      </div>

      <input type="submit" hidden />
    </form>

    <div class="not-found" v-if="displayNotFound" style="margin-top: 1rem">
      <h4>Não conseguimos encontrar nenhum resultado para esta matrícula</h4>
    </div>
    <div class="selected" v-else-if="selected">
      <div
        v-for="(prop, index) in finalObj"
        :key="index"
        :class="['prop']"
      >
        <p>
          <strong>{{ prop.key }}:</strong> {{ prop.value }}
        </p>
      </div>

      <div
        v-for="(history_unit, index) in history"
        :key="index"
        :class="['history']"
      >
        <div
          v-for="(prop, index) in history_unit"
          :key="index"
          :class="['prop']"
        >
          <p>
            <strong>{{ prop.key }}:</strong> {{ prop.value }}
          </p>
        </div>
      </div>
    </div>

    <div class="--obs" v-if="dados.obs">
      <h3>OBSERVAÇÕES</h3>
      <p v-text="dados.obs" v-if="isObsString"></p>
      <p v-else v-for="(obs, index) in dados.obs" v-html="obs" :key="index"></p>
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
    finalObj: {},
    history: [],
  }),

  methods: {
    revealResult: function () {
      this.clicked = true;
      this.selectedKey = this.key.toString();
      this.selected = this.planilha.find((student) => {
        if (!student) return false;
        const { secret, check } = student[0];
        if (!secret || !check) return false;
        try {
          const decrypted = this.$CryptoJS.AES.decrypt(
            check.toString(),
            this.key.toString()
          ).toString(this.CryptoJS.enc.Utf8);
          return decrypted === "master";
        } catch {
          return false;
        }
      });

      this.displayNotFound = this.selected == null;

      if (!this.displayNotFound) {
        this.computeSelected();
      }
    },

    goToHome: function () {
      this.$router.push("/");
    },

    computeSelected: function () {
      const secret = this.selectedKey;
      const selecteds = [];

      for (const entry of this.selected[1]) {
        const decryptedEntry = Object.keys(entry)
        .map((key) => ({
          key,
          value: this.$CryptoJS.AES.decrypt(
            entry[key].toString(),
            secret
          ).toString(this.CryptoJS.enc.Utf8),
        }))
        .filter((res) => {
          return res.key != "check" && res.key != this.dados.chave;
        });

        selecteds.push(decryptedEntry);
      }

      const finalObj = {};
      const history = []


      for (const selected of selecteds) {
        const historyObj = {};
        for (const line of selected) {
          if (this.dados.agrupar.includes(line.key)) {
            historyObj[line.key] = line.value;
          } else {
            finalObj[line.key] ??= line.value;
          }
        }
        history.push(historyObj)
      }

      this.finalObj = Object.entries(finalObj).map(([key, value]) => ({ key, value }));
      this.history = history.map(h => Object.entries(h).map(([key, value]) => ({ key, value })));
      console.log(this.history);
    },
  },

  computed: {
    isObsString: function () {
      return (typeof this.dados.obs === "string");
    },

    getKey: function () {
      const chave = this.dados.chave;
      return chave.toUpperCase().charAt(0) + chave.toLowerCase().slice(1);
    },
  },

  mounted() {
    const ano = this.$route.params.ano;

    this.dados = this.$config.historicos.find(
      (resultado) => resultado.id == ano
    );

    if (this.dados == null) {
      this.$router.push({ name: 404 });
      return;
    }

    fetch(
      `/historicos/${ano}.json?nocache=` +
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
