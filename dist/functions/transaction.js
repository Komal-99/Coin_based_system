"use strict";
// create a function for caluculatiing the credits dynamically and then return the total credits needed to perform this task for each multiple choice question question 2 credits will be deducted and for text based question 5 credits will be deducted. Size of document will be the total number of words in the document for every 1000 words 1 credit will be deducted.
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCredits = void 0;
var calculateCredits = function (_a) {
    var size_of_document = _a.size_of_document, no_of_ques = _a.no_of_ques, type_of_ques = _a.type_of_ques, ques_regenerate = _a.ques_regenerate;
    var credits = 0;
    console.log(size_of_document, no_of_ques, type_of_ques, ques_regenerate);
    if (type_of_ques === "MCQ") {
        credits = no_of_ques * 2;
    }
    else if (type_of_ques === "TEXT") {
        credits = no_of_ques * 5;
    }
    credits += Math.floor(size_of_document / 1000);
    if (ques_regenerate) {
        credits += 5;
    }
    return credits;
};
exports.calculateCredits = calculateCredits;
//# sourceMappingURL=transaction.js.map