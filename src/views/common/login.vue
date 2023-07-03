<template>
  <canvas
    ref="webgl"
    class="webgl"
    style="width: 100%; height: 100%"
  />
  <el-button
    type="primary"
    plain
    class="login"
    @click="handleLogin"
  >
    登录
  </el-button>
</template>

<script lang="ts">
import TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { login } from '@/api/index.js';
export default defineComponent({
  name: 'Login',
  setup() {
    const time = ref();
    const webgl = ref(null);
    onMounted(() => {
      const canvas = document.querySelector('.webgl') || document.body;
      // if(!canvas) return
      // https://www.qiufeng.blue/three/2-14-vr.html

      const sizes = {
        width: canvas.clientWidth,
        height: canvas.clientHeight,
      };

      // 场景
      const scene = new THREE.Scene();

      // 相机
      const camera = new THREE.PerspectiveCamera(130, sizes.width / sizes.height, 0.1, 10000);
      camera.position.set(0, 1000, 0);

      scene.add(camera);

      // 添加光照
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      // directionalLight.position.set(0, 2, -1);

      scene.add(directionalLight);

      // 控制器
      const controls = new OrbitControls(camera, canvas as HTMLElement);
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.rotateSpeed = -0.25;

      scene.add(camera);

      /* 核心逻辑 */
      const geometry = new THREE.SphereGeometry(1000, 1000, 1000);
      const material = new THREE.MeshBasicMaterial({
        // color: "red",
        map: new THREE.TextureLoader().load('src/assets/img/example.jpg'),
        transparent: true,
        side: THREE.DoubleSide,
      });

      const skyBox = new THREE.Mesh(geometry, material);

      scene.add(skyBox);

      let cameraLook = new THREE.Vector3();
      camera.getWorldDirection(cameraLook);

      let tween = new TWEEN.Tween({
        fov: 130,
        z: 0,
        y: camera.position.y,
      })
        .to(
          {
            fov: 68,
            z: -1000,
            y: 0,
          },
          1600
        )
        .easing(TWEEN.Easing.Linear.None)
        .onComplete(function () {
          TWEEN.remove(tween);
        })
        .onUpdate(function (t) {
          // 更新相机位置和视角大小
          camera.position.y = t.y;
          camera.fov = t.fov;
          camera.updateProjectionMatrix();
          // 旋转效果
          skyBox.rotation.y += 0.1;
          // 更新看向位置
          const target = new THREE.Vector3(0, 0, t.z);
          camera.lookAt(target);
        });
      tween.delay(1000);
      tween.start();

      // camera.position.z = 100
      /* 核心结束 */

      window.addEventListener('resize', () => {
        // 设置大小
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        // 更新相机
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // 更新渲染器
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });

      // 设置渲染器
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
      });
      // 设置大小
      renderer.setSize(sizes.width, sizes.height);
      // 设置像素比
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.render(scene, camera);

      const tick = () => {
        controls.update();
        tween.update();
        renderer.render(scene, camera);
        time.value = window.requestAnimationFrame(tick);
      };
      tick();
    });

    onUnmounted(() => {
      cancelAnimationFrame(time.value);
    });

    const router = useRouter();

    const handleLogin = () => {
      localStorage.setItem(
        'token',
        JSON.stringify(
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxMzgyOTI0ODU1MSIsInN5c3RlbUNvZGUiOiJTMTAwOCIsInl5eXlNTWRkIjoiMTY3ODg0NTg2MzQzMSIsImV4cCI6MTY3ODkzMjI2M30.zOA1vB4rnkTI-m-3eMSYpk9S3BwOuIgorHUgxNykGO8'
        )
      );
      router.push({ name: 'home' });

      login({ captcha: '', password: 'a123456', username: 'admin', uuid: '' }).then(() => {
        console.log('真实后端接口代理请求成功！');
      });
    };

    return {
      handleLogin,
      webgl,
    };
  },
});
</script>

<style scoped lang="scss">
.webgl {
  position: relative;
}
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
}
</style>
