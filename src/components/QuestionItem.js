import React from "react";

function QuestionItem({ question,onDeleteQuestion,onUpdateQuestion }) {

  function handleDeleteClick(){
   fetch(`http://localhost:4000/questions/${question.id}`,{
    method:"DELETE"
   })
    .then((res)=>res.json())
    .then(()=>onDeleteQuestion(question))
    
  }

  function hadleChangeAnswer(e){
    
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method:"PATCH",
      headers:{"content-Type":"application/json"},
      body:JSON.stringify({
        "correctIndex": parseInt(e.target.value)
      })
    })
    .then((res)=>res.json())
    .then(()=>onUpdateQuestion(question))
  }
  
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index} >
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onClick={hadleChangeAnswer}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
