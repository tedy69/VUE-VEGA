<template>
  <smart-widget-grid :layout="layout">
    <smart-widget slot="0" simple>
      <div>
        <h3>Simple Widget Without Header</h3>
      </div>
    </smart-widget>
    <smart-widget slot="1" title="Default Widget">
      <div>
        <h3>Default Widget With Header</h3>
      </div>
    </smart-widget>
    <smart-widget slot="2" title="Full Screen" fullscreen>
      <div>
        <h3>Make any widget full screen</h3>
      </div>
    </smart-widget>
  </smart-widget-grid>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
