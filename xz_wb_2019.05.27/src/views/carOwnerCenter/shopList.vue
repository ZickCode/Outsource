<template>
  <div class="user-main car-shop-list">
    <van-nav-bar
      class="xz-nva-bar"
      fixed
      title="店铺"
      @click-left="go_back"
      left-arrow
    />
    <div class="top-filter">
        <div class="top-filter-item" @click="SwitchArea">
            <span>{{areaName}}</span>            
            <img src="../../assets/images/carOwnerCenter/icon-arrow-down.png" alt="">
        </div>
        <div class="top-filter-item">
            <span>全部门店</span>            
            <img src="../../assets/images/carOwnerCenter/icon-arrow-down.png" alt="">
        </div>
        <div class="top-filter-item area">距离</div>
    </div>
    <div class="shop-list">
        <a class="shop-item" v-for="(item, index) in shopList" @click="GoToDetail(item)">
            <img :src="util.reImg(item.img_list[0])" alt="">
            <div class="info">
                <div class="name-box">
                    <div class="name">{{item.name}}</div>
                    <i class="tag" :style="[item.type == '维修店' ? {'background': '#4d79d8'} : '', item.type == '维修厂' ? {'background': '#ed376f'} : '']">{{item.type}}</i>
                </div>
                <div class="time-box">
                    <p class="time">{{item.open_time}}</p>
                    <p class="range" v-if="item.range == '未查到距离'">{{item.range}}</p>
                    <p class="range" v-else>距离:{{item.range}}</p>
                </div>
                <div class="address">
                    {{item.province+item.city+item.county+item.address}}
                </div>
            </div>
        </a>
    </div>    
    <van-popup v-model="showPopup" position="bottom">
      <van-picker :columns="columnsList" show-toolbar @confirm="onConfirm" @cancel="onCancel" @change="onChange"/>
    </van-popup>
  </div>
</template>
<script>
import {
  Picker,
  Popup
} from "vant";
export default {
  data() {
    return {
      shopList: [],
      areaList: [],
      areaName: '北京',
      areaId: '',
      columnsList: [],
      showPopup: false
    };
  },
  created() {},
  mounted() {
    this.loadData();
  },
  methods: {
    onConfirm(value, index) {
      this.areaId = this.areaList[index].id;
      this.areaName = this.areaList[index].name;
      this.loadData();
      this.showPopup = false;
    },
    onCancel() {
      this.showPopup = false;
    },
    onChange(index) {
      this.currentIndex = index;
    },
    loadData() {
      let _this = this;
      let _loading = _this.$xzLoading();
      _this.post(
        {
          method: "api.module.goods.shop.lists",
          limit: 30,
          page: 1,
          province_id: this.areaId
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
              _this.$set(_this, 'shopList', data.result.lists)
          }
          _loading.clear();
        }
      );
    },
    GoToDetail(item) {
      this.$router.push({
        name: 'shopDetail',
        params: {...item}
      })
    },
    SwitchArea() {
      let _loading = this.$xzLoading();
      this.post(
        {
          method: "api.module.admin.district.get",
          id: 100000
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
            let _arr = [],
                _columnsList = [];
            data.result.map((item)=>{
              _arr.push({
                id: item.id,
                name: item.name
              })
              _columnsList.push(item.name)
            })
            this.areaList = _arr;
            this.$set(this, 'columnsList', _columnsList);
            this.showPopup = true;
          }
          _loading.clear();
        }
      );
    }
  },
  components: {
    "van-picker": Picker,
    "van-popup": Popup
  },
  computed: {

  }
};
</script>
<style lang="less">
.car-shop-list {
    .top-filter{
        display: flex;
        padding: 30px 0;
        font-size: 24px;
        color: #333;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        .top-filter-item{
            padding: 0 40px;
            &.area{
                flex: 1;
                text-align: right;
            }
        }
        img{
            width: 20px;
            margin-left: 10px;
        }
    }
    .shop-list{
        .shop-item{
            display: flex;
            padding: 30px;
            border-bottom: 1px solid #eee;
            color: #333;
            font-size: 22px;
            img{
                flex-shrink: 0;
                width: 160px;
                height: 160px;
            }
            .info{
                flex: 1;
                padding-left: 40px;
                width: 490px;
                .name-box{
                    display: flex;
                    align-items: center;    
                    padding: 5px 0 20px 0;                
                    .name{
                        flex: 1;
                        font-size: 32px;
                        color: #333;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        font-weight: bold;
                        padding-right: 20px;
                    }
                    .tag{
                        font-style: normal;
                        font-size: 18px;
                        color: #fff;
                        padding: 10px 20px;
                        background: #ff9600;
                        border-radius: 8px;
                    }
                }
                .time-box{
                    display: flex;
                    justify-content: space-between;
                    .time{                        
                        flex: 1;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        padding-right: 20px;
                    }
                    .range{
                        flex-shrink: 0;
                        color: #f03453;
                        font-size: 20px;
                    }
                }
                .address{
                    width: 490px;
                    padding: 10px 0 0 0;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }
    }
}
.van-picker__toolbar {
    line-height: 80px !important;
    height: 80px !important;
    font-size: 44px;
}
</style>