<!--
废弃
-->
<template>
  <nav class="navbar" :class="Hdata.green">
      <div class="container-fluid">
        <div class="navbar-header header-back">
          <a class="navbar-brand" v-if="!Hdata.lefthide" @click="Hdata.back">
            <i class="icon iconfont icon-houtui-copy"></i>返回
          </a>
          <h4 class="header-title" id="titleBar">{{ Hdata.title }}</h4>
          <a class="navbar-brand pull-right" v-if="Hdata.right" @click="Hdata.rigclick">
            <i class="icon iconfont icon-iconfontshipin"></i>
          </a>
        </div>
      </div>
    </nav>
</template>
<script>
  export default {
    props: [
      'Hdata',
    ],
    }
</script>
