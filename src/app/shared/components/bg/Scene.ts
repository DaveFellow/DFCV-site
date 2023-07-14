import * as THREE from 'three';
import { VectorsUtils } from '../../utils/vectors';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class Scene {
  public readonly renderer = new THREE.WebGLRenderer();
  public readonly camera = new THREE.PerspectiveCamera();
  public readonly scene = new THREE.Scene();
  private readonly vectorsUtils: VectorsUtils;

  public markers!: THREE.Vector3[];
  private readonly markerTracker: THREE.ArrowHelper = new THREE.ArrowHelper;
  private readonly markerTrackLerp: THREE.Vector3 = new THREE.Vector3;
  public markerTrackLerpFromPos: THREE.Vector3 = new THREE.Vector3;

  private readonly targetMarkers: { [key: string]: THREE.Vector3 } = {
    prev: new THREE.Vector3,
    next: new THREE.Vector3
  }

  public get prevMarker(): THREE.Vector3 { return this.targetMarkers['prev']; }
  public get nextMarker(): THREE.Vector3 { return this.targetMarkers['next']; }
  public get prevMarkerIsValid(): boolean { return !this.vectorsUtils.isDefault(this.prevMarker) }
  public get nextMarkerIsValid(): boolean { return !this.vectorsUtils.isDefault(this.nextMarker) }

  private modelSetupFinished: boolean = false;
  public get modelIsLoaded(): boolean { return this.modelSetupFinished; }

  public canControl: boolean = false;

  private ready: boolean = false;
  public get isReady() { return this.ready; }

  // Debug members
  private readonly _debugCamPosition: THREE.Mesh = new THREE.Mesh;
  private readonly _debugCamPositionAxes: THREE.AxesHelper = new THREE.AxesHelper(20);
  private readonly _debugCamTargetHelper = new THREE.Mesh;
  _debug: boolean = false;
  // Debug members END

  constructor() {
    this.vectorsUtils = new VectorsUtils;
  }

  render(): void {
    if (!this.renderer) return;
    this.renderer.render(this.scene, this.camera);
  }

  public setup(callback: () => void = () => {}): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.initCameraSetup();

    this.initModelSetup(callback);
    this.render();
  }


  public updateViewport(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.updateCameraAspectRatio();
    this.render();
  }


  private initCameraSetup(): void {
    this.camera.position.set(0, 0, 2);
    this.camera.fov = 50;
    this.updateCameraAspectRatio();
  }


  private updateCameraAspectRatio(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }


  private initModelSetup(callback: () => void): void {
    const loader: GLTFLoader = new GLTFLoader();

    loader.load('assets/models/office.glb', (gltf) => {
      const elements = gltf.scene.children;
      
      const markers = elements.find(elem => elem.name == "EmptiesGroup")?.children as THREE.Object3D[];
      this.markers = markers.map(marker => marker.position);
      
      /**
       * Añadir el gradiente de sombras
       * Añadir delineado
       * Personaje con color
       * Volver a colores cálidos anteriores por si acaso (quizá no, me gusta blanco todo)
       * Sombras u oclusión ambiental baked
       */

      /**
       * Concepto #2: DIORAMA!!
       * Cámara principal es isométrica como mostrando todo desde arriba haciendo parecer la habitación como un "rombo"
       * al hacer click en un link o una sección del diorama, se hace zoom y abre las mismas secciones
       * Considerar el cambio animado de FOV 
       * HACER EN RAMA NUEVA!!
       */
      const gradientMap = new THREE.TextureLoader().load('assets/img/3D-shading-color-gradient.png');
      gradientMap.minFilter = THREE.NearestFilter;
      gradientMap.magFilter = THREE.NearestFilter;
      // const mat = new THREE.MeshToonMaterial({ gradientMap });
      const roomTex = new THREE.TextureLoader().load('assets/models/Room_Tex.png');
      const mat = new THREE.MeshToonMaterial({ map: roomTex });
      mat.color = new THREE.Color(0xbdd0f2);


      gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.material = mat;
          
          if (mesh.name != 'Floor') return;
          const map = new THREE.TextureLoader().load('assets/models/Floor_Tex.png');
          mesh.material = new THREE.MeshMatcapMaterial({ map });
        }
      });

      this.scene.add(gltf.scene);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      this.scene.add(ambientLight);

      const pointLight2 = new THREE.PointLight(0xffffff, 0.3, 200);
      pointLight2.position.set(0, 10, 5);
      this.scene.add(pointLight2);

      const pointLight3 = new THREE.PointLight(0xffffff, 0.3, 140);
      pointLight3.position.set(0, 3, 1);
      this.scene.add(pointLight3);
      
      this.setDebugModelSetup();

      this.ready = true;
      callback();
    });
  }


  public setCamPosition(position: THREE.Vector3): void {
    this.markerTracker.position.set(position.x, position.y, position.z);
    this.camera.position.set(position.x, position.y, position.z);
    
    if (!this._debug) return;
    this._debugCamPosition.position.set(position.x, position.y, position.z);
    this._debugCamPositionAxes.position.set(position.x, position.y, position.z);
  }

  public trackMarker(index: number): void {
    this.markerTrackLerpFromPos = this.vectorsUtils.copyPosition(this.markerTrackLerp);
    this.targetMarkers['prev'] = this.targetMarkers['next'];
    this.targetMarkers['next'] = this.markers[index];
  }

  public getSteppedRotation(factor: number): THREE.Vector3 {
    this.markerTrackLerp.lerpVectors(this.markerTrackLerpFromPos, this.nextMarker, factor);
    if (this._debug) this._debugCamTargetHelper.position.set(this.markerTrackLerp.x, this.markerTrackLerp.y, this.markerTrackLerp.z);
    return this.markerTrackLerp;
  }

  private setDebugModelSetup(): void {
    if (!this._debug) return;

    this.markers.forEach(elem => {
      const axesHelper = new THREE.AxesHelper(1);
      axesHelper.position.set(elem.x, elem.y, elem.z);
      (axesHelper.material as THREE.LineBasicMaterial).depthTest = false;
      (axesHelper.material as THREE.LineBasicMaterial).depthWrite = false;
      const sphere = new THREE.SphereGeometry(0.1);
      const mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: 0xff0000, depthTest: false, depthWrite: false}));
      mesh.position.set(elem.x, elem.y, elem.z);
//      this.scene.add(mesh);
      this.scene.add(axesHelper);
    });

    // this.orbitControls.target = this._debugCamPosition.position;

    this._debugCamPosition.geometry = new THREE.SphereGeometry(0.1);
    this._debugCamPosition.material = new THREE.MeshBasicMaterial({color: 0xffff00, depthTest: false, depthWrite: false});
//    this.scene.add(this._debugCamPosition);
//    this.scene.add(this._debugCamPositionAxes);

    this._debugCamTargetHelper.geometry = new THREE.SphereGeometry(0.1);
    this._debugCamTargetHelper.material = new THREE.MeshBasicMaterial({color: 0x0000ff, depthTest: false, depthWrite: false});
    //this.scene.add(this._debugCamTargetHelper);
  }
}