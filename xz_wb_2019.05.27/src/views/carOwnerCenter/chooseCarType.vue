<template>
  <div class="user-main">
    <van-nav-bar @click-left="go_back" class="xz-nva-bar" left-arrow fixed title="自助选车"/>
    <div class="judge">
      <div class="carinfo">
        <img :src="util.reImg(carinfo.thumb)" alt>
        <span>{{carinfo.name && carinfo.name.substring(3)}}</span>
      </div>
      <div class="carmbx" v-if="first">
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
      <div class="car-chose" v-if="type == 1"> 
        <div class="title">选择发动机排量</div>
        <ul>
          <li v-for="(item,index) in carpl" :key="index" @click="pl(item)">{{item}}</li>
        </ul>
      </div>
      <div class="car-chose" v-if="type == 2"> 
        <div class="title">请选择生产年份</div>
        <ul>
          <li v-for="(item,index) in carnf" :key="index" @click="nf(item)">{{item}}</li>
        </ul>
      </div>
      <div class="car-chose" v-if="type == 3"> 
        <div class="title">请选择车型</div>
        <ul>
          <li v-for="(item,index) in cartype" :key="index" @click="cx(item)">{{item}}</li>
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
      carpl: ["2.0T", "3.6L"],
      carnf:['2009年产','2010年产','2011年产','2012年产'],
      cartype:['2010款 2.0T 风尚版','2010款 2.0T 豪华版'],
      first: "",
      second: "",
      three: "",
      type:1,
      id: null,
      carinfo:{
        id:'1',
        name:'',
        thumb:''
      }
    };
  },
  mounted() {
    this.id = this.$route.query.item;
    this.loadData(this.id);
  },
  methods: {
    goback(val){
      // console.log(val)
      if(val == 1){
        this.second =''
        this.three = ''
        this.type = 1
      }else if( val == 2){
        this.type = 2
        this.three = ''
      }
    },
    pl(val){
      // console.log(val)
      this.first = val
      this.type = 2
    },
    nf(val){
      // console.log(val)
      this.second = val
      this.type = 3
    },
    cx(val){
      // console.log(val)
      this.three = val
    },
    loadData(id) {
      let _loading = this.$xzLoading();
      this.post(
        {
          method: "api.module.member.car.typeinfo",
          id: id
        },
        (data) => {
          if (data.code == 200) {
            this.carinfo = data.result.brand;
            console.log(data.result)
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
