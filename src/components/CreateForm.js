import DimensionPicker from 'components/DimensionPicker';
import { useState } from 'react';

const startingWidth = 400;
const startingHeight = 300;

const CreateForm = (props) => {
    const [dimensions, setDimensions] = useState({
        width: startingWidth,
        height: startingHeight,
    });

    const reportDimensions = ({ width, height }) => {
        setDimensions({
            width: width,
            height: height,
        });
    };

    return (
        <div>
            <DimensionPicker
                reportDimensions={reportDimensions}
                startingWidth={startingWidth}
                startingHeight={startingHeight}
            ></DimensionPicker>
        </div>
    );
};

export default CreateForm;
