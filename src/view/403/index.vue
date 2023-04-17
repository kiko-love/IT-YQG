<template>
  <div class="error-page">
    <div class="error-code"> 
      4<span>0</span>3
    </div>
    <div class="error-desc">您暂无权限访问该页面（No permissions）</div>
    <div class="error-handle">
      <a-button type="primary" size="large" shape="round" @click="goHome">返回首页</a-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
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
  color:#106898;
  user-select: none;
}
.error-code span {
  color: #2a6e3f;
}
.error-desc {
  font-size: 30px;
  color: rgb(117, 114, 114);
}
.error-handle {
    display: flex;
  margin-top: 30px;
  padding-bottom: 200px;
}
.error-btn {
  margin-left: 100px;
}
</style>
