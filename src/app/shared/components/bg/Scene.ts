import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';

export class Scene {
  public readonly renderer = new THREE.WebGLRenderer();
  public readonly camera = new THREE.PerspectiveCamera();
  public readonly scene = new THREE.Scene();

  public markers!: THREE.Vector3[];
  private markerTracker: THREE.ArrowHelper = new THREE.ArrowHelper;

  private modelSetupFinished: boolean = false;
  public get modelIsLoaded(): boolean { return this.modelSetupFinished; }

  public orbitControls!: OrbitControls;

  public stateCamPosition: THREE.Mesh = new THREE.Mesh;
  public stateCamPositionAxes: THREE.AxesHelper = new THREE.AxesHelper(20);
  public camHelper: THREE.CameraHelper = new THREE.CameraHelper(this.camera);

  private ready: boolean = false;
  public get isReady() { return this.ready; }

  public destinationRotation: THREE.Euler = new THREE.Euler(0, 0, 0);
  public initRotation: THREE.Euler = new THREE.Euler(0, 0, 0);

  readonly quarterRadian: number = (Math.PI * 2) / 4;

  debug: boolean = true;

  constructor() { }

  render(): void {
    if (!this.renderer) return;
    this.renderer.render(this.scene, this.camera);
  }

  public setup(callback: () => void = () => {}): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.initCameraSetup();

    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.orbitControls.enablePan = false;
    // this.orbitControls.enableZoom = false;
    this.orbitControls.enabled = false;
    
    this.initModelSetup(callback);
    this.render();
  }


  private initCameraSetup(): void {
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 2;
    this.camera.fov = 75;
    this.updateCameraAspectRatio();
  }


  private updateCameraAspectRatio(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
  }


  private initModelSetup(callback: () => void): void {
    const loader: GLTFLoader = new GLTFLoader();

    loader.load('assets/models/office.glb', (gltf) => {
      const mat = new THREE.MeshLambertMaterial;

      const elements = gltf.scene.children;

      const markers = elements.find(elem => elem.name == "EmptiesGroup")?.children as THREE.Object3D[];
      this.markers = markers.map(marker => marker.position);

      gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.material = mat;
        }
      });

      this.scene.add(gltf.scene);

      const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
      dirLight.position.set(0, 10, 0);
      dirLight.lookAt(this.markers[2]);
      this.scene.add(dirLight);

      const pointLight = new THREE.PointLight(0xffffff, 0.6, 35);
      pointLight.position.set(0, 7, 0);
      this.scene.add(pointLight);
      
      // debug
      if (this.debug) {
        this.markers.forEach(elem => {
          const axesHelper = new THREE.AxesHelper(1);
          axesHelper.position.set(elem.x, elem.y, elem.z);
          (axesHelper.material as THREE.LineBasicMaterial).depthTest = false;
          (axesHelper.material as THREE.LineBasicMaterial).depthWrite = false;
          const sphere = new THREE.SphereGeometry(0.1);
          const mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: 0xff0000, depthTest: false, depthWrite: false}));
          mesh.position.set(elem.x, elem.y, elem.z);
          this.scene.add(mesh);
          this.scene.add(axesHelper);
        });
  
        const sphere = new THREE.SphereGeometry(0.1);
        this.stateCamPosition = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: 0xffff00, depthTest: false, depthWrite: false}));
        this.orbitControls.target = this.stateCamPosition.position;

        this.scene.add(this.stateCamPosition);
        this.scene.add(this.stateCamPositionAxes);
      }
      // end debug

      this.ready = true;
      callback();
    });
  }


  public setCamPosition(position: THREE.Vector3): void {
    this.markerTracker.position.set(position.x, position.y, position.z);
    this.stateCamPosition.position.set(position.x, position.y, position.z);
    this.stateCamPositionAxes.position.set(position.x, position.y, position.z);
    this.camera.position.set(position.x, position.y, position.z);
  }


  public setCamRotation(rotation: THREE.Euler): void {
    this.camera.setRotationFromEuler(rotation);
  }


  public trackMarker(index: number): THREE.Euler {
    let rot = this.camera.rotation;
    this.initRotation = new THREE.Euler(rot.x, rot.y, rot.z);

    this.camera.lookAt(this.markers[index]);

    rot = this.camera.rotation;
    this.destinationRotation = new THREE.Euler(rot.x, rot.y, rot.z);

    this.camera.setRotationFromEuler(this.initRotation);

    return this.destinationRotation;
  }


  private getSteppedRotation(): THREE.Vector3 {
    const x = this.steppedAxisRotation('x');
    const y = this.steppedAxisRotation('y');
    const z = this.steppedAxisRotation('z');
    return new THREE.Vector3(x, y, z);
  }

  private steppedAxisRotation(axis: 'x'|'y'|'z'): number {
    return 0;
    // const rot = this.camera.rotation;
    // const rawDistance = rot[axis] - this.rotDestination[axis];
    // const distance = rawDistance < 0 ? rawDistance * -1 : rawDistance;
    // const unsignedRawSpeed = distance / 60;
    // const rawSpeed = rot[axis] < this.rotDestination[axis] 
    //   ? rot[axis] + unsignedRawSpeed
    //   : rot[axis] - unsignedRawSpeed

    // return (rawSpeed * this.currentStep) / 100;
  }
}