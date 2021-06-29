import CreateForm from 'components/CreateForm';
const DrawingCreate = (props) => {
    return (
        <div>
            <h2>Create a new Canvas Repository!</h2>
            <h4>Set a width and height of your drawing. </h4>
            <CreateForm></CreateForm>
        </div>
    );
};

export default DrawingCreate;
