<template>
  <div class="login">
    <div class="popup-box popup-center login-popup-box">
      <div class="title">报名</div>
      <div class="title-tips">滚动问题</div>
      <nut-textinput
        v-model="from.test1Value"
        :clearBtn="false"
        readonly
        class="input-item"
        placeholder="请选择1"
        @click="test1Visible = true"
      />

      <nut-textinput
        v-model="from.test2Value"
        readonly
        class="input-item"
        placeholder="请选择2"
        @click="test2Visible = true"
      />

      <div class="title-tips">只有一个选项时点击确定没有获取到选中的值</div>
      <nut-textinput
        v-model="from.test3Value"
        readonly
        class="input-item"
        placeholder="请选择3"
        @click="test3Visible = true"
      />
    </div>
    <div class="login-mask"></div>
    <!-- 滚动问题开始 -->
    <nut-picker
      customClassName="picker-box"
      :list-data="test1"
      :is-visible="test1Visible"
      @close="test1Visible = false"
      @confirm="setChooseValueTest1"
    ></nut-picker>

    <nut-picker
      customClassName="picker-box"
      :list-data="test2"
      :is-visible="test2Visible"
      @close="test2Visible = false"
      @confirm="setChooseValueTest2"
    ></nut-picker>
    <!-- 滚动问题结束 -->
    <nut-picker
      customClassName="picker-box"
      :list-data="test3"
      :is-visible="test3Visible"
      @close="test3Visible = false"
      @confirm="setChooseValueTest3"
    ></nut-picker>
  </div>
</template>

<script>
import { removeElementsByClass } from "@/util/util";
import toast from "@/util/toast";
import { setStore } from "@util/util";
export default {
  components: {},
  data() {
    return {
      //使用官方推荐的脚手架，打包后不显示背景图片
      maskStyle: {
        backgroundImage: "url(" + require("@asset/img/login_bg.png") + ")"
      },
      test1Visible: false,
      test2Visible: false,
      test3Visible: false,

      test1: [[]],
      test2: [[]],
      test3: [[]],
      from: {
        test1Value: "",
        test2Value: "",
        test3Value: ""
      }
    };
  },
  created() {
    var self = this;
    //使用官方推荐的脚手架，打包后不显示背景图片，麻烦测试一下
    setTimeout(() => {
      for (let index = 0; index < 11; index++) {
        self.test1[0].push({
          label: "雨湖区" + index,
          value: "雨湖区" + index
        });
      }
    }, 3000);

    //只有一个选项时出现线 问题
    //模拟异步请求
    setTimeout(() => {
      for (let index3 = 0; index3 < 1; index3++) {
        self.test3[0].push({
          label: "雨湖区3" + index3,
          value: "雨湖区3" + index3
        });
      }
    }, 3000);
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 300);
  },
  // 组件离开时
  destroyed() {
    removeElementsByClass("nut-mask");
  },
  methods: {
    //滚动问题开始
    // 选中第一个
    setChooseValueTest1(chooseData) {
      this.test1Visible = false;
      this.from.test1Value = chooseData[0].value;
      this.from.test2Value = "";
      var self = this;
      self.test2[0] = [];
      //模拟异步请求
      setTimeout(() => {
        for (let index2 = 0; index2 < 30; index2++) {
          self.test2[0].push({
            label: "雨湖区2" + index2,
            value: "雨湖区2"
          });
        }
      }, 600);
    },

    setChooseValueTest2(chooseData) {
      this.test2Visible = false;
      this.from.test2Value = chooseData[0].value;
    },
    //滚动问题结束
    setChooseValueTest3(chooseData) {
      console.log(
        "%c 🍐 chooseData: ",
        "font-size:20px;background-color: #4b4b4b;color:#fff;",
        chooseData
      );
      this.test3Visible = false;
      this.from.test3Value = chooseData[0].value;
    }
  }
};
</script>

<style>
.bg.nut-mask {
  background-color: rgba(140, 140, 140, 0.38);
}
.login .input-item.nut-textinput input {
  background: #eeeff1;
}
.login .input-item.nut-textinput input::-webkit-input-placeholder {
  color: #333;
}

.login .input-item.nut-textinput input::-moz-placeholder {
  color: #333;
}

.login .input-item.nut-textinput input::-ms-input-placeholder {
  color: #333;
}
.picker-box .nut-picker-cancel-btn {
  color: #4eb4e6;
}
.check-dialog .nut-dialog-ok {
  background: #2c88ee;
}
</style>
<style lang="scss" scoped>
.title-tips {
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  color: red;
  background-color: #fefefe;
}

.login-popup-box {
  width: 338px;
  border-radius: 10px;
  padding: 10px;
  padding-top: 15px;
  padding-bottom: 51px;
  font-family: Microsoft YaHei;
}
.login {
  .title {
    padding: 0px 0 15px 0;
    font-size: 20px;
    text-align: center;
    border-bottom: 1px solid rgba(112, 112, 112, 0.25);
    font-weight: 400;
    line-height: 21px;
    color: rgba(0, 0, 0, 1);
  }
  .login-id-card {
    width: 292px;
    margin: 23px auto;
    text-align: center;
  }
  .input-item {
    // width: 292px;
    margin: 23px auto;
    margin-top: 0px;
    text-align: center;
  }
  .login-btn {
    background: linear-gradient(
      270deg,
      rgba(37, 128, 239, 1) 0%,
      rgba(78, 180, 230, 1) 100%
    );
    width: 292px;
    height: 44px;
    border-radius: 4px;
    font-size: 16px;
    display: block;
    text-align: center;
    margin: 0 auto;
  }
  .actived-btn {
    border-color: rgba(78, 180, 230, 1);
    color: rgba(78, 180, 230, 1);
    width: 292px;
    height: 44px;
    border-radius: 4px;
    font-size: 16px;
    display: block;
    text-align: center;
    margin: 0 auto;
    margin-top: 10px;

    background: transparent;
  }
  .login-bottom {
    margin: 20px auto;
    margin-bottom: 9px;
    width: 292px;
    height: 25px;
    line-height: 20px;
    display: block;
  }
  .go-sign—up {
    display: block;
    font-size: 14px;
    height: 20px;
    color: #00a1f0;
  }
}
.popup-box {
  position: fixed;
  max-height: 100%;
  overflow-y: auto;
  background-color: #fff;
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
  -webkit-overflow-scrolling: touch;
  z-index: 100;
}
.login-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("~@/asset/img/login_bg.png");
  z-index: 99;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
