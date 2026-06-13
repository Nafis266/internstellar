import { useEffect, useRef } from "react";
import * as THREE from "three";
import Navbar from "./navbar.jsx";

const STARS = [
  { name: "Sirius",     ra: 101.3, dec: -16.7, mag: -1.46, color: 0xadd8ff },
  { name: "Canopus",    ra:  95.9, dec: -52.7, mag: -0.74, color: 0xfff4e0 },
  { name: "Arcturus",   ra: 213.9, dec:  19.2, mag: -0.05, color: 0xffb347 },
  { name: "Vega",       ra: 279.2, dec:  38.8, mag:  0.03, color: 0xddeeff },
  { name: "Rigel",      ra:  78.6, dec:  -8.2, mag:  0.13, color: 0xbbddff },
  { name: "Betelgeuse", ra:  88.8, dec:   7.4, mag:  0.50, color: 0xff6633 },
  { name: "Altair",     ra: 297.7, dec:   8.9, mag:  0.77, color: 0xeef8ff },
  { name: "Aldebaran",  ra:  68.9, dec:  16.5, mag:  0.86, color: 0xff8844 },
  { name: "Antares",    ra: 247.4, dec: -26.4, mag:  0.97, color: 0xff4422 },
  { name: "Spica",      ra: 201.3, dec: -11.2, mag:  0.98, color: 0xbbccff },
  { name: "Deneb",      ra: 310.4, dec:  45.3, mag:  1.25, color: 0xeef8ff },
  { name: "Regulus",    ra: 152.1, dec:  11.97,mag:  1.35, color: 0xddeeff },
  { name: "Bellatrix",  ra:  81.3, dec:   6.35,mag:  1.64, color: 0xbbddff },
  { name: "Alnilam",    ra:  84.1, dec:  -1.2, mag:  1.69, color: 0xbbddff },
  { name: "Alnitak",    ra:  85.2, dec:  -1.9, mag:  1.77, color: 0xaaccff },
  { name: "Mintaka",    ra:  83.0, dec:  -0.3, mag:  2.23, color: 0xbbccff },
];

function raDecToVec3(ra, dec, r) {
  const phi   = (90 - dec) * (Math.PI / 180);
  const theta = ra * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta)
  );
}

export default function SkyMap() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    const W = window.innerWidth;
    const H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H);
    renderer.setClearColor(0x000005);
    container.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, W / H, 0.1, 2000);
    camera.position.set(0, 0, 0.001);

    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi   = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      positions[i * 3]     = 900 * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = 900 * Math.cos(phi);
      positions[i * 3 + 2] = 900 * Math.sin(phi) * Math.sin(theta);
    }
    const bgGeo = new THREE.BufferGeometry();
    bgGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    scene.add(new THREE.Points(bgGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.6, sizeAttenuation: false })));

    STARS.forEach(s => {
      const size = Math.max(1.5, 5 - s.mag * 2);
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(size, 6, 6),
        new THREE.MeshBasicMaterial({ color: s.color })
      );
      mesh.position.copy(raDecToVec3(s.ra, s.dec, 800));
      scene.add(mesh);
    });

    let drag = false, px = 0, py = 0;
    const euler = new THREE.Euler(0, 0, 0, "YXZ");

    const onDown = e => { drag = true; px = e.clientX; py = e.clientY; };
    const onUp   = () => { drag = false; };
    const onMove = e => {
      if (!drag) return;
      euler.y += (e.clientX - px) * 0.003;
      euler.x += (e.clientY - py) * 0.003;
      euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x));
      camera.quaternion.setFromEuler(euler);
      px = e.clientX;
      py = e.clientY;
    };

    renderer.domElement.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", onMove);

    renderer.domElement.addEventListener("wheel", e => {
      camera.fov = Math.max(20, Math.min(100, camera.fov + e.deltaY * 0.05));
      camera.updateProjectionMatrix();
    }, { passive: true });

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousemove", onMove);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div ref={mountRef} style={{ width: "100vw", height: "100vh", background: "#000" }} />;
    </>
  )
}
