export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.18} />
      <pointLight color="#8b3dff" intensity={0.9} position={[2.4, -1.8, 4.2]} />
      <pointLight color="#d8b4fe" intensity={0.34} position={[-3.2, 2.2, 5.4]} />
    </>
  );
}
