import { Fragment, useEffect, useState, useRef } from 'react';
import { SketchPicker } from 'react-color';
import colorString from 'color-string';
import { Stage, Layer, Line, Text, Shape } from 'react-konva';
import { isMobile } from 'react-device-detect';

const initialColor = 'rgba(204, 43, 43, 100)';
const initialWidth = 5;

const ImageCreate = (props) => {
    const [tool, setTool] = useState('pen');
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);
    const stageRef = useRef(null);
    const [baseImg, setBaseImg] = useState(null);

    //* custom drawing tools
    const [stroke, setStroke] = useState({
        rgbaString: initialColor,
        width: initialWidth,
    });
    const [plusDisabled, setPlusDisabled] = useState(false);
    // const [minusDisabled, setMinusDisabled] = useState(false);

    const changeStrokeColor = (color) => {
        const { a, b, g, r } = color.rgb;
        const newColorString = colorString.to.rgb([r, g, b, a]);
        setStroke({ ...color, ...stroke, rgbaString: newColorString });
    };

    const incrementStrokeWidth = (e) => {
        e.preventDefault();
        // if (stroke.width > 20) {
        //     setPlusDisabled(true);
        // }
        setStroke({ ...stroke, width: stroke.width + 1 });
    };

    const decrementStrokeWidth = (e) => {
        e.preventDefault();
        // if (stroke.width < 2) {
        //     setMinusDisabled(true);
        // }
        setStroke({ ...stroke, width: stroke.width - 1 });
    };

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
        setLines([...lines, { tool, points: [pos.x, pos.y], stroke }]);
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
        <div
            className="image-create"
            style={isDrawing.current && isMobile ? { overflow: 'clip' } : null}
        >
            <Fragment>
                <Stage
                    ref={stageRef}
                    width={props.width}
                    height={props.height}
                    onMouseDown={handleMouseDown}
                    onMousemove={handleMouseMove}
                    onMouseup={handleMouseUp}
                    onTouchStart={handleMouseDown}
                    onTouchMove={handleMouseMove}
                    onTouchEnd={handleMouseUp}
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
                                stroke={line.stroke.rgbaString}
                                strokeWidth={line.stroke.width}
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

            <div>
                <div>
                    <button
                        type="button"
                        onClick={(e) => incrementStrokeWidth(e)}
                        disabled={stroke.width < 40 ? false : true}
                    >
                        +
                    </button>
                    <button
                        type="button"
                        onClick={(e) => decrementStrokeWidth(e)}
                        disabled={stroke.width > 2 ? false : true}
                    >
                        -
                    </button>
                </div>
                <SketchPicker
                    color={stroke.rgbaString}
                    onChangeComplete={changeStrokeColor}
                    disableAlpha={false}
                />
            </div>
            <div>
                <button onClick={(e) => submitEdits(e)}>Commit Edits</button>
            </div>
        </div>
    );
};

export default ImageCreate;
