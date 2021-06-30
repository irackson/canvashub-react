import Canvas from 'components/Canvas';
import { Link } from 'react-router-dom';

const DrawingPreview = ({ drawing, image }) => {
    return (
        <div>
            <h3>
                <Link to={`/drawings/${drawing.id}`}>{drawing.title}</Link>
            </h3>
            <h4>By {drawing.creator}</h4>
            {image ? (
                // <Canvas
                //     dataUrl={image.data_url}
                //     height={drawing.height}
                //     width={drawing.width}
                // ></Canvas>
                <img
                    width={drawing.width}
                    height={drawing.height}
                    src={image.data_url}
                    alt={image.id}
                ></img>
            ) : (
                <div>
                    <h5>empty drawing repo (no commits)</h5>
                    <h6>
                        width: {drawing.width}px, height: {drawing.height}px
                    </h6>
                </div>
            )}
        </div>
    );
};

export default DrawingPreview;
