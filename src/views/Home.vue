<template>
  <div class="home">
    <h1>Payroll Checker</h1>
    <FileUpload />
  </div>
</template>

<script>
import FileUpload from '../components/FileUpload.vue';

export default {
  name: 'Home',
  components: {
    FileUpload,
  },
};
</script>
