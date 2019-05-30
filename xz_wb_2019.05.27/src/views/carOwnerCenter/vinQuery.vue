<template>
  <div class="user-main">
    <van-nav-bar @click-left="go_back" class="xz-nva-bar" left-arrow fixed title="VIN码查询"/>
    <div class="judge">
      <div class="vin-search">
        <input type="text" name id placeholder="输入车架号 获取保险车辆列表">
        <div class="vin-search-btn">
          <img src="../../assets/images/common/icon.png" alt>
        </div>
      </div>
      <div class="idcard">
        车架号
        <p>LJDKAA24123456789</p>
      </div>
      <ul class="vin-list">
        <li>
          <div class="vin-list-name">车型代码</div>
          <div class="vin-list-val">{{info.carid}}</div>
        </li>
        <li>
          <div class="vin-list-name">品牌名称</div>
          <div class="vin-list-val">{{info.carpp}}</div>
        </li>
        <li>
          <div class="vin-list-name">产地</div>
          <div class="vin-list-val">{{info.carplce}}</div>
        </li>
        <li>
          <div class="vin-list-name">检验标准</div>
          <div class="vin-list-val">{{info.carbz}}</div>
        </li>
        <li>
          <div class="vin-list-name">车系名称</div>
          <div class="vin-list-val">{{info.carmc}}</div>
        </li>
        <li>
          <div class="vin-list-name">车组名称</div>
          <div class="vin-list-val">{{info.carmcs}}</div>
        </li>
        <li>
          <div class="vin-list-name">车型名称</div>
          <div class="vin-list-val">{{info.carcx}}</div>
        </li>
        <li>
          <div class="vin-list-name">排量</div>
          <div class="vin-list-val">{{info.carpl}}</div>
        </li>
        <li>
          <div class="vin-list-name">发动机型号</div>
          <div class="vin-list-val">{{info.carfdj}}</div>
        </li>
        <li>
          <div class="vin-list-name">上市年份</div>
          <div class="vin-list-val">{{info.cartime}}</div>
        </li>
        <li>
          <div class="vin-list-name">变速箱类型</div>
          <div class="vin-list-val">{{info.carbsx}}</div>
        </li>
        <li>
          <div class="vin-list-name">驱动形式</div>
          <div class="vin-list-val">{{info.carqd}}</div>
        </li>
        <li>
          <div class="vin-list-name">车身颜色</div>
          <div class="vin-list-val">{{info.carys}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { NavBar, Tabbar, TabbarItem, Cell } from "vant";
export default {
  data() {
    return {
      info: {
        carid: "AP4028b28846094af3014621",
        carpp: "长安马自达",
        carplce: "合资",
        carbz: "CAM7150M5",
        carmc: "长安马自达3",
        carmcs: "昂克赛拉三厢(14/05-)",
        carcx:
          "2014款 长安马自达 长安马自达3 三厢 1.5L  手动档 舒适型 (CAM7150M5)",
        carpl: "1.496",
        carfdj: "长安福特马自达P5",
        cartime: "2015",
        carbsx: "手动档",
        carqd: "前置前驱",
        carys: "白色"
      }
    };
  },
  created() {},
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
.vin-search {
  padding: 30px 44px 21px 43px;
  border-bottom: 1px solid #dadada;
  input {
    width: 600px;
    height: 70px;
    border-radius: 35px;
    background: #f3f3f3;
    border: 1px solid #e7e7e7;
    font-size: 28px;
    padding: 0px 33px;
  }
  .vin-search-btn {
    width: 45px;
    height: 70px;
    line-height: 70px;
    float: right;
    text-align: center;
    img {
      display: inline-block;
      vertical-align: middle;
      width: 45px;
      height: 44px;
    }
  }
}
.vin-list {
  border-top: 29px solid #f0f0f0;
  li {
    border-top: 1px solid #dadada;
    overflow: hidden;
    padding: 33px 0px;
    .vin-list-name {
      float: left;
      width: 200px;
      padding-left: 43px;
      font-size: 24px;
      color: #999999;
      box-sizing: content-box;
    }
    .vin-list-val {
      width: 480px;
      float: left;
      color: #333333;
      font-size: 24px;
      padding-right: 69px;
    }
  }
}
.idcard {
  font-size: 30px;
  color: #999999;
  padding: 43px;
  background: #fff;
    font-weight: 600;
  p {
    color: #333333;
    font-size: 34px;
    margin-top: 14px;
    font-weight: 600
  }
}
</style>
