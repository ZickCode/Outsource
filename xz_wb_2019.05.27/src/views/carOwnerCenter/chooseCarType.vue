<template>
  <div class="user-main">
    <van-nav-bar @click-left="goback" class="xz-nva-bar" left-arrow fixed title="自助选车"/>
    <div class="judge">
      <div class="carinfo">
        <img :src="util.reImg(carinfo.thumb)" alt>
        <span>{{carinfo.name && carinfo.name.substring(3)}}</span>
      </div>
      <div class="carmbx" v-if="init">
        <div class="init" v-if="init" @click="goback('0')">
          {{init}}
          <img src="../../assets/images/common/icon4.png">
        </div>
        <div class="first" v-if="first" @click="goback('1')">
          {{first}}
          <img src="../../assets/images/common/icon4.png">
        </div>
        <div class="second" v-if="second" @click="goback('2')">
          {{second}}
          <img src="../../assets/images/common/icon4.png">
        </div>
        <div class="three" v-if="three">{{three}}</div>
      </div>
      <div class="car-chose" v-if="type == 0"> 
        <div class="title">选择车辆名称</div>
        <ul>
          <li v-for="(item,index) in carName" :key="index" @click="SetCarName(item)">{{item.name}}</li>
        </ul>
      </div>
      <div class="car-chose" v-if="type == 1"> 
        <div class="title">选择发动机排量</div>
        <ul>
          <li v-for="(item,index) in carpl" :key="index" @click="pl(item)">{{item.name}}</li>
        </ul>
      </div>
      <div class="car-chose" v-if="type == 2"> 
        <div class="title">请选择生产年份</div>
        <ul>
          <li v-for="(item,index) in carnf" :key="index" @click="nf(item)">{{item.name}}</li>
        </ul>
      </div>
      <div class="car-chose" v-if="type == 3"> 
        <div class="title">请选择车型</div>
        <ul>
          <li v-for="(item,index) in cartype" :key="index" @click="cx(item)">{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { NavBar, Tabbar, TabbarItem, Cell } from "vant";
export default {
  data() {
    return {
      carName: [],
      carpl: [],
      carnf:[],
      cartype:[],
      init: "",
      first: "",
      second: "",
      three: "",
      type:0,
      id: null,
      carId: '',
      carinfo:{
        id:'1',
        name:'',
        thumb:''
      }
    };
  },
  mounted() {
    this.carinfo = this.$route.params.item;
    this.loadData(this.$route.params.id);
  },
  methods: {
    goback(val){
      // console.log(val)
      if(this.type != 0){
        this.type--;
      }else{
        this.$router.go(-1);
      }
      // if(val == 1){
      //   this.second =''
      //   this.three = ''
      //   this.type = 1
      // }else if( val == 2){
      //   this.type = 2
      //   this.three = ''
      // }
    },
    SetCarName(val) {
      this.init = val.name;
      this.loadData(val.id);
      this.type = 1;
    },
    pl(val){
      // console.log(val)
      this.first = val.name;
      this.loadData(val.id);
      this.type = 2;
    },
    nf(val){
      // console.log(val)
      this.second = val.name;
      this.loadData(val.id);
      this.type = 3;
    },
    cx(val){
      this.three = val.name;

    },
    AddCar(id) {      
      let _loading = this.$xzLoading();
      this.post(
        {
          method: "api.module.member.car.addcar",
          id: id
        },
        (data) => {
          if (data.code == 200) {
            this.$toast({
              message: data.msg,
              position: "bottom"
            });
          }
          _loading.clear();
        }
      );
    },
    loadData(id) {
      let _loading = this.$xzLoading();
      this.post(
        {
          method: "api.module.member.car.types",
          pid: id
        },
        (data) => {
          if (data.code == 200) {
            if(this.type == 0){
              this.carName = data.result;
            }else if(this.type == 1){
              this.carpl = data.result;
            }else if(this.type == 2){
              this.carnf = data.result;
            }else if(this.type == 3){
              this.cartype = data.result;
            }
          }
          _loading.clear();
        }
      );
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
.carmbx {
  font-size: 24px;
  color: #333333;
  padding: 32px 40px;
  div {
    display: inline-block;
    img {
      width: 14px;
      height: 24px;
      display: inline-block;
      vertical-align: middle;
      margin: 0px 50px 0px 44px;
    }
  }
}
.carinfo {
  padding: 27px 40px;
  border-bottom: 1px solid #eee;
  img {
    width: 70px;
    height: 70px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 47px;
  }
  span {
    font-size: 30px;
    font-weight: 600;
    color: #000;
  }
}
.car-chose {
  .title {
    background: #f0f0f0;
    font-size: 24px;
    color: #000;
    padding: 19px 42px;
    letter-spacing: 2px;
  }
  ul {
    margin: 0px 30px;
    li {
      font-size: 24px;
      padding: 34px 14px;
      border-bottom: 1px solid #eeeeee;
    }
  }
}
</style>
