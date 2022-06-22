<template>
  <div id="converter" class="container">
    <h1>Preparando a planilha</h1>

    <div class="inputs">
      <label for="matricula">Sua planilha:</label>
      <input type="file" id="arquivo" @change="uploadFile" ref="file" />
      <br />
      <label for="matricula">Coluna chave</label>
      <input type="text" id="matricula" v-model="chave" />

      <button @click="converter">Obter JSON</button>
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
        newAluno.check = this.$CryptoJS.AES.encrypt(
          "coesi",
          secret.toString()
        ).toString();
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

<style lang="scss">
@import "./Converter.scss";
</style>
