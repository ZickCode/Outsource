<template>
  <div class="user-main car-owner-center">
    <van-nav-bar
      @click-left="go_back"
      class="xz-nva-bar"
      title="车主中心"
      right-text="管理车型"
      left-arrow
    />
    <van-swipe v-if="carData.length" indicator-color="white" class="car-swiper" @change="onChange">
      <van-swipe-item v-for="(item, index) in carData">
        <div v-if="item.info && item.info.name">
          <img :src="sourceUrl+item.info.brand.thumb">
          <div>
            <div>
              <p>{{item.info.name.name}}</p>
              <i>-</i>
            </div>
            <div>-款 {{item.info.year.name}} 上牌时间：{{GetDate(item.info.name.create_time)}}</div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <div v-else class="add-box">
      <img src="../../assets/images/carOwnerCenter/icon-add.png" alt="">
      <p>添加车辆</p>
    </div>
    <div class="nav-box">
      <van-cell class="order-cell" title="车主服务"/>
      <div class="user-serve">
        <a class="serve-item" href="#/carOwnerCenter/index">
          <img src="../../assets/images/carOwnerCenter/icon-index-1.png" alt="">违法处理
        </a>
        <a class="serve-item" href="#/user/collect">
          <img src="../../assets/images/carOwnerCenter/icon-index-2.png" alt="">年检查询
        </a>
        <a class="serve-item" href="#/user/footprint">
          <img src="../../assets/images/carOwnerCenter/icon-index-3.png" alt="">保险查询
        </a>
        <a class="serve-item" href="#/user/coupon">
          <img src="../../assets/images/carOwnerCenter/icon-index-4.png" alt="">我的保养
        </a>
      </div>
    </div>
    <div class="user-info" v-if="carData[currentIndex] && carData[currentIndex].info && carData[currentIndex].info.car">
      <div class="title-box">
        <div class="user-title">
          <img src="../../assets/images/carOwnerCenter/icon-userinfo.png" alt="">
          <span>车主信息</span>
        </div>
        <div class="user-text">
          <img src="../../assets/images/carOwnerCenter/icon-scan.png" alt="">
          <span>扫驾驶证自动填写</span>
        </div>
      </div>
      <div class="user-info-item">
        <div class="user-info-item-box">
          <p class="title">姓名</p>
          <p class="text">{{carData[currentIndex].info.car.name}}</p>
        </div>
        <div class="user-info-item-box">
          <p class="title">性别</p>
          <p class="text">{{carData[currentIndex].info.car.sex == 1 ? '女' : '男'}}</p>
        </div>
      </div>
      <div class="user-info-item">
        <div class="user-info-item-box">
          <p class="title">驾驶证号</p>
          <p class="text">{{carData[currentIndex].info.car.number}}</p>
        </div>
      </div>
      <div class="user-info-item">
        <div class="user-info-item-box">
          <p class="title">出生日期</p>
          <p class="text">{{GetDate(carData[currentIndex].info.car.birthday)}}</p>
        </div>
        <div class="user-info-item-box">
          <p class="title">准驾车型</p>
          <p class="text">{{carData[currentIndex].info.car.license_type}}</p>
        </div>
      </div>
      <div class="user-info-item">
        <div class="user-info-item-box">
          <p class="title">初次领证日期</p>
          <p class="text">{{GetDate(carData[currentIndex].info.car.license_time)}}</p>
        </div>
        <div class="user-info-item-box">
          <p class="title">有效期限</p>
          <p class="text">{{GetDate(carData[currentIndex].info.car.license_end)}}</p>
        </div>
      </div>
    </div>
    <div class="user-info" v-if="carData[currentIndex] && carData[currentIndex].info && carData[currentIndex].info.car && carData[currentIndex].info.year">
      <div class="title-box">
        <div class="user-title">
          <img src="../../assets/images/carOwnerCenter/icon-userinfo.png" alt="">
          <span>车辆信息</span>
        </div>
      </div>
      <div v-if="!carInfo" class="no-info">暂无</div>
      <template v-else>
        <div class="user-info-item">
          <div class="user-info-item-box">
            <p class="title">发动机排量</p>
            <p class="text">{{carData[currentIndex].info.year.name}}</p>
          </div>
          <div class="user-info-item-box">
            <p class="title">生产年份</p>
            <p class="text">{{GetDate(carData[currentIndex].info.car.create_time)}}</p>
          </div>
        </div>
        <div class="user-info-item">
          <div class="user-info-item-box">
            <p class="title">款型</p>
            <p class="text">{{carData[currentIndex].info.car.car_type}}</p>
          </div>
        </div>
        <div class="user-info-item">
          <div class="user-info-item-box">
            <p class="title">上路时间</p>
            <p class="text">{{GetDate(carData[currentIndex].info.car.road_time)}}</p>
          </div>
          <div class="user-info-item-box">
            <p class="title">行驶里程</p>
            <p class="text">{{carData[currentIndex].info.car.mileage}}</p>
          </div>
        </div>
      </template>
    </div>
    <div v-if="carInfo" class="user-info">
      <div class="title-box">
        <div class="user-title">
          <img src="../../assets/images/carOwnerCenter/icon-ruler.png" alt="">
          <span>查违章信息</span>
        </div>
        <div class="user-text">
          <img src="../../assets/images/carOwnerCenter/icon-scan.png" alt="">
          <span>扫驾驶证自动填写</span>
        </div>
      </div>
      <div class="user-info-item">
        <div class="user-info-item-box flex">
          <div @click="showPopup = true" class="car-num-box flex">
            <span>云</span>
            <img src="../../assets/images/carOwnerCenter/icon-arrow-down.png" alt="">
          </div>
          <van-field placeholder="车牌号"/>
        </div>
        <div class="user-info-item-box">
          <van-field placeholder="查询城市"/>
        </div>
      </div>
      <div class="user-info-item">
        <div class="user-info-item-box">
          <van-field placeholder="车辆识别代号（VIN）"/>
        </div>
      </div>
      <div class="user-info-item">
        <div class="user-info-item-box">
          <van-field placeholder="发动机号码"/>
        </div>
      </div>
    </div>
    <van-popup v-model="showPopup" position="bottom">
      <van-picker :columns="columns" show-toolbar @change="onChange"/>
    </van-popup>
  </div>
</template>
<script>
import {
  Swipe,
  SwipeItem,
  Cell,
  Icon,
  Picker,
  Field,
  Popup,
  Button
} from "vant";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      sourceUrl: sourceUrl,
      carList: [1],
      carInfo: 1,
      showPopup: false,
      columns: ["京", "津", "冀", "晋", "蒙", "辽", "吉", "黑", "沪", "苏", "浙", "皖", "闽", "赣", "鲁", "豫", "鄂", "湘", "粤", "桂", "琼", "渝", "川", "贵", "云", "藏", "陕", "甘", "新"],
      userData: {},
      carData: [],
      currentIndex: 0
    };
  },
  created() {},
  mounted() {
    this.loadData();
  },
  methods: {
    onChange(index) {
      this.currentIndex = index;
    },
    ...mapActions("userMessage", ["getUser", "setUser"]),
    ...mapActions("userMessage", ["updataWechatLogin", "updataWechatData"]),
    loadData() {
      let _this = this;
      let _userData = _this.userMessage.user;
      let _loading = _this.$xzLoading();
      _this.userData = _userData;
      _this.post(
        {
          method: "api.module.member.car.mycars"
        },
        function(data) {
          if (200 !== data.code) {
            _this.$toast({
              message: data.msg,
              position: "bottom"
            });
            return;
          }
          if (data.result != null) {
            _this.$set(_this, "carData", data.result);
          }
          _loading.clear();
        }
      );
    },
    GetDate(time) {
      let date = new Date(time*1000);
      let Y = date.getFullYear() + "-",
          M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-",
          D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ",
          h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":",
          m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":",
          s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D;
    }
  },
  components: {
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem,
    "van-cell": Cell,
    "van-icon": Icon,
    "van-picker": Picker,
    "van-field": Field,
    "van-popup": Popup,
    "van-button": Button
  },
  computed: {
    ...mapState(["userMessage"])
  }
};
</script>
<style lang="less" scoped>
.user-main{
  padding-top: 0;
}
.car-owner-center {
  .xz-nva-bar {
    background: #4d79d8;
    box-shadow: none;
  }
  .xz-nva-bar .van-nav-bar__title,
  .xz-nva-bar .van-nav-bar__text {
    color: #fff;
  }
  .add-box {
    background: #4d79d8;
    padding: 70px 0;
    text-align: center;
    img {
      width: 80px;
      height: 80px;
    }
    p {
      color: #fff;
      font-size: 24px;
      padding: 36px 0 0 0;
    }
  }
  .nav-box {
    border-top: 14px solid #ebebeb;
  }
  .serve-item img {
    height: auto;
  }
  .user-info {
    border-top: 30px solid #f0f0f0;
    .title-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 28px 25px 28px 45px;
      border-bottom: 1px solid #eee;
      .user-title {
        display: flex;
        align-items: center;
        font-size: 32px;
        color: #000;
        img {
          width: 36px;
          height: 31px;
          margin-right: 15px;
        }
      }
      .user-text {
        display: flex;
        align-items: center;
        font-size: 24px;
        color: #999;
        img {
          width: 29px;
          height: 28px;
          margin-right: 25px;
        }
      }
    }
    .user-info-item {
      display: flex;
      padding: 25px 0;
      border-bottom: 1px solid #eee;
      .van-cell {
        padding-left: 0;
        padding-right: 0;
      }
      .user-info-item-box {
        flex: 1;
        border-right: 1px solid #eee;
        padding: 0 45px;
        &.flex {
          display: flex;
          align-items: center;
        }
        &:last-child {
          border: 0;
        }
        .title {
          color: #999;
          font-size: 24px;
        }
        .text {
          color: #333;
          font-size: 30px;
          padding: 10px 0 0 0;
        }
      }
    }
    .no-info {
      text-align: center;
      padding: 110px 0;
      color: #999;
      font-size: 36px;
    }
  }

  .van-picker__cancel,
  .van-picker__confirm {
    line-height: 80px;
  }

  .van-picker__toolbar {
    line-height: 80px !important;
    height: 80px !important;
    font-size: 44px;
  }
  .car-num-box {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: #999;
    font-size: 24px;
    img {
      flex-shrink: 0;
      width: 23px;
      height: 14px;
      margin: 0 10px;
    }
  }

  .car-swiper {
    .van-swipe-item {
      background: #4d79d8;
      padding: 35px 85px;
      img {
        width: 70px;
        height: 70px;
      }
      > div {
        display: flex;
        align-items: center;
        background: #fff;
        border-radius: 10px;
        padding: 45px 35px;
        justify-content: space-between;
        > div {
          > div {
            display: flex;
            align-items: center;
            p {
              color: #333;
              font-size: 36px;
            }
            i {
              color: #fff;
              font-size: 16px;
              font-style: normal;
              background: #272727;
              padding: 4px 5px;
              align-self: center;
              word-break: break-all;
              border-radius: 5px;
              margin-left: 5px;
            }
          }
          .time {
            color: #333;
            font-size: 20px;
            padding: 15px 0 0 0;
          }
        }
      }
    }
  }
}
</style>