import React, { Fragment, useEffect } from 'react';
// import { render } from 'react-dom';
import { Stage, Layer, Line, Text, Shape } from 'react-konva';

const ImageCreate = (props) => {
    const [tool, setTool] = React.useState('pen');
    const [lines, setLines] = React.useState([]);
    const isDrawing = React.useRef(false);
    const stageRef = React.useRef(null);
    const [baseImg, setBaseImg] = React.useState(null);

    const loadBaseImage = () => {
        // const arr = new Uint8ClampedArray(props.width * props.height * 4);
        // for (let i = 0; i < props.baseArray.length; i++) {
        //     arr[i] = props.baseArray[i];
        // }
        // const image = new ImageData(arr, props.width);
        // setBaseImg(image);
        const img = new Image(props.width, props.height);
        img.src = props.baseDataUrl;
        setBaseImg(img);
    };

    useEffect(() => {
        if (props.baseDataUrl) {
            loadBaseImage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.baseDataUrl]);

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e) => {
        // no drawing - skipping
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    const submitEdits = (e) => {
        e.preventDefault();
        /* console.log(
            stageRef.current.toDataURL({
                width: parseInt(props.width),
                height: parseInt(props.height),
                mimeType: 'image/png',
                pixelRatio: 4,
            })
        ); */
        // props.commitEdits(
        //     stageRef.current
        //         .toCanvas()
        //         .getContext('2d')
        //         .getImageData(0, 0, props.width, props.height).data
        // );
        props.commitEdits(
            stageRef.current.toDataURL({
                width: parseInt(props.width),
                height: parseInt(props.height),
                mimeType: 'image/png',
                pixelRatio: 1,
            })
        );
    };

    return (
        <div>
            <Fragment>
                <Stage
                    ref={stageRef}
                    width={props.width}
                    height={props.height}
                    onMouseDown={handleMouseDown}
                    onMousemove={handleMouseMove}
                    onMouseup={handleMouseUp}
                >
                    <Layer>
                        <Text text="" x={5} y={30} />
                        {baseImg ? (
                            <Shape
                                sceneFunc={(context, image) => {
                                    // context.putImageData(baseImg, 0, 0);
                                    context.drawImage(baseImg, 0, 0);
                                }}
                            ></Shape>
                        ) : null}
                        {lines.map((line, i) => (
                            <Line
                                key={i}
                                points={line.points}
                                stroke="#df4b26"
                                strokeWidth={5}
                                tension={0.5}
                                lineCap="round"
                                globalCompositeOperation={
                                    line.tool === 'eraser'
                                        ? 'destination-out'
                                        : 'source-over'
                                }
                            />
                        ))}
                    </Layer>
                </Stage>
                <select
                    value={tool}
                    onChange={(e) => {
                        setTool(e.target.value);
                    }}
                >
                    <option value="pen">Pen</option>
                    <option value="eraser">Eraser</option>
                </select>
            </Fragment>
            <button onClick={(e) => submitEdits(e)}>Commit Edits</button>
        </div>
    );
};

export default ImageCreate;
