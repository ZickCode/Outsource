<template>
  <div class="user-main gray">
    <van-nav-bar @click-left="go_back" class="xz-nva-bar" left-arrow fixed title="年检信息"/>
    <div class="judge">
      <!--车辆信息-->
      <div class="carInfos">
        <div class="carInfos-title" v-if="carData.name && carData.year">
          <div class="carInfos-icon">
            <img :src="util.reImg(carData.brand.thumb)" alt>
          </div>
          <div class="carInfos-info">
            <h3>{{carData.name.name}}</h3>
            <p>{{carData.year.name}} {{GetDate(carData.name.create_time)}}年产</p>
          </div>
          <a class="carInfos-btn" href="#/carOwnerCenter/myGarage">
            <img src="../../assets/images/common/icon7.png" alt>换车
          </a>
        </div>
        <div class="carInfos-form">
          <div class="title">免上线年检</div>
          <div class="form-group">
            <div class="item">
              <div class="lable">车牌号</div>
              <div class="input">
                <div class="cartype" @click="showcar = true">{{forms.cartype}}</div>
                <input type="text" v-model="forms.carid" placeholder="请输入">
              </div>
            </div>
            <div class="item">
              <div class="lable">手机号</div>
              <div class="input">
                <input type="text" v-model="forms.phone" placeholder="请输入">
              </div>
            </div>
            <div class="item">
              <div class="lable">注册日期</div>
              <div class="input">
                <input
                  type="text"
                  v-model="forms.dates"
                  readonly
                  placeholder="请选择注册日期"
                  @click="show = true"
                >
              </div>
            </div>
            <div class="item-btn" @click="submit">确定</div>
            <a class="item-txt" href="#">
              <img src="../../assets/images/common/icon9.png" alt>车辆违章查询
            </a>
          </div>
        </div>
      </div>
      <!--车辆信息-->

      <!--办理条件-->
      <div class="term">
        <div class="carInfos-name">
          办理条件
          <div class="icon"></div>
        </div>
        <p>车辆注册日期在5年内、六座（）含及以下非运营车辆交通违章或交通事故需处理完毕</p>
        <p>交强险保单在有效期范围内</p>
        <p>五年以上车辆、面包车、七座以上车辆需上线年检</p>
        <p>年检可提前两个月办理</p>
      </div>
      <!--办理条件-->

      <!--办理流程-->
      <div class="terms">
        <div class="carInfos-name">
          办理流程
          <div class="icon"></div>
        </div>
        <img src="../../assets/images/common/lc.png" alt>
      </div>

      <!--办理流程-->
    </div>

    <!--时间弹窗-->
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        @change="change"
        @confirm="confirm"
        @cancel="cancel"
      />
    </van-popup>
    <!--时间弹窗-->
    <van-popup v-model="showcar" position="bottom">
      <div class="showcar-btn">
        <div @click="showcarCancel">取消</div>
        <div @click="showcar = false">确定</div>
      </div>
      <van-picker :columns="columns" @change="onChange"/>
    </van-popup>
    <!--时间弹窗-->
  </div>
</template>
<script>
import {
  DatetimePicker,
  Popup,
  Picker
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
        car_id: '',
        cartype: "渝",
        carid: "",
        phone: "",
        dates: ""
      },
      carData: {}
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      let _loading = this.$xzLoading();
      this.post(
        {
          method: "api.module.member.car.mycars"
        },
        (data) => {
          if (200 !== data.code) {
            this.$toast({
              message: data.msg,
              position: "bottom"
            });
            return;
          }
          if (data.result != null) {
            this.$set(this, "carData", data.result[1].info);
            this.forms.car_id = data.result[1].info.car.id;
          }
          _loading.clear();
        }
      );
    },
    submit() {
      if (this.forms.carid) {
        if (this.forms.phone) {
          if (this.forms.dates) {
            this.post({
                method: "api.module.goods.inspect.add",
                car_id: this.forms.car_id,
                license_plate: this.forms.cartype+this.forms.carid,
                phone: this.forms.phone,
                reg_time: this.forms.dates,
            },
            (data) => {
                if (200 !== data.code) {
                    this.$toast({
                        message: data.msg,
                        position: "bottom"
                    });
                    return;
                }
                if (data.result != null) {
                    this.$router.push({name: 'yearCheckTime', params: {id: this.forms.car_id, carData: this.carData}})
                }
            });
          } else {
            this.$toast("请选择日期");
          }
        } else {
          this.$toast("请输入手机号");
        }
      } else {
        this.$toast("请输入车牌号");
      }
    },
    onChange(picker, value) {
      this.forms.cartype = value;
    },
    change(e) {
      this.forms.dates = e.getValues().join("-");
    },
    showcarCancel() {
      this.showcar = false;
      this.forms.cartype = "渝";
    },
    confirm() {
      if(!this.forms.dates){
        this.forms.dates = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate();
      }
      this.show = false;
    },
    cancel() {
      this.show = false;
      this.forms.dates = "";
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
    }
  },
  components: {
    "van-datetime-picker": DatetimePicker,
    "van-popup": Popup,
    "van-picker": Picker
  },
  computed: {}
};
</script>
<style lang="scss">
.carInfos-name {
  font-size: 30px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 23px;
  .icon {
    display: inline-block;
    vertical-align: middle;
    width: 121px;
    height: 24px;
    background: url(../../assets/images/common/icon11.png) no-repeat top center;
    background-size: cover;
    margin-top: -5px;
    margin-left: 26px;
  }
}
.term {
  background: #f0f1f3;
  margin: 24px;
  border-radius: 11px;
  padding: 38px 37px;
  p {
    font-size: 24px;
    color: #666666;
    position: relative;
    padding-left: 30px;
    line-height: 52px;
    &::before {
      content: "";
      width: 11px;
      height: 11px;
      background: #d3d3d3;
      border-radius: 50%;
      position: absolute;
      left: 0px;
      top: 19px;
    }
  }
}
.terms {
  background: transparent;
  margin: 24px;
  border-radius: 11px;
  padding: 38px 37px;
  img {
    display: inline-block;
    width: 100%;
    margin-top: 35px;
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
.carInfos {
  background: url(../../assets/images/common/bg.png) no-repeat top center;
  background-size: contain;
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
      color: #fff;
      h3 {
        font-size: 30px;
        font-weight: 500;
      }
      p {
        font-size: 22px;
      }
    }
    .carInfos-btn {
      color: #fff;
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
  .carInfos-form {
    background: #fff;
    margin: 0px 30px;
    border-radius: 11px;
    box-shadow: 0px 6px 24px rgba(44, 44, 44, 0.15);
    overflow: hidden;
    .title {
      font-size: 30px;
      color: #467ed1;
      text-align: center;
      padding: 30px;
      font-weight: 600;
      border-bottom: 1px solid #e1e1e1;
    }
    .form-group {
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0px 30px;
        border-bottom: 1px solid #e1e1e1;
        .lable {
          width: 200px;
          font-size: 26px;
          color: #333333;
          padding: 35px 20px;
        }
        .input {
          flex: 1;
          .cartype {
            display: inline-block;
            font-size: 26px;
            color: #666666;
            padding-right: 27px;
            margin-right: 13px;
            background: url(../../assets/images/common/icon8.png) no-repeat
              right center;
            background-size: 15px 9px;
          }
          input {
            font-size: 26px;
            color: #666666;
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
      .item-txt {
        display: block;
        width: 230px;
        margin: 30px auto 51px auto;
        text-align: center;
        font-size: 24px;
        color: #557eda;
        line-height: 20px;
        background: url(../../assets/images/common/icon10.png) no-repeat right
          center;
        background-size: 11px 19px;
        img {
          width: 27px;
          height: 27px;
          display: inline-block;
          vertical-align: middle;
          margin-top: -2px;
          margin-right: 11px;
        }
      }
    }
  }
}
.van-picker__toolbar {
  padding: 25px 30px;
  height: auto;
  line-height: 1;
  .van-picker__cancel {
    font-size: 26px;
  }
  .van-picker__confirm {
    font-size: 26px;
  }
}
</style>
