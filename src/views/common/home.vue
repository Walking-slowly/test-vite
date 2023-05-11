<template>
  <div
    ref="container"
    style="width: 100%; height: 100%"
  />
</template>
<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import a from '@/assets/img/earth_texture.jpg';

export default defineComponent({
  name: 'Home',
  setup() {
    const container = ref(null);

    let scene, camera, renderer, earth;

    onMounted(() => {
      // 初始化场景
      initScene();
      // 初始化相机
      initCamera();
      // 初始化光线
      initLight();
      // 初始化渲染器
      initRenderer();
      // 初始化地球
      initEarth();
      // 添加轨道控制
      initOrbitControls();
      // 初始化动画
      initAnimation();
    });

    onUnmounted(() => {
      // 销毁
      cancelAnimationFrame(animationId);
    });

    const initScene = () => {
      scene = new THREE.Scene();
    };

    const initCamera = () => {
      const width = container.value.offsetWidth;
      const height = container.value.offsetHeight;
      const fov = 25;
      const aspect = width / height;
      const near = 1;
      const far = 1000;
      // 透视相机
      camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.z = 500;
    };

    const initLight = () => {
      // 点光源，白色，强度1，距离100
      const pointLight = new THREE.PointLight(0xffffff, 1, 100);
      pointLight.position.set(0, 0, 300);
      scene.add(pointLight);
      // 环境光，银灰色
      const ambient = new THREE.AmbientLight(0xc0c0c0);
      scene.add(ambient);
    };

    const initRenderer = () => {
      renderer = new THREE.WebGLRenderer({ antialias: true });
      const width = container.value.offsetWidth;
      const height = container.value.offsetHeight;
      renderer.setSize(width, height);
      // 添加渲染器到DOM中
      container.value.appendChild(renderer.domElement);
    };

    const initOrbitControls = () => {
      new OrbitControls(camera, renderer.domElement);
    };

    const initEarth = () => {
      const earthRadius = 100;
      // 添加球体
      const earthGeometry = new THREE.SphereGeometry(earthRadius, 50, 50);
      // 纹理贴图材质
      const earthMaterial = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(a) });
      earth = new THREE.Mesh(earthGeometry, earthMaterial);
      // 在场景中添加地球网格
      scene.add(earth);
    };

    let animationId = null;

    const initAnimation = () => {
      const animate = () => {
        // 使地球旋转
        earth.rotation.y += 0.005;
        // 渲染场景和相机
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      };
      animate();
    };

    return {
      container,
    };
  },
});
</script>
