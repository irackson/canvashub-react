import ImageCreate from 'components/ImageCreate';

const DrawingEdit = (props) => {
    const loaded = () => {
        const drawing = props.allDrawings.find(
            (d) => parseInt(d.id) === parseInt(props.match.params.id)
        );
        const latestVersion = props.latestVersions.find(
            (v) => parseInt(v?.drawing_id) === parseInt(drawing.id)
        );

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
                    {latestVersion ? (
                        <ImageCreate
                            width={drawing.width}
                            height={drawing.height}
                            baseArray={latestVersion.bytes}
                        ></ImageCreate>
                    ) : (
                        <ImageCreate
                            width={drawing.width}
                            height={drawing.height}
                        ></ImageCreate>
                    )}
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
