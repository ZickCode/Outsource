<template>
    <div class="xz-loading" :style="{display:isShow?'block':'none'}">
        <div class="xz-loading-mask"></div>
        <div class="loading-content">
            <div class="xz-loading-tran">
                <svg viewBox="25 25 50 50" class="circular">
                    <circle cx="50" cy="50" r="20" fill="none"></circle>
                </svg>
            </div>
            <span>{{message}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        message: "",
        isShow: true
    },
    data() {
        return {};
    },
    methods: {
        clear() {
            this.isShow = false;
        }
    }
};
</script>
<style lang="scss">
.xz-loading {
    .xz-loading-mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 9999;
    }
    .loading-content {
        display: flex;
        display:-webkit-flex;
        align-items: center;
        flex-flow: column;
        position: fixed;
        left: 50%;
        top: 50%;
        padding: 20px;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        z-index: 10000;
        -webkit-transform: translate3d(-50%, -50%, 0);
        transform: translate3d(-50%, -50%, 0);
        text-align: center;
        border-radius: 10px;
        font-size: 0;
        .xz-loading-tran {
            width: 60px;
            height: 60px;
            animation: xzload 0.8s linear infinite;
            -webkit-animation: xzload 0.8s linear infinite;
        }
        .circular {
            circle {
                stroke: currentColor;
                stroke-width: 3;
                stroke-linecap: round;
                animation: xzhuan 1.5s ease-in-out infinite;
                -webkit-animation: xzhuan 1.5s ease-in-out infinite;
            }
        }
        span {
            display: block;
            font-size: 26px;
        }
    }
}
@keyframes xzload {
    0% {
        -webkit-transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
    }
}
@-webkit-keyframes xzload {
    0% {
        -webkit-transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
    }
}
@keyframes xzhuan {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -40;
    }

    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -120;
    }
}
@-webkit-keyframes xzhuan {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -40;
    }

    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -120;
    }
}
</style>

