import DimensionPicker from 'components/DimensionPicker';
import { useState } from 'react';

const startingWidth = 300;
const startingHeight = 200;
const maxWidth = startingWidth * 2 + 100;
const maxHeight = startingHeight * 2 + 100;

/* newDrawing = {
        "title": "small title", // string
        "creator": "small creator", // string
        "height": 4, // integer
        "width": 4 // integer
    } */

const DrawingCreate = (props) => {
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

    const [formData, setFormData] = useState({
        title: '', // string
        creator: '', // string
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmission = async (e) => {
        e.preventDefault();
        const errorOrObj = await props.createRepo({
            ...formData,
            width: dimensions.width,
            height: dimensions.height,
        });
        if (errorOrObj !== 400) {
            props.history.push(`/drawings/${errorOrObj.id}`);
        } else {
            prompt('failed to create');
        }
    };

    return (
        <div>
            <h2>Create a new Canvas Repository!</h2>
            <h4>Set a width and height of your drawing. </h4>
            <div
                style={{
                    outline: '1px solid black',
                    width: maxWidth,
                    height: maxHeight,
                }}
            >
                <DimensionPicker
                    reportDimensions={reportDimensions}
                    startingWidth={startingWidth}
                    startingHeight={startingHeight}
                    maxWidth={maxWidth}
                    maxHeight={maxHeight}
                ></DimensionPicker>
            </div>
            <form onSubmit={(event) => handleSubmission(event)}>
                <input
                    type="text"
                    value={formData.title}
                    name="title"
                    placeholder="canvas title"
                    required
                    onChange={(event) => handleChange(event)}
                />
                <input
                    type="text"
                    value={formData.creator}
                    name="creator"
                    placeholder="creator name"
                    onChange={(event) => handleChange(event)}
                />
                <button type="submit">Initialize Repository</button>
            </form>
        </div>
    );
};

export default DrawingCreate;
