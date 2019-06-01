<template>
  <div class="user-main car-shop-detail" v-if="itemData">
    <van-nav-bar
      class="xz-nva-bar"
      fixed
      title="店铺详情"
      @click-left="go_back"
      left-arrow
    />
    <div class="info-box">
        <img v-if="itemData.img_list" :src="sourceUrl+itemData.img_list[0]" />
        <div class="info">
            <div class="name">{{itemData.name}}</div>
            <div class="status-box">
                <i>营业中</i>
                <i class="range">{{itemData.range}}</i>
            </div>
            <div>营业时间：</div>
            <div>{{itemData.open_time}}</div>
        </div>
    </div>
    <div class="tel-box">
        <div class="title">
            <i></i>
            <span>联系电话</span>
        </div>
        <span>{{itemData.tel}}</span>
    </div>
    <div class="address-box">
        <div class="title">
            <i></i>
            <span>门店地址</span>
        </div>
        <span>{{itemData.province + itemData.city + itemData.county + itemData.address}}</span>
    </div>
    <div class="ui-item">
        <div class="ui-item-title">门店介绍</div>
        <div class="ui-item-content">{{itemData.items}}</div>
    </div>
    <div class="ui-item">
        <div class="ui-item-title">门店照片</div>
        <div class="ui-item-content">
            <template v-for="item in itemData.img_list">
                <img :src="sourceUrl+item" />
            </template>
        </div>
    </div>
    <div class="ui-item">
        <div class="ui-item-title">交通提示</div>
        <div class="ui-item-content">{{itemData.range_info}}</div>
    </div>
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
      itemData: null
    };
  },
  created() {
    
  },
  mounted() {
      this.itemData = this.$route.params;
  },
  methods: {
    onChange(index) {
      this.currentIndex = index;
    },
  },
  components: {

  },
  computed: {
      
  }
};
</script>
<style lang="less" scoped>
.car-shop-detail {
    .info-box{
        display: flex;
        padding: 30px;
        border-bottom: 20px solid #f0f0f0;
        img{
            flex-shrink: 0;
            width: 200px;
            height: 200px;
            margin: 0 30px 0 0;
        }
        .info{
            width: 460px;
            flex: 1;
            font-size: 20px;
            color: #333;
            .name{
                font-size: 28px;
                font-weight: bold;
                color: #333;
                padding: 20px 0;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .status-box{
                padding: 0 0 20px 0;
                i{
                    font-style: normal;
                    font-size: 16px;
                    padding: 5px 20px;
                    line-height: 1;
                    border-radius: 26px;
                    background: #e4393c;
                    color: #fff;
                    margin: 0 30px 0 0;
                    &.range{
                        background: #ff9600;
                    }
                }
            }
        }
    }
    .tel-box{
        display: flex;
        justify-content: space-between;
        padding: 30px;
        border-bottom: 2px dashed #f0f0f0;
        .title{
            display: flex;
            align-items: center;
            i{
                width: 24px;
                height: 21px;
                background: url('../../assets/images/carOwnerCenter/icon-tel.png') 0 0;
                background-size: 100% 100%;
                margin-right: 10px;
            }
        }
    }
    .address-box{
        padding: 30px;
        border-bottom: 2px dashed #f0f0f0;
        .title{
            display: flex;
            align-items: center;
            padding: 0 0 30px 0;
            i{
                width: 24px;
                height: 24px;
                background: url('../../assets/images/carOwnerCenter/icon-address.png') 0 0;
                background-size: 100% 100%;
                margin-right: 10px;
            }
        }
    }
    .ui-item{
        font-size: 24px;
        color: #333;
        border-bottom: 20px solid #f0f0f0;
        .ui-item-title{
            padding: 30px;
            border-bottom: 2px solid #f0f0f0;
        }
        .ui-item-content{
            display: flex;
            padding: 30px;
            line-height: 1.5;
            overflow: hidden;
            overflow-x: auto;
            img{
                width: 200px;
                height: 200px;
                margin-right: 30px;
            }
        }
    }
}
</style>