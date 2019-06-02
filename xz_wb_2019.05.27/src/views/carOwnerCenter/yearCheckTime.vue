<template>
  <div class="user-main gray">
    <van-nav-bar @click-left="go_back" class="xz-nva-bar" left-arrow fixed title="年检服务"/>
    <div class="judge">
      <!--车辆信息-->
      <div class="carInfos" v-if="carData">
        <div class="carInfos-title">
          <div class="carInfos-icon">
            <img :src="util.reImg(carData.brand.thumb)" alt>
          </div>
          <div class="carInfos-info">
            <h3>{{carData.name.name}}</h3>
            <p>{{carData.year.name}} {{GetDate(carData.name.create_time)}}年产</p>
          </div>
          <a class="carInfos-btn" href="#/carOwnerCenter/myGarage">
            <img src="../../assets/images/common/icon7-1.png" alt>换车
          </a>
        </div>
      </div>
      <!--车辆信息-->

      <!--倒计时-->
      <div class="carInfos-time" v-if="dataInfo">
        <div class="box">
          <div class="num">
            <span>{{dataInfo.days}}</span>天
          </div>
          <p>距下次年检开始还有</p>
          <a href>年检未开始</a>
        </div>
      </div>
      <!--倒计时-->

      <div class="carInfos-notice" v-if="dataInfo">
        <p>您的爱车未到年检日期</p>
        <p>年检日期为{{dataInfo.start_date}}到{{dataInfo.end_date}}</p>
        <p>记得按时办理年检哦！</p>
      </div>

      <div v-if="dataInfo && dataInfo.can == 0" class="item-btn" @click="go_back">返回修改信息</div>
      <div v-if="dataInfo && dataInfo.can == 1" class="item-btn" @click="goHandle">立即办理</div>
      <div class="carInfos-tag">
        常见问题
        <van-icon name="question-o" color="#666666"/>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Icon
} from "vant";
export default {
  data() {
    return {
      show: false,
      showcar: false,
      minDate: new Date(),
      currentDate: new Date(),
      columns: ["京", "津", "冀", "晋", "蒙", "辽", "吉", "黑", "沪", "苏", "浙", "皖", "闽", "赣", "鲁", "豫", "鄂", "湘", "粤", "桂", "琼", "渝", "川", "贵", "云", "藏", "陕", "甘", "新"],
      forms: {
        cartype: "渝",
        carid: "",
        phone: "",
        dates: ""
      },
      dataInfo: null,
      carData: null
    };
  },
  mounted() {
    this.carData = this.$route.params.carData;
    this.getData(this.$route.params.id);
  },
  methods: {
    getData(id){
      let _this = this;
      let _loading = _this.$xzLoading();
      _this.post(
        {
          method: "api.module.goods.inspect.info",
          car_id: id
        },
        (data) => {
          if (data.code == 200) {
            this.dataInfo = data.result; 
          }
          _loading.clear();
        }
      );
    },    
    GetDate(time) {
      let date = new Date(time*1000);
      let Y = date.getFullYear() + "-";
          // M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-",
          // D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ",
          // h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":",
          // m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":",
          // s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y;
    },
    goHandle() {
      this.$router.push({name: 'yearCheckOrder', params: {dataInfo: this.dataInfo}})
    }
  },
  components: {
    "van-icon": Icon
  },
  computed: {}
};
</script>
<style lang="scss">
.carInfos-tag {
  text-align: right;
  font-size: 22px;
  color: #666666;
  margin: 33px;
  .van-icon{
    display: inline-block;vertical-align: middle;margin-top: -2px;
    font-size: 24px;
  }
}
.carInfos-notice {
  text-align: center;
  margin: 55px 0px 74px 0px;
  p {
    font-size: 24px;
    color: #333333;
    line-height: 36px;
    font-weight: 500;
  }
}
.showcar-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ebedf0;
  div {
    font-size: 30px;
    color: #1989fa;
    padding: 25px 30px;
  }
}
.carInfos-time {
  width: 587px;
  height: 587px;
  display: block;
  margin: 40px auto;
  background: url(../../assets/images/common/time.png) no-repeat center center;
  background-size: cover;
  position: relative;
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    text-align: center;
    .num {
      font-size: 26px;
      color: #666666;
      span {
        font-family: Arial, Helvetica, sans-serif;
        color: #27a2f1;
        font-size: 112px;
        font-weight: 600;
        margin-right: 20px;
      }
    }
    p {
      font-size: 26px;
      color: #666666;
    }
    a {
      display: inline-block;
      color: #1391e2;
      background: #9fd8fc;
      border: 1px solid #27a2f1;
      padding: 4px 19px;
      text-align: center;
      border-radius: 17px;
      font-size: 22px;
      margin-top: 17px;
    }
  }
}
.carInfos {
  background: #eaf5ff;
  .carInfos-title {
    padding: 42px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .carInfos-icon {
      width: 110px;
      text-align: right;
      img {
        display: inline-block;
        height: 80px;
        width: 80px;
        border-radius: 50%;
        border: 10px solid #fff;
        vertical-align: middle;
      }
    }
    .carInfos-info {
      width: 66%;
      color: #333333;
      h3 {
        font-size: 30px;
        font-weight: 500;
      }
      p {
        font-size: 22px;
      }
    }
    .carInfos-btn {
      color: #467ed1;
      font-size: 26px;
      img {
        width: 25px;
        height: 25px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 11px;
      }
    }
  }
}
.item-btn {
  display: block;
  height: 88px;
  text-align: center;
  line-height: 88px;
  color: #fff;
  background: #557eda;
  font-size: 30px;
  border-radius: 13px;
  margin: 33px 30px 23px 30px;
}
</style>
