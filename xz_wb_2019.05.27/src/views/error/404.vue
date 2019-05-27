<template>
    <div class="nav-main">
        <van-nav-bar
            @click-left="go_back"
            class="xz-nva-bar navbar"
            :z-index="2"
            fixed
            title="找不到页面"
            left-arrow
        />
        <div class="error-wrap">
            <img src="../../assets/images/404.png" alt>
        </div>
    </div>
</template>
