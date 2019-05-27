<template>
    <div>
        <div class="meun-cont" :class="{'active': isShowMenu}">
            <span class="menu-btn" @click="handleShow"><xz-icon :type="isShowMenu?'qianjin': 'houtui'" />快速导航</span>
            <ul class="menu-items">
                <li class="item">
                    <a href="#/">
                        <xz-icon type="home" />
                        <strong>首页</strong>
                    </a>
                </li>
                <li class="item">
                    <a href="#/cate">
                        <xz-icon type="cate" />
                        <strong>分类</strong>
                    </a>
                </li>
                <li class="item">
                    <a href="#/user">
                        <xz-icon type="user" />
                        <strong>个人中心</strong>
                    </a>
                </li>
                <li class="item">
                    <a href="#/user/collect">
                        <xz-icon type="shoucang1" />
                        <strong>我的收藏</strong>
                    </a>
                </li>
            </ul>
        </div>
        <div class="mask" @click="close_menu"></div>
    </div>
</template>
<script>
    export default {
        name:'popupModel',
        props: {
            
        },
        data() {
            return {
				isShowMenu: false
            };
        },
        methods: {
			handleShow(){
				this.isShowMenu = !this.isShowMenu;
            },
            close_menu(){
                this.isShowMenu = false;
            }
        }
    };
</script>