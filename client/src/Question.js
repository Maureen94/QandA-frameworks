import React, {Component} from 'react';
import {Link} from "@reach/router";
import PostAnswer from "./PostAnswer";

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {questions:[]}
    }

    render() {
        const question = this.props.getQuestion(this.props.id);
        let content = <p>Loading</p>;

        if (question) {
            content =
                <React.Fragment>
                    <h1>{question.question}</h1>

                    <h3>Answers</h3>
                    <ul>
                        {question.answers.map((answer,i) => {
                            return ( <li key={i}>
                                {answer.answer} - number of up votes: {answer.upVote}
                                <button onClick={() => this.props.postUpvoteAnswerToDB(question._id, answer._id)}>upvote</button>
                                <button onClick={() => this.props.postDownvoteAnswerToDB(question._id, answer._id)}>downvote</button>
                            </li>)
                        })}
                    </ul>

                    <Link to="/">Back</Link>
                    <PostAnswer postAnswerToDB = { this.props.postAnswerToDB } questionID = { question._id }/>
                </React.Fragment>

        }

        return content;
    }
}

export default Question;