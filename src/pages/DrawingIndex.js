import DrawingPreview from 'components/DrawingPreview';
import { useEffect } from 'react';

const DrawingIndex = (props) => {
    const loaded = () => {
        return (
            <div>
                {props.allDrawings.map((drawing) => (
                    <DrawingPreview
                        key={drawing.id}
                        drawing={drawing}
                        latestVersion={props.latestVersions.find(
                            (v) => v?.drawing_id === drawing.id
                        )}
                    ></DrawingPreview>
                ))}
            </div>
        );
    };

    const loading = () => {
        return <div>loading public drawing repositories...</div>;
    };

    return props.isLoaded ? loaded() : loading();
};

export default DrawingIndex;
