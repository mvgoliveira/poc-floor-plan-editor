"use client"

import { Layer, Stage, Star, Text } from "react-konva";

export default function Home() {
    const width = 800;
    const height = 500;

    const position_x = 50;
    const position_y = 200;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-zinc-950">
            <Stage width={width} height={height} className="bg-neutral-300">
                <Layer>
                    <Text text={`X = ${position_x}%`}/>

                    <Star
                        key={1}
                        id={"1"}
                        x={position_x * width / 100}
                        y={height * 0.5}
                        numPoints={5}
                        innerRadius={20}
                        outerRadius={40}
                        fill="#3c8676"
                        opacity={1}
                        draggable
                        rotation={0}
                        scaleX={1}
                        scaleY={1}
                    />
                </Layer>
            </Stage>
        </main>
    );
}
