import React, {Component} from 'react';

export default class askQuestion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: ""
        };
    }
    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    handleButtonClick(event) {
        event.preventDefault();
        this.props.postQuestionToDB(this.state.input);
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="itemText">Question:</label>
                            <input type="text" className="form-control" id="itemText"
                                   placeholder="Type question here"
                                   onChange={(event) => this.handleChange(event)}
                            />
                            <small className="form-text text-muted">
                            </small>
                        </div>
                        <button onClick={(event) => this.handleButtonClick(event)}
                                type="submit" id="submitItemBtn" className="btn btn-primary">Add Question
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}


