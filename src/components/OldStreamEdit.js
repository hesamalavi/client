import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

// this. because it is a class based component (e.g. this.props)
class OldStreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }
    render() {
        console.log(this.props);
        if (!this.props.stream) {
            <div>Loading ...</div>;
        }
        return <div>{this.props.stream.title}</div>;
    }
}

// ownProps = props. This allows us to get access to the props object in the component above

// ownProps.match.params.id relate to console.log below if not sure
const mapStateToProps = (state, ownProps) => {
    // console.log(ownProps);
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(OldStreamEdit);
