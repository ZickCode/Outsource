<template>
    <div class="nav-main">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar lr" fixed title="注册" left-arrow/>
        <form class="xz-lr">
            <div class="xz-lr-title">恭喜您注册成功</div>
            <div class="xz-lr-tip">
                请完善您的信息完成注册
                <a class="link_btn" href="#/">跳过</a>
            </div>
            <div class="xz-lr-box">
                <input class="box-input" type="password" placeholder="请设置您的登录密码">
            </div>
            <div class="xz-lr-box">
                <input class="box-input" type="password" placeholder="请确认您的登录密码">
            </div>
            <div class="xz-lr-box xz-lr-btn">
                <button type="button" class="xz-btn btn-e43 xz-radius">开始购物</button>
            </div>
        </form>
    </div>
</template>