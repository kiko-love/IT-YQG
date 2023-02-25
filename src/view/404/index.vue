<template>
  <div class="error-page">
    <div class="error-code">
      4<span>0</span>4
    </div>
    <div class="error-desc">您访问的页面不存在（Not Found）</div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goHome() {
      this.$router.push("/home");
    }
  }
};
</script>


<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #f3f3f3;
  box-sizing: border-box;
}
.error-code {
  line-height: 1;
  font-size: 250px;
  font-weight: bolder;
  color: #236ab6;
  user-select: none;
}
.error-code span {
  color: #108a4d;
}
.error-desc {
  font-size: 30px;
  color: #777;
}
</style>
