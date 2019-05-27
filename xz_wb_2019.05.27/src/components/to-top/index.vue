<template>
    <div class="to-top" @click="go_top">
        <xz-icon type="top"/>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods: {
        go_top() {
            //设置定时器
            var isTop = false;
            var timer = setInterval(function() {
                //获取滚动条距离顶部的高度
                var osTop =
                    document.documentElement.scrollTop ||
                    document.body.scrollTop; 

                //减小的速度
                var isSpeed = Math.floor(-osTop / 6);
                document.documentElement.scrollTop = document.body.scrollTop =
                    osTop + isSpeed;
                isTop = true;
                //判断，然后清除定时器
                if (osTop == 0) {
                    clearInterval(timer);
                }
            }, 30);
        }
    }
};
</script>
<style lang="scss">
.to-top {
    width: 80px;
    height: 80px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 120px;
    right: 15px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 10px 10px;
    border-radius: 10px;
    .xz-icon {
        font-size: 40px;
    }
}
</style>