import Canvas from 'components/Canvas';
import { Link } from 'react-router-dom';

const DrawingPreview = ({ drawing, latestVersion }) => {
    return (
        <div>
            <h2>{drawing.title}</h2>
            <h3>By {drawing.creator}</h3>
            {latestVersion ? (
                <Canvas
                    bytes={latestVersion.bytes}
                    height={drawing.height}
                    width={drawing.width}
                ></Canvas>
            ) : (
                <div>
                    <h5>empty drawing repo (no commits)</h5>
                    <h6>
                        width: {drawing.width}, height: {drawing.height}
                    </h6>
                </div>
            )}
            <form>
                <button type="submit" disabled={!drawing.checked_out}>
                    Checkout & Edit
                </button>
            </form>
        </div>
    );
};

export default DrawingPreview;
