import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import {
    MeshWobbleMaterial,
    Stars
} from "@react-three/drei";
export default function Stuff(props) {
    const useref = useRef(null)
    const [click, setClick] = useState(false)
    let x = 0;
    useFrame(() => {
        if (props.load == "true") {
            useref.current.rotation.x += 0.1
            useref.current.rotation.y += 0.1
            useref.current.rotation.z += 0.1
        }
        else {
            useref.current.rotation.x += 0.003;
            useref.current.rotation.y += 0.003;
            useref.current.rotation.z += 0.003;
        }
    })
    return (<>
        <mesh onClick={() => {
            useref.current.height += 2
        }} ref={useref}>
            <boxGeometry attch="geometry" args={[2, 2, 2]} />
            <MeshWobbleMaterial color="#5BAFC9" attach="material" speed={5} factor={0.5}>
            </MeshWobbleMaterial>
            <directionalLight position={[-10, 0, 0]} intensity={1.5} />
            <directionalLight position={[0, -5, -5]} intensity={1.5} />
            <Stars color="red" radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </mesh>

    </>
    );
}
//  function Model() {
//     return (
//         <Canvas>
//             <Stuff /></Canvas>
//     );
// }