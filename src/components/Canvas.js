import { useRef, useEffect } from 'react';
const Canvas = (props) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const arr = new Uint8ClampedArray(props.bytes);
        // (props.width * props.height * 4)
        let imageData = new ImageData(arr, props.width);
        context.putImageData(imageData, 0, 0);
    }, [props.bytes]);
    return <canvas ref={canvasRef} {...props}></canvas>;
};

export default Canvas;
