import { Resizable, ResizableBox } from 'react-resizable';
import { useState, useRef } from 'react';
const DimensionPicker = (props) => {
    const box = useRef(null);

    const [dimensions, setDimensions] = useState({
        width: props.startingWidth,
        height: props.startingHeight,
    });

    const updateDimensions = (event) => {
        setDimensions({
            width: box.current.state.width,
            height: box.current.state.height,
        });
        props.reportDimensions({
            width: box.current.state.width,
            height: box.current.state.height,
        });
    };

    return (
        <ResizableBox
            ref={box}
            width={props.startingWidth}
            height={props.startingHeight}
            // draggableOpts={Object}
            minConstraints={[100, 100]}
            maxConstraints={[
                props.startingWidth * 2 + 100,
                props.startingHeight * 2 + 100,
            ]}
            onResize={(event) => updateDimensions(event)}
        >
            <span>
                {Math.floor(dimensions.width)}px by{' '}
                {Math.floor(dimensions.height)}px
            </span>
        </ResizableBox>
    );
};

export default DimensionPicker;
