import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

// this. because it is a class based component (e.g. this.props)
class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    // callback for StreamForm
    onSubmit = formValues => {
        // console.log(formvalues);
        this.props.editStream(this.props.match.params.id, formValues);
    };

    render() {
        // console.log(this.props);
        if (!this.props.stream) {
            return <div>Loading ...</div>;
        }
        // initialValues is a special value name with reduxForm
        // FUN FACT: The outside curly braces indicates that we are going to write some javascript expression inside of our JSX. The second set is indicating that we are creating a normal object
        // title and description were defined in StreamForm
        // this.props.stream has a title and description value so when initialValues is passed on as a props to Form values you will see the correct title and description of what needs to be edited by the user

        // using lodash below in initialValues so that only title and description would be added to the form. .pick creates a new object with the listed properties
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                    initialValues={_.pick(
                        this.props.stream,
                        'title',
                        'description'
                    )}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

// ownProps = props. This allows us to get access to the props object in the component above

// ownProps.match.params.id relate to console.log below if not sure
const mapStateToProps = (state, ownProps) => {
    // console.log(ownProps);
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
    StreamEdit
);
