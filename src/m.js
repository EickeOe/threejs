import * as THREE from 'three'

let scene, camera
let directionalLight

let deltaTime = 0
let newTime = Date.now()
let oldTime = newTime
let HEIGHT, WIDTH

let cube
let cubeSpeed = 0.005

let left = -3.5
let right = 4.5
let bottom = -9.5
let top = 8.5

let A = [0, 0, 1, 0, 0, 1, 0, 1, 1]

let B = [1, 0, 0, 1, 0, 0, 1, 1, 0]

let C = [0, 0, 0, 0, 1, 0, 1, 1, 1]

let D = [0, 0, 0, 0, 1, 1, 1, 1, 0]

let E = [0, 0, 0, 1, 1, 0, 0, 1, 1]

let F = [1, 1, 0, 1, 1, 0, 0, 0, 0]

let G = [0, 0, 0, 1, 1, 1, 0, 0, 0]

let map = []

let tetrominos = [A, B, C, D, E, F, G]

export const init = () => {
  for (let i = 0; i < 20; i++) {
    let arr = []
    for (let j = 0; j < 10; j++) {
      arr.push(0)
    }
    map.push(arr)
  }

  HEIGHT = window.innerHeight
  WIDTH = window.innerWidth
  const canvas = document.querySelector('#canvas')

  const renderer = new THREE.WebGLRenderer({ canvas })
  renderer.setSize(WIDTH, HEIGHT)

  genCamera()

  genScene()
  genLights()

  // scene.add(directionalLight)

  const h = 20
  const geometry = new THREE.PlaneGeometry(10, 20)

  const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 }) // greenish blue

  const bg = new THREE.Mesh(geometry, material)
  bg.position.set(0, 0, 0)
  scene.add(bg)
  // let A = [
  //   0, 0, 1,
  //   0, 0, 1,
  //   0, 1, 1]

  // let B = [
  //   1, 0, 0,
  //   1, 0, 0,
  //   1, 1, 0]

  // let C = [
  //   0, 0, 0,
  //   0, 1, 0,
  //   1, 1, 1]

  // let D = [
  //   0, 0, 0,
  //   0, 1, 1,
  //   1, 1, 0]

  // let E = [
  //   0, 0, 0,
  //   1, 1, 0,
  //   0, 1, 1]

  // let F = [
  //   1, 1, 0,
  //   1, 1, 0,
  //   0, 0, 0]

  // let G = [
  //   0, 0, 0,
  //   1, 1, 1,
  //   0, 0, 0]

  cube = genCubes(A)
  cube.position.set(0.5, 0.5, 0.000000000001)

  scene.add(cube)

  const loop = () => {
    newTime = Date.now()
    deltaTime = newTime - oldTime
    oldTime = newTime

    cubeDrop(cube)
    renderer.render(scene, camera)
    requestAnimationFrame(loop)
  }

  loop()

  window.addEventListener('keydown', keyDownHandle)
  window.addEventListener('keyup', keyUpHandle)
}

const genCamera = () => {
  const aspectRatio = WIDTH / HEIGHT
  const fov = 40
  const near = 10
  const far = 100
  camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far + 1)
  camera.position.z = 30
  // camera.position.x = 1
  camera.lookAt(0, 0, 0)
  return camera
}

const genScene = () => {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xefefef)

  return scene
}

const genLights = () => {
  directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(-1, 42, 30)
  return directionalLight
}
const genCube = () => {
  let cubeGeo = new THREE.PlaneGeometry(1, 1)

  var edges = new THREE.EdgesGeometry(cubeGeo)
  var line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0xeff0dc }),
  )

  // line.scale.set(1.5, 1.5, 1.5)
  // const mat = new THREE.MeshBasicMaterial({ color: 0xeff0dc })
  // const mesh = new THREE.Mesh(cubeGeo, mat)
  return line
}

const genCubes = arr => {
  const cube = genCube()
  const cubes = new THREE.Object3D()

  for (let i = 1; i < arr.length + 1; i++) {
    if (arr[i - 1] === 1) {
      const a = Math.ceil(i / 3)
      const b = i % 3 || 3
      const c = cube.clone()
      c.position.set(b - 2, -a + 2, 0)
      cubes.add(c)
    }
  }
  cubes.position.set(0, 0, 0)
  return cubes
}

const cubeDrop = cube => {
  // cube.position.y -= cubeSpeed * deltaTime

  if (cube.position.x < left) {
    cube.position.x = left
  } else if (cube.position.x > right) {
    cube.position.x = right
  }
  if (cube.position.y <= bottom) {
    cube.position.y = bottom
    console.log(cube.position)
  }
}

const keyDownHandle = evt => {
  //key=window.event.keyCode;不兼容firefox

  const key = window.event ? evt.keyCode : evt.which
  if (key == 38) {
    //↑
    cube.position.y += 1
  }
  if (key == 40) {
    //↓
    cube.position.y -= 1
  }
  if (key == 37) {
    //←
    cube.position.x -= 1
  }
  if (key == 39) {
    //→
    cube.position.x += 1
  }
  if (key == 32) {
    //空格
    cubeSpeed = cubeSpeed * 3
  }
}
const keyUpHandle = evt => {
  const key = window.event ? evt.keyCode : evt.which
  if (key == 32) {
    //空格
    cubeSpeed = cubeSpeed / 3
  }
}
