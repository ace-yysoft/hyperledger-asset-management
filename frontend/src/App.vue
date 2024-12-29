<template>
  <div id="app">
    <h1>Hyperledger Fabric Asset Management</h1>
    <AssetForm @asset-created="refreshAssets" />
    <AssetList :key="refreshKey" ref="assetList" />
  </div>
</template>

<script>
import AssetForm from './components/AssetForm.vue'
import AssetList from './components/AssetList.vue'

export default {
  name: 'App',
  components: {
    AssetForm,
    AssetList
  },
  data() {
    return {
      refreshKey: 0
    }
  },
  methods: {
    refreshAssets() {
      // 컴포넌트 강제 리렌더링
      this.refreshKey += 1;
      
      // AssetList의 loadAssets 메서드 호출
      if (this.$refs.assetList) {
        this.$refs.assetList.loadAssets();
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
