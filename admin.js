import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { url, path } from "/config.js";

// 取 token
const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
);
// 預設 token 僅須設定一次
axios.defaults.headers.common["Authorization"] = token;

createApp({
  // 資料(函式)
  data() {
    return {
      products: {},
      productDetail: {},
    };
  },
  // 生命週期(函式)
  mounted() {
    this.checkSignin();
    this.getProducts();
  },
  // 方法(物件)
  methods: {
    // 確認登入
    async checkSignin() {
      try {
        // 確認是否登入
        const reqUrl = `${url}/api/user/check`;
        const res = await axios.post(reqUrl);
      } catch (error) {
        console.log(error);
        alert("請重新登入");
        location.href = "index.html";
      }
    },

    // 所有產品
    async getProducts() {
      try {
        const reqUrl = `${url}/api/${path}/admin/products`;
        const { data } = await axios.get(reqUrl);
        this.products = data.products;
      } catch (error) {
        console.log(error);
      }
    },
    handleSeeMore(item) {
      this.productDetail = item;
    },
  },
}).mount("#app");
