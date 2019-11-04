import React, {Component} from 'react';
import {Router} from "@reach/router";
import Questions from "./Questions";
import Question from "./Question";

class App extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);

        this.postQuestionToDB = this.postQuestionToDB.bind(this);
        this.postAnswerToDB = this.postAnswerToDB.bind(this);
        this.postDownvoteAnswerToDB = this.postDownvoteAnswerToDB.bind(this);
        this.postUpvoteAnswerToDB = this.postUpvoteAnswerToDB.bind(this);

        this.state = {
            questions: []
        }
    }
    componentDidMount() {
        this.getQuestions().then(() => console.log("questions successfully gotten!"));
    }

    async getQuestions() {
        let url = `${this.API_URL}/questions`;
        let result = await fetch(url);
        let json = await result.json();
        return this.setState({
            questions: json
        })
    }

    async postQuestionToDB(title) {
        fetch(`${this.API_URL}/questions`, {
            method: 'post',
            body: JSON.stringify({
                "question": title,
                "answers": []
            }),
            headers: new Headers({"Content-Type": "application/json"})

        }).then(await this.getQuestions());

    }

    async postAnswerToDB(text, id){
        fetch(`${this.API_URL}/questions/`+id+"/answers",{
            method: 'post',
            body: JSON.stringify({
                "answer": text,
                "upVote": 0
            }),
            headers: new Headers({ "Content-Type": "application/json" })
        }).then(await this.getQuestions());
    }

    async postDownvoteAnswerToDB(questionId, answerId){
        fetch(`${this.API_URL}/questions/answer/downvote`,{
            method: 'put',
            body: JSON.stringify({
                "questionId": questionId,
                "answerId": answerId
            }),
            headers: new Headers({ "Content-Type": "application/json" })
        }).then(await this.getQuestions());
    }

    async postUpvoteAnswerToDB(questionId, answerId){
        fetch(`${this.API_URL}/questions/answer/upvote`,{
            method: 'put',
            body: JSON.stringify({
                "questionId": questionId,
                "answerId": answerId
            }),
            headers: new Headers({ "Content-Type": "application/json" })
        }).then(await this.getQuestions());
    }

    getQuestion(id) {
        return this.state.questions.find(x=> x._id === id)
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm"/>
                    <div className="col-sm-8">
                        <br/>
                        <Router>
                            <Question path="/question/:id" postAnswerToDB={ this.postAnswerToDB} postUpvoteAnswerToDB={this.postUpvoteAnswerToDB} postDownvoteAnswerToDB={this.postDownvoteAnswerToDB} getQuestion={id=> this.getQuestion(id)} />
                            <Questions path="/" postQuestionToDB={this.postQuestionToDB} questions={this.state.questions}/>
                        </Router>
                        <br/>
                    </div>
                    <div className="col-sm"/>
                </div>
            </div>
        );
    }
}

export default App;
