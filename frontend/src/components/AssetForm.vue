<!-- frontend/src/components/AssetForm.vue -->
<template>
  <div class="asset-form">
    <h2>Create New Asset</h2>
    <form @submit.prevent="createAsset">
      <div class="form-group">
        <label for="id">Asset ID:</label>
        <input id="id" v-model="asset.id" placeholder="Enter asset ID" required>
      </div>
      
      <div class="form-group">
        <label for="color">Color:</label>
        <input id="color" v-model="asset.color" placeholder="Enter color" required>
      </div>
      
      <div class="form-group">
        <label for="size">Size:</label>
        <input id="size" v-model="asset.size" placeholder="Enter size" required>
      </div>
      
      <div class="form-group">
        <label for="owner">Owner:</label>
        <input id="owner" v-model="asset.owner" placeholder="Enter owner" required>
      </div>
      
      <div class="form-group">
        <label for="value">Value:</label>
        <input id="value" v-model="asset.value" placeholder="Enter value" required>
      </div>
      
      <button type="submit">Create Asset</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AssetForm',
  data() {
    return {
      asset: {
        id: '',
        color: '',
        size: '',
        owner: '',
        value: ''
      }
    }
  },
  methods: {
    async createAsset() {
      try {
        console.log('Sending asset data:', this.asset);
        const response = await fetch('http://localhost:3000/api/assets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.asset)
        });
        
        const result = await response.json();
        console.log('Response:', result);
        alert('Asset created successfully!');
        
        // 성공 시 이벤트 발생
        this.$emit('asset-created');
        
        // Clear the form
        this.asset = {
          id: '',
          color: '',
          size: '',
          owner: '',
          value: ''
        };
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to create asset: ' + error.message);
      }
    }
  }
}
</script>

<style scoped>
.asset-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>