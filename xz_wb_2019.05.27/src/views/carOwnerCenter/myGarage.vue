<template>
  <div class="user-main gray">
    <van-nav-bar class="xz-nva-bar" left-arrow fixed title="我的车库"/>
    <div class="judge">
      <div class="garage-box">
        <div class="garage">
          <div class="img">
            <img src="../../assets/images/common/icon3.png" alt>
          </div>
          <div class="info">
            <h3>
              保时捷 Cayenne
              <span>认证</span>
            </h3>
            <p>2018款 3.0T 上牌时间：2019.01</p>
          </div>
        </div>
        <div class="garage-btn">
          <div class="set" @click="set">
            <img src="../../assets/images/common/icon5.png" v-if="active">
            {{active?'已设为默认':'设为默认'}}
          </div>
          <div class="cancle" @click="del">删除</div>
        </div>
      </div>
    </div>
    <a class="addCar" href="#/carOwnerCenter/choseCar">添加我的爱车</a>
  </div>
</template>

<script>
import cityData from "../../assets/css/city.js";
import { NavBar, Tabbar, TabbarItem, Cell, Dialog } from "vant";
export default {
  data() {
    return {
      cityData: [],
      anchorMap: {},
      active: false
    };
  },
  created() {
    let _this = this;
    let _loading = _this.$xzLoading();
    _this.post(
      {
        method: "api.module.member.car.mycars"
      },
      function(data) {
        console.log(data);
        if (data.code == 200) {
        }
        _loading.clear();
      }
    );
  },
  methods: {
    addCar(){
      
      this.$router.push({
        name: "choseCar"
      });
    },
    del() {
      Dialog.confirm({
        title: "提示",
        message: "真的要删除吗？"
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    set() {
      this.active = !this.active;
    }
  },
  components: {
    vanTabbar: Tabbar,
    vanTabbarItem: TabbarItem,
    vanCell: Cell
  },
  computed: {}
};
</script>
<style lang="scss">
.gray {
  height: 100%;
  position: absolute;
  width: 100%;
  padding-bottom: 130px;
  overflow: auto;
  background: #f0f0f0;
}
.garage-box {
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
  margin-top: 30px;
  background: #fff;
  .garage {
    padding: 63px 32px;
    border-bottom: 1px solid #ececec;
    display: flex;
    .img {
      width: 190px;
      text-align: center;
      line-height: 80px;
      border-right: 1px solid #ececec;
      margin-right: 55px;
      padding-right: 32px;
      img {
        width: 70px;
        height: 70px;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .info {
      width: 100%;
      h3 {
        font-size: 30px;
        color: #000000;
        span {
          background: #2b81e2;
          font-size: 20px;
          color: #fff;
          display: inline-block;
          width: 80px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-weight: 100;
          border-radius: 3px;
        }
      }
      p {
        color: #333333;
        font-size: 20px;
        margin-top: 16px;
      }
    }
  }
  .garage-btn {
    display: block;
    margin: 27px 54px;
    overflow: hidden;
    div {
      display: inline-block;
      color: #4d95e7;
      font-size: 24px;
      padding: 14px 40px;
      border: 1px solid #2b81e2;
      border-radius: 5px;
    }
    .set {
      float: left;
      img {
        margin-right: 9px;
        width: 20px;
        height: 14px;
      }
    }
    .cancle {
      float: right;
    }
  }
}
.addCar {
  color: #fff;
  font-size: 28px;
  background: #4d79d8;
  padding: 37px 0px;
  text-align: center;
  position: fixed;
  bottom: 0px;
  width: 100%;
}
</style>
