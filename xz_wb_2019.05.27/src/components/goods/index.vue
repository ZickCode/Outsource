<template>
    <div class="xz-model popup-model">
        <div class="popup-hd" v-if="!isShowHd">
            <xz-icon type="guanbi" @click="handleClickClose(clickFlag)" />
            <h4 class="title">{{title}}</h4>
        </div>
        <slot v-else name="title"></slot>
        <div class="popup-ftr" v-if="isShowBtn">
        	<van-button type="danger" :class="{'btn-dis':disabled}" :disabled="disabled" @click="handleClickBottomBtn">{{btnName}}</van-button>
        </div>
		<slot name="footer"></slot>
        <div class="popup-bd">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name:'popupModel',
        props: {
            title:{
                type: String,
            },
            btnName:{
                type: String,
            },
            isShowBtn:{
                type: Boolean,
                default: true,
            },
            isShowHd:{
                type: Boolean,
                default: false,
            },
            clickFlag:{
                type:Boolean,
                default:true
            },
			clickType: { // 点击的类型，根据此类型做逻辑判断是点击什么按钮，如立即购买的type为buy，加入购物车的type 为addCart 等等
				type: String,
				default: ''
            },
            disabled:{
                type:Boolean,
                default:false
            },
            sku_id:{
                type:String,
                default:()=>{
                    return ''
                }
            },
            sku_info:{
                type:Object,
                default:()=>{
                    return {}
                }
            }
        },
        data() {
            return {
                
            };
        },
        methods: {
            handleClickClose(clickFlag){
                if(clickFlag){
                    clickFlag = !clickFlag
                    this.$emit('addClose',clickFlag);
                }
            },
            handleClickBottomBtn(){ // 点击底部固定按钮事件,clickType为点击的type，可以更加该type做做逻辑功能，比如点击的是立即购买还是加入购物车               
                this.$emit('clickBottomBtn',this.clickType,this.sku_id,this.sku_info);
                //this.$emit('clickBottomBtn',this.sku_id);
			}
        }
    };
</script>