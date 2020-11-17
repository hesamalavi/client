import React from 'react';
// reduxForm is what connects us to the redux form store
import { Field, reduxForm } from 'redux-form';

// redux form we always are supposed to make sure that we show that input element in assign its value property and also give it in on change callback handler
class StreamCreate extends React.Component {
    renderError({ touched, error }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }
    // helper method
    renderInput = ({ input, label, meta }) => {
        // console.log(formProps);
        // console.log(meta);
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            // onChange={formProps.input.onChange}
            // value={formProps.input.value}
            // touched is when you click in and click out of the field
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                <div>{this.renderError(meta)}</div>
            </div>
        );
    };
    // formProps does not mean that this is some data passed down by a parent component. Maybe a better name this argument here would be something like form values.
    onSubmit(formProps) {
        console.log(formProps);
    }

    render() {
        // props from redux-form
        // console.log(this.props);
        // name prop is compulsary. Field is not responsible for showing any input fields. We add prop component which could be a react component or a function for the field to call. Field sets up the infrustructure for our redux-form setup
        return (
            // handleSubmit property is a property of redux-form. on submit that is the name of the prop that we are passing down to the form if we pass a function on the onSubmit prop down into the form the function we called any time that the form gets submitted then inside of here we first have this prop's handleSubmit.
            // Redux-form takes care of preventdefault on submit for us
            <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className="ui form error"
            >
                <Field
                    name="title"
                    component={this.renderInput}
                    label="Enter Title"
                />
                <Field
                    name="description"
                    component={this.renderInput}
                    label="Enter Description"
                />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = formValues => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }
    return errors;
};

export default reduxForm({
    form: 'streamCreate',
    validate,
})(StreamCreate);
