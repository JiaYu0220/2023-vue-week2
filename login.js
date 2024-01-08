import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  // 資料(函式)
  data() {
    return {
      url: "https://ec-course-api.hexschool.io/v2",
      user: {
        username: "",
        password: "",
      },
    };
  },
  // 方法(物件)
  methods: {
    async signin() {
      try {
        console.log(this.user);
        // 登入
        const reqUrl = `${this.url}/admin/signin`;
        const res = await axios.post(reqUrl, this.user);
        // 存 token、expired 到 cookie
        const { token, expired } = res.data;
        document.cookie = `myToken=${token}; expires=${new Date(expired)}`;

        alert("登入成功");
        location.href = "admin.html";
      } catch (e) {
        console.log(e);
        alert("登入失敗，請再試一次");
      }
    },
  },
}).mount("#app");
