class Db {
    constructor(mongoose) {
        const questionsSchema = new mongoose.Schema({
            question: String,
            answers: [{answer: String, upVote: Number}]
        });

        this.questionModel = mongoose.model('question', questionsSchema);
    }

    async getQuestions() {
        try {
            return await this.questionModel.find({});
        } catch (error) {
            console.error("getQuestions:", error.message);
            return {};
        }
    }

    async getQuestion(id) {
        try {
            return await this.questionModel.findById(id);
        } catch (error) {
            console.error("getQuestion:", error.message);
            return {};
        }
    }

    async createQuestion(newQuestion) {
        let question = new this.questionModel(newQuestion);
        return question.save();
    }

    async addAnswer(questionId, answer) {
        const question = await this.questionModel.findById(questionId);
        question.answers.push(answer);
        question.save();
        return question;
    }

    async upvoteQuestion(questionId,answerId){
        const question = await this.questionModel.findById(questionId);
        question.answers.find(x=> x._id.toString() === answerId.toString()).upVote += 1;
        question.save();
        return question;
    }

    async downvoteQuestion(questionId,answerId){
        const question = await this.questionModel.findById(questionId);
        question.answers.find(x=> x._id.toString() === answerId.toString()).upVote -= 1;
        question.save();
        return question;
    }

    //Only for cleanup purpose
    async deleteQuestion(){
        try {
            await this.questionModel.deleteOne({})
            return "deleted all";
        } catch (error) {
            console.error("delete:", error.message);
        }

    }

}

module.exports = mongoose => new Db(mongoose);