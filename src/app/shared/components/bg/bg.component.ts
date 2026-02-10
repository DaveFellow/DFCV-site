import { AfterViewInit, Component, ElementRef, HostListener, Input, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { StatesMachine } from '../../FSM/StatesMachine';
import { StatesFactoryService } from '../../FSM/Factory/states-factory.service';
import { State } from '../../FSM/States/State';
import { Scene } from './Scene';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { bgDomAnimations } from './bg.anim';
import { CameraStateService } from '../../services/camera-state.service';

@Component({
    selector: 'app-bg',
    templateUrl: './bg.component.html',
    styleUrls: ['./bg.component.scss'],
    animations: [bgDomAnimations],
    standalone: false
})
export class BGComponent implements OnInit, AfterViewInit, StatesMachine {
  @ViewChild('container') container!: ElementRef<HTMLCanvasElement>;

  @Input() paused: boolean = false;

  public scene: Scene;
  
  currentState: State | null = null;

  private cameraOrbitSpeed = 0;
  public get panningDirection() {
    return !this.cameraOrbitSpeed ? ''
      : this.cameraOrbitSpeed > 0 ? 'right'
      : 'left'
  }

  constructor(
    private renderer: Renderer2,
    private statesFactory: StatesFactoryService,
    private router: Router,
    private camStateService: CameraStateService,
    private ngZone: NgZone
  ) {
    this.scene = new Scene(this.ngZone);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => this.setRouteActions((e as NavigationEnd).url));
  }

  ngAfterViewInit() {
    this.scene.setup(() => {
      this.setup();
      if (!this.paused) this.animate();
    });
  }

  animate(): void {
    if (!this.scene.isReady) return;
    if (!this.paused) requestAnimationFrame(() => this.animate());
    this.currentState?.onAnimation();
    this.scene.render();
    this.camStateService.updateAngle(this.scene.camera.rotation.z);
    this.camStateService.isInHomeState = this.isInHomeState && this.scene.camera.fov <= 25;
  }

  setState(name: string): void {
    if (this.currentState?.name === name) return;

    const state: State | null = this.statesFactory.get(name);
    if (!state) return;

    this.currentState?.onExit();

    this.currentState = state;
    this.currentState.onEnter();
  }

  clearState(): void {
    this.currentState?.onExit();
    this.currentState = null;
  }

  private setup(): void {
    this.statesFactory.setup(this.scene);
    this.renderer.appendChild(this.container.nativeElement, this.scene.renderer.domElement);
    this.setState(this.router.url);
  }

  @HostListener('window:resize')
  public updateViewport(): void {
    this.scene.updateViewport();
  }

  private setRouteActions(route: string): void {
    this.setState(route);
    // console.log(route);
  }

  // @HostListener('window:mousemove', ['$event'])
  private setMousePosition(e: MouseEvent): void {
    if (!this.scene.canControl) {
      this.cameraOrbitSpeed = 0;
      return;
    }

    const baseSpeed = 0.3;
    const thresholdX = window.innerWidth * .2;
    const thresholdY = window.innerHeight * .10;
    const onLeftEdge = e.clientX <= thresholdX;
    const rightEdgeStart = window.innerWidth - thresholdX;
    const onRightEdge = e.clientX >= rightEdgeStart;
    const onTheMiddle = e.clientY <= (window.innerHeight - thresholdY)
      && e.clientY >= thresholdY;

    if (onLeftEdge && onTheMiddle) {
      const position = e.clientX / thresholdX;
      this.cameraOrbitSpeed = (1 - position) * -1 * baseSpeed;
      return;
    }
    
    if (onRightEdge && onTheMiddle) {
      this.cameraOrbitSpeed = (e.clientX - rightEdgeStart) / thresholdX * baseSpeed;
      return;
    }

    this.cameraOrbitSpeed = 0;
  }

  @HostListener('mouseleave')
  public stopCameraRotation() {
    this.cameraOrbitSpeed = 0;
  }

  private get isInHomeState() {
    return ['/', '/home'].includes(this.currentState?.name || '');
  }
}
