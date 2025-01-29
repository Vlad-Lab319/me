function Ball(props) {
  const { scene, nodes, materials } = useGLTF("/Basketball_ball.fbx");

  useLayoutEffect(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        applyProps(o, {
          castShadow: true,
          receiveShadow: true,
          "material-envMapIntensity": 0.1,
        });
      }
    });
  }, []);

  // console.log("scene:", scene);
  return <primitive object={scene} {...props} />;
}
