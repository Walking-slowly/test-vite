<script lang="ts">
import lang from 'element-plus/lib/locale/lang/zh-cn'
import { 
  defineComponent,
  defineAsyncComponent,
  ref,
  reactive,
  computed,
  onMounted,
  defineExpose,
  toRefs
} from 'vue'

import axios from 'axios';

interface aa {
  d: Number
}
interface Book {
  title?: String,
  num: Number,
  type: aa
}

interface bb {
  key: String
}
export default defineComponent({
  components: { 
    HelloWorld: defineAsyncComponent(() => import('@/components/HelloWorld.vue'))
  },

  setup() {
    let locale = lang
    let a = ref<String | Number>('1')
    let b: Book = reactive({ num: 20, type: { d: 2 } })

    let c = ref<Book>({ num: 20, type: { d: 2 } })
    
    let d: bb = reactive({ key: 'aaaa' })
    let f = toRefs(d)
    const handleClick = () => {
      f.key.value= 'bbbbbb'
      console.log(f, d, 's')
    }

    const e = computed<String>(() => {
      return 'computed'
    })

    let dom = ref<HTMLInputElement | null>(null)

    onMounted(() => {
      axios.get('/api/login').then(data => {
        console.log(data, 'ssssss')
      })
    })
    
    
    // 暴露
    defineExpose({
      handleClick
    })

    return {
      a,
      b,
      c,
      e,
      dom,
      ...f,
      locale,
      handleClick
    }
  }
})

</script>

<template>
  <el-config-provider :locale="locale" :size="'large'">
    <div>{{ a }}</div>
    <div>{{ b.num }}</div>
    <div>{{ b.type.d }}</div>
    <div>{{ c.type.d }}</div>
    <div :ref="dom">{{ e }}</div>
    <div>{{ key }}</div>
    <el-button type="primary" @click="handleClick">按钮</el-button>
    <HelloWorld :a="1"/>
  </el-config-provider>
</template>
