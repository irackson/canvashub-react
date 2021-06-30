import { useRef, useEffect } from 'react';
const Canvas = (props) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const img = new Image(props.width, props.height);
        img.src = props.dataUrl;
        context.drawImage(img, 0, 0);
        // const arr = new Uint8ClampedArray(props.bytes);
        // (props.width * props.height * 4)
        // let imageData = new ImageData(arr, props.width);
        // context.putImageData(imageData, 0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.bytes]); // TODO: consider dependencies
    return (
        <canvas
            width={props.width}
            height={props.height}
            ref={canvasRef}
            // {...props}
        ></canvas>
    );
};

export default Canvas;
