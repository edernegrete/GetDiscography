<template>
	<div class="error">
		{{errorMsg}}
	</div>
</template>

<script>
	export default {
	  name: 'error',
	  props: ['errorMsg'],
	};
</script>

<style lang="stylus">
	.error
		color #ab0d0d
		font-size 3rem
</style>
