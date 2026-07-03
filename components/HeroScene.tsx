"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    mount.appendChild(renderer.domElement);

    /* ── Scene / Camera ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7);

    /* ── Lights ── */
    const key = new THREE.DirectionalLight(0xfff5e0, 5);
    key.position.set(-4, 6, 3);
    scene.add(key);
    scene.add(new THREE.AmbientLight(0xffffff, 0.08));

    /* ── Materials ── */
    const matte = new THREE.MeshStandardMaterial({ color: 0x1c1c1e, roughness: 0.9, metalness: 0.25 });
    const steel = new THREE.MeshStandardMaterial({ color: 0x8e9ba3, roughness: 0.35, metalness: 0.95 });
    const brassM = new THREE.MeshStandardMaterial({ color: 0xd4a843, roughness: 0.25, metalness: 1.0, transparent: true });

    /* ── Pistol center (right third of frame) ── */
    const CX = 1.9, CY = -0.2;

    /* ── Part definitions [geo, mat, targetPos, targetRotZ] ── */
    type PartDef = { geo: THREE.BufferGeometry; mat: THREE.Material; tx: number; ty: number; tz: number; rz: number; rx?: number };
    const defs: PartDef[] = [
      { geo: new THREE.BoxGeometry(1.4, 0.48, 0.22),                     mat: matte,  tx: CX,        ty: CY,        tz: 0,  rz: 0      },
      { geo: new THREE.BoxGeometry(0.28, 0.72, 0.20),                    mat: matte,  tx: CX - 0.5,  ty: CY - 0.58, tz: 0,  rz: 0.12   },
      { geo: new THREE.BoxGeometry(1.35, 0.18, 0.24),                    mat: steel,  tx: CX,        ty: CY + 0.33, tz: 0,  rz: 0      },
      { geo: new THREE.CylinderGeometry(0.044, 0.044, 1.0, 16),          mat: steel,  tx: CX + 0.43, ty: CY + 0.14, tz: 0,  rz: 0, rx: Math.PI / 2 },
      { geo: new THREE.TorusGeometry(0.13, 0.022, 8, 16, Math.PI),       mat: matte,  tx: CX + 0.05, ty: CY - 0.25, tz: 0,  rz: Math.PI * 0.5 },
      { geo: new THREE.BoxGeometry(0.03, 0.13, 0.05),                    mat: matte,  tx: CX + 0.05, ty: CY - 0.19, tz: 0,  rz: 0.2    },
    ];

    const scatter = [
      new THREE.Vector3(-4,  3,  -2),
      new THREE.Vector3( 4, -3,  -1.5),
      new THREE.Vector3( 0.5, 4.5, -1),
      new THREE.Vector3( 4.5, 1.5, -2),
      new THREE.Vector3(-3.5, -2.5, -1),
      new THREE.Vector3( 2,  -4,  -1),
    ];

    const parts = defs.map((d, i) => {
      const mesh = new THREE.Mesh(d.geo, d.mat);
      mesh.position.copy(scatter[i]);
      if (d.rx !== undefined) mesh.rotation.x = d.rx;
      mesh.rotation.z = d.rz;
      scene.add(mesh);
      return { mesh, target: new THREE.Vector3(d.tx, d.ty, d.tz), rz: d.rz, rx: d.rx ?? 0 };
    });

    /* ── Bullet ── */
    const bGroup = new THREE.Group();
    bGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.22, 12), brassM));
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), brassM);
    tip.position.y = 0.11;
    bGroup.add(tip);
    bGroup.rotation.z = Math.PI / 2;
    bGroup.visible = false;
    scene.add(bGroup);

    /* ── Animation ── */
    const CYCLE       = 6.5;
    const STAGGER     = 0.28;
    const PART_DUR    = 2.5;
    const BULLET_START = 3.3;
    const BULLET_DUR  = 2.0;

    const startTime = performance.now();
    let raf: number;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const elapsed = (performance.now() - startTime) / 1000;
      const t = elapsed % CYCLE;

      /* camera slow drift */
      const drift = Math.sin(elapsed * 0.17) * 0.09;
      camera.position.x = Math.sin(drift) * 7;
      camera.position.z = Math.cos(drift) * 7;
      camera.lookAt(CX * 0.4, CY * 0.3, 0);

      /* part assembly */
      parts.forEach(({ mesh, target, rz, rx }, i) => {
        const delay = i * STAGGER;
        const pT = ease(clamp((t - delay) / (PART_DUR - delay), 0, 1));
        mesh.position.lerpVectors(scatter[i], target, pT);
        if (pT >= 1) {
          mesh.rotation.y = Math.sin(elapsed * 0.5 + i * 0.7) * 0.035;
        } else {
          mesh.rotation.x = rx;
          mesh.rotation.z = rz;
        }
      });

      /* bullet eject */
      if (t >= BULLET_START && t < BULLET_START + BULLET_DUR) {
        bGroup.visible = true;
        const bt = (t - BULLET_START) / BULLET_DUR;
        bGroup.position.set(CX - 0.1 + bt * 3.8, CY + 0.14 + bt * 0.9, bt * 2.8);
        bGroup.rotation.x = bt * Math.PI * 3;
        bGroup.scale.setScalar(1 + bt * 2.2);
        brassM.opacity = clamp(1 - bt * 1.6, 0, 1);
      } else {
        bGroup.visible = false;
        brassM.opacity = 1;
      }

      renderer.render(scene, camera);
    };

    tick();

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" />;
}
