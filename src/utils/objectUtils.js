const objectUtils = {
    isEmpty(obj) {
        return Object.values(obj).every((value) => !value);
    },
    
    // 其他对象操作方法
  };
  
  export {objectUtils};
  