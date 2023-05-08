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

  // 1. 创建场景
  const scene = new Scene();
  // 2. 创建相机
  /**
   * 三种相机
   * 透视相机： PerspectiveCamera
   * 正交相机： OrthographicCamera
   * 立方体相机： CubeCamera
   */
  const camera = new PerspectiveCamera(
    75, // 视场角，表示相机的可视角度
    window.innerWidth / window.innerHeight, // 屏幕宽高比，表示渲染的画面的宽高比
    1, // 近平面距离，表示相机能够看到的最短距离
    1000 // 远平面距离，表示相机能够看到的最远距离
  );
  // 设置相机位置
  camera.position.set(0, 0, 5);
  scene.add(camera);
  // 创建一个几何体
  /**
   * 立方体几何体（BoxGeometry）
   * 球体几何体（SphereGeometry）
   * 圆柱体几何体（CylinderGeometry）
   * 平面几何体（PlaneGeometry）
   */
  const cubeGeometry = new BoxGeometry(1, 1, 1);
  // 给几何体加材质
  const cubeMaterial = new MeshBasicMaterial({ color: 0xffff00 });
  const cube = new Mesh(cubeGeometry, cubeMaterial);
  scene.add(cube);
  // 初始化渲染器
  /**
   * 三种渲染器
   * WebGL 渲染器（WebGLRenderer）
   * SVG 渲染器（SVGRenderer）
   * CSS2D 渲染器（CSS2DRenderer）
   */
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