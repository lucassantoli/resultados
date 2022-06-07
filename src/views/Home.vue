<template>
  <div id="home">
    <div class="container">
      <button class="refresh" @click="reload">
        <svg width="23" height="23">
          <path
            d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z"
          />
        </svg>
      </button>
      <h1>Resultado</h1>
      <h2>{{ $config["nome"] }}</h2>

      <div class="inputs">
        <label for="matricula">Sua matrícula:</label>
        <input type="text" id="matricula" v-model="matricula" />
        <small v-if="clicked && !matricula">Por favor insira sua matrícula</small>
        <small v-else>&nbsp;</small>

        <button @click="revelResult">Ver resultado</button>
      </div>

      <div class="selected" v-if="selected">
        <p
          v-for="(prop, index) in showSelected"
          :key="index"
          :class="[$config.destaque.includes(prop.key) ? 'special' : '']"
        >
          {{ prop.key }}: {{ prop.value }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import coesi from "@/assets/coesi.png";

export default {
  name: "home",

  data: () => ({
    matricula: "",
    selectedMatricula: "",
    clicked: false,
    selected: null,
    coesi,
  }),

  methods: {
    reload: function () {
      window.location.reload(true);
    },
    revelResult: function () {
      this.clicked = true;
      this.selectedMatricula = this.matricula.toString();
      this.selected = this.$planilha.find((student) => {
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
          const condA = this.$config.destaque.includes(propA.key);
          const condB = this.$config.destaque.includes(propB.key);

          return condA === condB ? 0 : condA ? -1 : 1;
        });
    },
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 400px;
  width: 400px;
}

#home img {
  max-width: 200px;
}

#home .hr {
  height: 2px;
  width: 100%;
  background: #080352;
  margin: 2rem 0;
}

#home .container .refresh {
  border: none;
  display: flex;
  padding: 0.25rem;
  border-radius: 4px;
  position: absolute;
  background: #d32123;
  cursor: pointer;
}

#home .container .refresh svg {
  fill: white;
}

#home .container h2,
#home .container h1 {
  margin-top: 0;
  margin-bottom: 0;
}

#home .container .inputs {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: self-start;
  width: 100%;
}

#home .container .inputs input {
  color: black;
}

#home .container .inputs button {
  background: #d32123;
  color: white;
  margin-top: 1rem;
  cursor: pointer;
}

#home .container .inputs button,
#home .container .inputs input {
  width: 100%;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  border: none;
}

#home .container .inputs small {
  color: #ddd;
  margin-top: 0.25rem;
}

#home .container .selected {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: flex-start;
  border-radius: 0.5rem;
  background: white;
  padding: 1rem;
}

#home .container .selected p {
  color: black;
  margin-top: 0;
  margin-bottom: 0;
  box-sizing: border-box;
  word-break: break-all;
  text-align: left;
}

#home .container .selected p.special {
  color: #d32123;
}
</style>
