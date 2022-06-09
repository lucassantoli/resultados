<template>
  <div id="converter">
    <div class="container">
      <h1>Preparando a planilha</h1>

      <div class="inputs">
        <label for="matricula">Sua planilha:</label>
        <input type="file" id="arquivo" @change="uploadFile" ref="file" />
        <br />
        <label for="matricula">Coluna chave</label>
        <input type="text" id="matricula" v-model="chave" />

        <button @click="converter">Obter JSON</button>

        <p>Insira esse JSON na raiz do projeto, na mesma pasta onde está o arquivo "index.html"</p>
      </div>
    </div>
  </div>
</template>

<script>
const XLSX = require("xlsx");

export default {
  name: "Converter",

  data: () => ({
    data: null,
    chave: "",
  }),

  methods: {
    uploadFile: function (e) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        const alunos = [];

        for (let i = 1; i < data.length; i++) {
          let obj = {};
          for (let j = 0; j < data[i].length; j++) {
            obj[data[0][j]] = data[i][j];
          }
          alunos.push(obj);
        }
        this.data = alunos;
      };

      reader.readAsBinaryString(file);
    },

    encryptData: function () {
      if (this.data == null) return null;
      let data = [];

      for (let i = 0; i < this.data.length; i++) {
        const secret = this.data[i][this.chave];
        let newAluno = {};
        let keys = Object.keys(this.data[i]);
        if (!secret) continue;
        for (let j = 0; j < keys.length; j++) {
          if (!this.data[i][keys[j]]) continue;
          newAluno[keys[j]] = this.$CryptoJS.AES.encrypt(
            this.data[i][keys[j]].toString(),
            secret.toString()
          ).toString();
        }
        newAluno.check = this.$CryptoJS.AES.encrypt("coesi", secret.toString()).toString();
        data.push(newAluno);
      }

      return data;
    },

    converter: function () {
      const data = this.encryptData();
      if (data == null) return;
      var a = document.createElement("a");
      var file = new Blob([JSON.stringify(data)], { type: "application/json" });
      a.href = URL.createObjectURL(file);
      a.download = "planilha.json";
      a.click();
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
#converter {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 400px;
  width: 400px;
}

#converter img {
  max-width: 200px;
}

#converter .hr {
  height: 2px;
  width: 100%;
  background: #080352;
  margin: 2rem 0;
}

#converter .container h2,
#converter .container h1 {
  margin-top: 0;
  margin-bottom: 0;
}

#converter .container .inputs {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: self-start;
  width: 100%;
}

#converter .container .inputs input#arquivo {
  color: white;
}

#converter .container .inputs input {
  color: black;
}

#converter .container .inputs button {
  background: #d32123;
  color: white;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

#converter .container .inputs button,
#converter .container .inputs input:not(#arquivo) {
  width: 100%;
  border-radius: 0.25rem;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  border: none;
}

#converter .container .inputs small {
  color: #ddd;
  margin-top: 0.25rem;
}

#converter .container .selected {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: flex-start;
  border-radius: 0.5rem;
  background: white;
  padding: 1rem;
}

#converter .container .selected p {
  color: black;
  margin-top: 0;
  margin-bottom: 0;
}

#converter .container .selected p.special {
  color: #d32123;
}
</style>
