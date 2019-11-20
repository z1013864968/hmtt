<template>
  <div>
    <div class="header">
      <van-nav-bar title="黑马头条"
      left-arrow
       @click-left="$router.back()"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'search-index'
}
</script>

<style>
</style>
