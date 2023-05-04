<template>
  <div id="container" style="height: 100%;"/>
</template>

<script lang="tsx" setup>
import {
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  WebGLRenderer,
} from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
onMounted(() => {

  // 创建场景
  const scene = new Scene();
  // 创建相机
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // 设置相机位置
  camera.position.set(0, 0, 10);
  scene.add(camera);
  // 创建一个几何体
  const cubeGeometry = new BoxGeometry(1, 1, 1);
  // 给几何体加材质
  const cubeMaterial = new MeshBasicMaterial({ color: 0xffff00 });
  const cube = new Mesh(cubeGeometry, cubeMaterial);
  scene.add(cube);
  // 初始化渲染器
  const renderer = new WebGLRenderer();
  // 设置渲染器的尺寸
  renderer.setSize(document.getElementById('container')?.offsetWidth, document.getElementById('container')?.offsetHeight);
  
  // 将webgl渲染的东西放到body上
 (document.getElementById('container') as HTMLElement).appendChild(renderer.domElement);

  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  function render() {
    // 使用渲染通过向相机将场景渲染出来
    renderer.render(scene, camera);
    // 渲染下一帧就会调用这个函数
    requestAnimationFrame(render);
  }
  render();
})
</script>