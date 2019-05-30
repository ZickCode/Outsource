<template>
  <div class="user-main">
    <van-nav-bar @click-left="go_back" class="xz-nva-bar" left-arrow fixed title="选择地区"/>
    <div class="judge">
      <div class="scroller-hook">
        <div class="cities cities-hook">
          <div v-for="(i,index) in cityData" :key="index">
            <div class="title" ref="tit">{{i.name}}</div>
            <ul>
              <li
                v-for="(item,indexs) in i.cities"
                :key="indexs"
                @click="choseCity(item.name)"
                class="item city-click"
                :data-name="item.name"
                :data-id="item.code"
              >
                <span class="name">{{item.name}}</span>
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
      cityData: cityData,
      anchorMap: {}
    };
  },
  created() {
    
    let _this = this;
    let _loading = _this.$xzLoading();
    _this.post(
      {
        method: "api.module.admin.district.get",
        id:100000
      },
      function(data) {
        console.log(data)
        if (data.code == 200) {
        }
        _loading.clear();
      }
    );
  },
  methods: {
    choseCity(val) {
      this.$router.push({
          name: 'oilPrice',
          params: {
            name: val
          }
        })
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
