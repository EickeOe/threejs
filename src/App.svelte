<script>
  import './index.less'

  import { onMount } from 'svelte'
  import {init} from './m.js'

  onMount(()=>{
    init()
  })

</script>

<svelte:head>
  <title>threeJS测试</title>
</svelte:head>

<div>
<canvas id="canvas"></canvas>
</div>