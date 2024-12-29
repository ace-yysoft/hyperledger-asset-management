<template>
  <div class="asset-list">
    <h2>Asset List</h2>
    <button @click="loadAssets">Refresh Assets</button>
    <table v-if="assets.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Color</th>
          <th>Size</th>
          <th>Owner</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="asset in assets" :key="asset.ID">
          <td>{{ asset.ID }}</td>
          <td>{{ asset.Color }}</td>
          <td>{{ asset.Size }}</td>
          <td>{{ asset.Owner }}</td>
          <td>{{ asset.Value }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No assets found</p>
  </div>
</template>

<script>
export default {
  name: 'AssetList',
  data() {
    return {
      assets: []
    }
  },
  methods: {
    async loadAssets() {
      try {
        console.log('Loading assets...');
        const response = await fetch('http://localhost:3000/api/assets');
        const data = await response.json();
        if (data.success) {
          console.log('Assets loaded:', data.assets);
          this.assets = data.assets;
        }
      } catch (error) {
        console.error('Error loading assets:', error);
        alert('Failed to load assets');
      }
    }
  },
  async mounted() {
    console.log('AssetList mounted');
    await this.loadAssets();
  }
}
</script>

<style scoped>
.asset-list {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
}

button:hover {
  background-color: #45a049;
}
</style> 