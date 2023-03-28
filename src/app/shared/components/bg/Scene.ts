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
  private readonly markerTracker: THREE.ArrowHelper = new THREE.ArrowHelper;

  private markerTrackLerp: THREE.Vector3 = new THREE.Vector3;
  public markerTrackLerpFromPos: THREE.Vector3 = new THREE.Vector3;
  
  private readonly targetMarkers: { [key: string]: THREE.Vector3 } = {
    prev: new THREE.Vector3,
    next: new THREE.Vector3
  }

  public get prevMarker(): THREE.Vector3 {
    return this.targetMarkers['prev'];
  }

  public get nextMarker(): THREE.Vector3 {
    return this.targetMarkers['next'];
  }

  public get prevMarkerIsValid(): boolean {
    return this.targetMarkers['prev'].x !== 0
      && this.targetMarkers['prev'].y !== 0
      && this.targetMarkers['prev'].z !== 0;
  }

  public get nextMarkerIsValid(): boolean {
    return this.targetMarkers['next'].x !== 0
      && this.targetMarkers['next'].y !== 0
      && this.targetMarkers['next'].z !== 0;
  }

  private modelSetupFinished: boolean = false;
  public get modelIsLoaded(): boolean { return this.modelSetupFinished; }

  public orbitControls!: OrbitControls;

  public readonly stateCamPosition: THREE.Mesh = new THREE.Mesh;
  public readonly stateCamPositionAxes: THREE.AxesHelper = new THREE.AxesHelper(20);
  public readonly camHelper: THREE.CameraHelper = new THREE.CameraHelper(this.camera);

  private ready: boolean = false;
  public get isReady() { return this.ready; }

  debug: boolean = true;

  private readonly camTargetHelper = new THREE.Mesh;

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
  
        this.orbitControls.target = this.stateCamPosition.position;

        this.stateCamPosition.geometry = new THREE.SphereGeometry(0.1);
        this.stateCamPosition.material = new THREE.MeshBasicMaterial({color: 0xffff00, depthTest: false, depthWrite: false});
        this.scene.add(this.stateCamPosition);
        this.scene.add(this.stateCamPositionAxes);

        this.camTargetHelper.geometry = new THREE.SphereGeometry(0.1);
        this.camTargetHelper.material = new THREE.MeshBasicMaterial({color: 0x0000ff, depthTest: false, depthWrite: false});
        this.scene.add(this.camTargetHelper);
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

  public trackMarker(index: number): void {
    this.markerTrackLerpFromPos = new THREE.Vector3(this.markerTrackLerp.x, this.markerTrackLerp.y, this.markerTrackLerp.z);
    this.targetMarkers['prev'] = this.targetMarkers['next'];
    this.targetMarkers['next'] = this.markers[index];
  }

  public getSteppedRotation(factor: number): THREE.Vector3 {
    this.markerTrackLerp.lerpVectors(this.markerTrackLerpFromPos, this.nextMarker, factor);
    if (this.debug) this.camTargetHelper.position.set(this.markerTrackLerp.x, this.markerTrackLerp.y, this.markerTrackLerp.z);
    return this.markerTrackLerp;
  }
}