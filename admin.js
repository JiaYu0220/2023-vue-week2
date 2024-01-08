import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  // 資料(函式)
  data() {
    return {
      api: {
        url: "https://ec-course-api.hexschool.io/v2",
        path: "jiayu",
      },
      products: [],
      productDetail: {},
    };
  },
  // 生命週期(函式)
  mounted() {
    // 取 token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // 預設 token 僅須設定一次
    axios.defaults.headers.common["Authorization"] = token;
    // 確認登入
    this.checkSignin();
  },
  // 方法(物件)
  methods: {
    // 確認登入
    async checkSignin() {
      try {
        // 確認是否登入
        const reqUrl = `${this.api.url}/api/user/check`;
        await axios.post(reqUrl);
        // 所有產品
        this.getProducts();
      } catch (error) {
        console.log(error);
        alert("請重新登入");
        location.href = "index.html";
      }
    },

    // 所有產品
    async getProducts() {
      try {
        const reqUrl = `${this.api.url}/api/${this.api.path}/admin/products`;
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
