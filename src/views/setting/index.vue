<template>
  <CommonTable :cols="[
    {
      prop: 'aa',
      label: '序号',
      align: 'center'
    },
    {
      prop: 'bb',
      label: '测试'
    }
  ]" :tableData="[{aa: 1, bb: 2}]"/>
</template>
