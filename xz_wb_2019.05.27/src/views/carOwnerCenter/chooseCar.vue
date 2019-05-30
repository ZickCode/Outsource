<template>
  <div class="user-main">
    <van-nav-bar @click-left="go_back" class="xz-nva-bar" left-arrow fixed title="我的车库"/>
    <div class="judge">
      <div class="scroller-hook">
        <div class="cities cities-hook">
          <div v-for="(i,index) in cityData" :key="index">
            <div class="title" ref="tit">{{i.name}}</div>
            <ul>
              <li
                v-for="(item,indexs) in i.list"
                :key="indexs"
                @click="choseCar(item.id)"
                class="item city-click"
                :data-name="item.name"
                :data-id="item.code"
              >
                <img :src="util.reImg(item.thumb)" alt>
                <span class="name">{{item.name.substring(3)}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="shortcut-hook">
        <ul class="city-nav" @click="touchIndex">
          <li
            v-for="(i,index) in cityData"
            :key="index"
            :data-anchor="i.name"
            class="item"
          >{{i.name.substr(0, 1)}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import cityData from "../../assets/css/city.js";
import { NavBar, Tabbar, TabbarItem, Cell } from "vant";
export default {
  data() {
    return {
      cityData: [],
      anchorMap: {}
    };
  },
  created() {
    let _this = this;
    let _loading = _this.$xzLoading();
    _this.post(
      {
        method: "api.module.member.car.brands"
      },
      function(data) {
        if (data.code == 200) {
          _this.cityData = data.result;
        }
        _loading.clear();
      }
    );
  },
  methods: {
    choseCar(val) {
      this.$router.push({
        name: "chooseCarType",
        query: {
          item: val
        }
      });
    },
    touchIndex: function(e) {
      let index = e.target.getAttribute("data-anchor");
      this.$refs.tit.forEach(item => {
        if (index == item.innerHTML) {
          document.documentElement.scrollTop = item.offsetTop - 40;
        } else {
        }
      });
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
.cities {
  .title {
    background: #f0f0f0;
    font-size: 28px;
    color: #4d79d8;
    padding: 25px 40px;
    font-weight: 500;
  }
  ul {
    li {
      margin: 0px 31px;
      border-bottom: 1px solid #e5e5e5;
      padding: 30px 0px;
      img {
        height: 70px;
        width: 70px;
        display: inline-block;
        vertical-align: middle;margin-right: 30px;
      }
      span {
        font-size: 28px;
        color: #666666;
      }
      &:last-child {
        border: 0px;
      }
    }
  }
}
.city-nav {
  position: fixed;
  top: 182px;
  right: 32px;
  li {
    color: #333333;
    font-size: 24px;
    text-align: center;
    margin-bottom: 5px;
  }
}
</style>
