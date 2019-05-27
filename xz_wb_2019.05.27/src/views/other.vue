<template>
    <div style="width:100%;">
        <router-view :key="key"></router-view>
    </div>
</template>
<script>
export default {
    methods: {},
    computed: {
        key() {
            return this.$route.name !== undefined
                ? this.$route.name + new Date()
                : this.$route + new Date();
        }
    },
};
</script>