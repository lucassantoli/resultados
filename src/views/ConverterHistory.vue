<template>
  <div id="converter" class="container">
    <h1>Histórico de olimpíadas</h1>

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
  name: "Converter histórico",

  data: () => ({
    data: null,
    alunos: null,
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
        this.data = data;
      };

      reader.readAsBinaryString(file);
    },

    xlsxToJson: function () {
      const alunos = new Map();
      const data = this.data;
      const keyIndex = data[0].indexOf(this.chave);

      for (let i = 1; i < data.length; i++) {
        let obj = {};
        const rowKey = data[i][keyIndex];
        if (!alunos.has(rowKey)) {
          alunos.set(rowKey, []);
        }

        for (let j = 0; j < data[i].length; j++) {
          const header = data[0][j];
          obj[header] = data[i][j];
        }
        alunos.get(rowKey).push(obj);
      }

      this.alunos = Array.from(alunos);
    },

    encryptData: function () {
      if (this.data == null) return null;
      let data = [];

      for (let i = 0; i < this.alunos.length; i++) {
        const secret = this.alunos[i][0];
        const cryptedSecret = this.$CryptoJS.AES.encrypt(
          secret.toString(),
          secret.toString()
        ).toString();
        const alunoData = this.alunos[i][1];
        let newAluno = [{ secret: cryptedSecret }, []];
        if (!secret) continue;
        for (let k = 0; k < alunoData.length; ++k) {
          const newAlunoData = {};
          const _alunoData = alunoData[k];
          let keys = Object.keys(_alunoData);

          for (let j = 0; j < keys.length; j++) {
            if (!_alunoData[keys[j]]) continue;
            newAlunoData[keys[j]] = this.$CryptoJS.AES.encrypt(
              _alunoData[keys[j]].toString(),
              secret.toString()
            ).toString();
          }
          newAluno[0].check = this.$CryptoJS.AES.encrypt(
            "master",
            secret.toString()
          ).toString();

          newAluno[1].push(newAlunoData);
        }

        data.push(newAluno);
      }

      return data;
    },

    converter: function () {
      this.xlsxToJson();
      const data = this.encryptData();
      console.log(data);
      if (data == null) return;
      var a = document.createElement("a");
      console.log(JSON.stringify(data));
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
