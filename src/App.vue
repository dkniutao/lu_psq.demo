<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="12">
            <div class="fl logo">
              <i class="fl iconfont icon-logo"></i>
              <span class="logo-title">山东教科院教育评估管理平台</span> | <span class="logo-subtitle">问卷调查系统</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <span class="fr">管理员001</span>
              <span class="fr" style="margin-right: 10px;margin-top: 7px;"><img src="./assets/tx.png" alt=""></span>
              <span class="fr" style="margin-right: 40px;">
                <i style="font-size: 30px;" class="iconfont icon-tongzhi"></i>
              </span>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{height: 100%;}
.el-header {background: #0e1b38;color: #fff;line-height: 60px;}
.logo .iconfont{font-size: 30px;}
.logo .logo-title{font-size: 18px; font-weight: bold;margin-left: 6px;}
.logo .logo-subtitle{font-size: 16px;}

.el-container{background: #eee;height: 100%;}
</style>
