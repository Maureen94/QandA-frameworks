const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

/**** Configuration ****/
const port = (process.env.PORT || 8080);
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(express.static('../client/build'));

/**** Database ****/
const questionDAL = require('./questions_dal')(mongoose);

/**** Routes ****/
app.get('/api/questions', (req, res) => {
    questionDAL.getQuestions().then(questions => res.json(questions));
});

app.get('/api/question/:id', (req, res) => {
    let id = req.params.id;
    questionDAL.getQuestion(id).then(question => res.json(question));
});

app.post('/api/questions', (req, res) => {
    let question = {
        question : req.body.question,
        answers : [] // Empty answers array
    };
    questionDAL.createQuestion(question).then(newQuestion => res.json(newQuestion));
});

app.post('/api/questions/:id/answers', (req, res) => {
    questionDAL.addAnswer(req.params.id.toString(), req.body)
        .then(updatedAnswer => res.json(updatedAnswer));
});

app.delete('/api/question/delete/', (req, res) => {
    questionDAL.deleteQuestion().then(deletedQuestion => res.json(deletedQuestion));
});

app.put('/api/questions/answer/upvote', (req,res) => {
    questionDAL.upvoteQuestion(req.body.questionId, req.body.answerId).then(upvoted => res.json(upvoted));
});

app.put('/api/questions/answer/downvote', (req,res) => {
    questionDAL.downvoteQuestion(req.body.questionId, req.body.answerId).then(downvoted => res.json(downvoted));
});

app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);

/**** Start ****/
const url = ( 'mongodb+srv://maureenkoopman:Development1!@cluster0-pyjf5.mongodb.net/test?retryWrites=true&w=majority' );
mongoose.connect(url, {useNewUrlParser: true}).then(async () => {
    await app.listen(port); // Start the API
    console.log(`Kitten API running on port ${port}!`)
})
    .catch(error => console.error(error));;



