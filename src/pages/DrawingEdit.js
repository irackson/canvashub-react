import ImageCreate from 'components/ImageCreate';
import { useState } from 'react';

const DrawingEdit = (props) => {
    const [commitText, setCommitText] = useState({
        commitMessage: '',
        commitAuthor: '',
    });

    const isolateDrawing = () => {
        return props.allDrawings.find(
            (d) => parseInt(d.id) === parseInt(props.match.params.id)
        );
    };

    const isolateVersionFromDrawingID = (id) => {
        return props.latestVersions.find(
            (v) => parseInt(v?.drawing_id) === parseInt(id)
        );
    };

    const commitEdits = async (newImageDataUrl) => {
        const drawing = isolateDrawing();
        const errorOrObj = await props.createCommit(
            drawing.id,
            newImageDataUrl,
            'commitMessage',
            'commitAuthor',
            drawing.updated_at
        );
        if (errorOrObj !== 409) {
            props.history.push(`/drawings/${errorOrObj.drawing_id}`);
        } else {
            prompt('failed to commit'); // TODO handle failure with fork (may have to send different data with the latest commits by others)
        }
    };

    const loaded = () => {
        const drawing = isolateDrawing();
        const latestVersion = isolateVersionFromDrawingID(drawing.id);

        return (
            <div>
                <div>
                    <h4>title: {drawing.title}</h4>
                    <h4>creator: {drawing.creator}</h4>
                    <h4>width: {drawing.width}</h4>
                    <h4>height: {drawing.height}</h4>
                </div>
                <div
                    className="image-editor__container"
                    style={{
                        outline: '1px solid black',
                        width: drawing.width,
                        height: drawing.height,
                    }}
                >
                    <ImageCreate
                        width={parseInt(drawing.width)}
                        height={parseInt(drawing.height)}
                        baseDataUrl={latestVersion?.data_url}
                        commitEdits={commitEdits}
                    ></ImageCreate>
                </div>
            </div>
        );
    };

    const loading = () => {
        return (
            <div>
                loading last commit to edit for drawing with{' '}
                <em>id = {props.match.params.id}</em>...
            </div>
        );
    };

    return props.isLoaded ? loaded() : loading();
};

export default DrawingEdit;
