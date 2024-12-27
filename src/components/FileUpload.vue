<template>
  <div>
    <h2>Upload PDF and Get Payroll Data</h2>
    <input type="file" @change="onFileChange" accept=".pdf" />
    <button @click="uploadFile" :disabled="!file">Upload PDF</button>
    <div v-if="jsonResponse">
      <h3>Response:</h3>
      <pre>{{ jsonResponse }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      file: null,
      jsonResponse: null,
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type === 'application/pdf') {
        this.file = file;
      } else {
        alert('Please select a valid PDF file.');
        this.file = null;
      }
    },
    async uploadFile() {
      const formData = new FormData();
      formData.append('file', this.file);

      console.log("Uploading file")


      try {
        const response = await axios.post('http://localhost:8080/payroll/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data)
        this.jsonResponse = JSON.stringify(response.data, null, 2);
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file.');
      }
    },
  },
};
</script>
