<template>
  <i @click="icon_click" :class="['xz-icon','xz-icon-'+type]"></i>
</template>
<script>
export default{
    props:{
        type:{
            type:String,
            default:'wode'
        }
    },
    methods:{
      icon_click(){
        this.$emit('click');
      }
    }
}
</script>