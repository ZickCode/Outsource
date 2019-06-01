<template>
  <div class="user-main gray">
    <van-nav-bar @click-left="go_back" class="xz-nva-bar" left-arrow fixed title="车辆年检服务"/>
    <div class="judge">
      <div class="yearCheck">
        <img src="../../assets/images/common/icon6.png" alt>
      </div>

      <div class="yearCheck-info">
        <h3>车辆所在地：云南省-昆明市-西山区</h3>
        <div class="name">
          <input type="text" placeholder="姓名">
        </div>
        <div class="phone">
          <input type="text" placeholder="手机号">
        </div>
        <div class="address">
          取车地址:
          <input type="text">
        </div>
      </div>

      <div class="items">
        <div class="img">
          <img src="../../assets/images/common/5.png" alt>
        </div>
        <div class="right">
          <h3>年检代办</h3>
          <p>车牌： 云A123LH</p>
        </div>
        <div class="num">×1</div>
      </div>

      <div class="subject">
        <van-collapse v-model="activeNames">
          <van-collapse-item title="请选择" name="1" value="上线年检代办">
            <div class="cell">
              <div class="cell-name">上线年检代办 ￥198.00</div>
              <div class="cell-icon">
                <div class="cell-icon-box">
                  <van-icon name="success" color="#fff"/>
                </div>
              </div>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>

      <div class="terms">
        <div class="terms-icon" :class="terms?'onterms':''">
          <van-icon name="success" color="#fff" v-if="terms"/>
        </div>阅读并同意《年检办理服务说明》
      </div>

      <div class="yearCheck-btn">
        <div class="notes">不包括检测费用，以检测站发票为准，需线下支付</div>
        <div class="box">
          <div class="left">
            实付款：
            <span>￥198.00</span>
          </div>
          <div class="right">提交订单</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  NavBar,
  Tabbar,
  TabbarItem,
  Cell,
  CellGroup,
  Collapse,
  CollapseItem,
  RadioGroup,
  Radio,
  Icon,
  CheckboxGroup,
  Checkbox
} from "vant";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      list: ["a", "b", "c"],
      activeNames: ["1"],
      result: ["a", "b"],
      terms: true
    };
  },
  created() {},
  methods: {
  },
  components: {
    vanTabbar: Tabbar,
    vanTabbarItem: TabbarItem,
    "van-cell": Cell,
    "van-cell-group": CellGroup,
    "van-collapse": Collapse,
    "van-collapse-item": CollapseItem,
    "van-radio-group": RadioGroup,
    "van-radio": Radio,
    "van-icon": Icon
  },
  computed: {}
};
</script>
<style lang="scss">
.yearCheck-btn {
  position: fixed;
  width: 100%;
  bottom: 0px;
  .notes {
    font-size: 24px;
    color: #df9954;
    background: #ffffe8;
    padding: 23px 45px;
  }
  .box {
    border-top: 1px solid #cecece;
    display: flex;
    .left {
      width: 433px;
      text-align: left;
      font-size: 24px;
      color: #999999;
      background: #ffffff;padding: 35px 0px 35px 50px;
      span {
        font-weight: 600;
        font-size: 30px;
        color: #4870e3;
      }
    }
    .right {
      flex: auto;
      background: #4870e3;
      color: #fff;
      font-size: 32px;
      text-align: center;padding: 35px 0px;
    }
  }
}
.van-collapse-item__content {
  padding: 0;
}
.terms {
  padding: 30px 45px;
  text-align: left;
  font-size: 22px;
  color: #999999;
  .terms-icon {
    width: 34px;
    height: 34px;
    line-height: 30px;
    border-radius: 3px;
    border: 1px solid #ccc;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    margin-right: 20px;
    .van-icon {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .onterms {
    background: #429ffd;
    border-color: #429ffd;
    color: #fff;
  }
}
.cell {
  padding: 30px 45px;
  background: #fafafa;
  overflow: hidden;
  .cell-name {
    font-size: 26px;
    color: #333;
    float: left;
  }
  .cell-icon {
    float: right;
    margin-top: 4px;
    .cell-icon-box {
      width: 36px;
      height: 36px;
      line-height: 30px;
      text-align: center;
      background: #429ffd;
      border-radius: 50%;
      .van-icon {
        vertical-align: middle;
      }
    }
  }
}
.van-collapse-item__title {
  padding: 32px 45px;
  line-height: 1;
  .van-cell__title {
    color: #999999;
    font-size: 26px;
  }
  .van-cell__value {
    color: #333333;
    font-size: 26px;
  }
  .van-cell__right-icon {
    font-size: 30px;
    margin-left: 26px;
  }
}
.items {
  background: #fff;
  padding: 22px 45px;
  display: flex;
  position: relative;
  .img {
    width: 105px;
    height: 105px;
    margin-right: 31px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    h3 {
      font-size: 28px;
      color: #333333;
      font-weight: 500;
      margin-top: 13px;
    }
    p {
      font-size: 26px;
      color: #999999;
    }
  }
  .num {
    font-size: 26px;
    color: #999999;
    position: absolute;
    right: 45px;
    top: 50px;
  }
}
.gray {
  height: 100%;
  position: absolute;
  width: 100%;
  padding-bottom: 130px;
  overflow: auto;
  background: #f0f0f0;
}
.yearCheck {
  background: #fff;
  padding: 50px;
  img {
    width: 100%;
  }
}
.yearCheck-info {
  background: #fff;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 33px 45px;
  h3 {
    margin-bottom: 15px;
  }
  div {
    padding: 20px 0px 20px 40px;
    font-size: 26px;
    display: inline-block;
    input {
      display: inline-block;
      width: 90%;
    }
  }
  .name {
    background: url(../../assets/images/common/1.png) no-repeat center left;
    background-size: 33px 33px;
    width: 50%;
  }
  .phone {
    background: url(../../assets/images/common/2.png) no-repeat center left;
    background-size: 23px 35px;
    width: 50%;
  }
  .address {
    background: url(../../assets/images/common/3.png) no-repeat center left;
    background-size: 26px 34px;
    position: relative;
    width: 100%;
    input {
      width: auto;
    }
    &::before {
      content: "";
      width: 18px;
      height: 32px;
      background: url(../../assets/images/common/4.png) no-repeat center;
      background-size: 18px 32px;
      position: absolute;
      right: 10px;
      top: 22px;
    }
  }
}
</style>
