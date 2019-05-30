<template>
  <div class="user-main">
    <van-nav-bar @click-left="go_back" class="xz-nva-bar" left-arrow fixed title="全国油价"/>
    <div class="judge">
      <div class="chose-city">
        <a href="#/carOwnerCenter/chooseArea">
          城市：{{city}}
          <img src="../../assets/images/common/icon2.png" alt>
        </a>
      </div>
      <div class="price">
        <div class="time">
          <h3>今日油价</h3>
          <p>2019-04-15</p>
        </div>
        <ul class="price-list">
          <li class="title">
            <div>汽油</div>
            <div>价格（元/升）</div>
          </li>
          <li v-for="(item,index) in price" :key="index">
            <div class="price-list-name">{{item.name}}</div>
            <div class="price-list-price">{{item.val}}</div>
          </li>
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
      city: "",
      price: [
        { name: "89号汽油", val: "8.42" },
        { name: "92号汽油", val: "7.13" },
        { name: "95号汽油", val: "7.59" },
        { name: "0号柴油", val: "6.79" }
      ]
    };
  },
  created() {
    if (this.$route.params.name) {
      this.city = this.$route.params.name;
    }
  },
  methods: {},
  components: {
    vanTabbar: Tabbar,
    vanTabbarItem: TabbarItem,
    vanCell: Cell
  },
  computed: {}
};
</script>
<style lang="scss">
.chose-city {
  padding: 36px 41px 36px 31px;
  a {
    font-size: 28px;
    color: #6d6d6d;
    img {
      width: 24px;
      height: 13px;
      display: inline-block;
      vertical-align: middle;
      float: right;
      margin-top: 13px;
    }
  }
}
.price {
  border-top: 29px solid #f0f0f0;
  background: #fff;
  .time {
    padding: 51px 0px 49px 0px;
    text-align: center;
    h3 {
      font-size: 36px;
      color: #333333;
      margin-bottom: 22px;
      font-weight: 600;
    }
    p {
      font-size: 24px;
      color: #999999;
    }
  }
  .price-list {
    .title {
      border-top: 1px solid #ebebeb;
      border-bottom: 1px solid #ebebeb;
      background: #fafafa;
      font-size: 32px;
      color: #666666;
      padding: 30px 0px;
      div {
        display: inline-block;
        width: 50%;
        text-align: center;
        font-weight: 600;
      }
      &::before {
        content: "";
        display: none;
      }
    }
    li {
      padding: 36px 0px;
      position: relative;
      div {
        display: inline-block;
        text-align: center;
        width: 50%;
      }
      .price-list-name {
        font-size: 30px;
        color: #666666;
      }
      .price-list-price {
        font-size: 38px;
        color: #ee4923;
        font-weight: 600;
      }
      &::before {
        content: "";
        height: 1px;
        width: calc(100% - 80px);
        background: #ebebeb;
        position: absolute;
        bottom: 0px;
        margin: auto;
        left: 0px;
        right: 0px;
      }
    }
  }
}
</style>
