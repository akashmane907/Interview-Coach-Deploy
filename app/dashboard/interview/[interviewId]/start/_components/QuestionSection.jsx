import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

function QuestionSection({ mockInterviewQuestions, activeQuestionIndex }) {
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      console.log('Speech synthesis not supported');
    }
  };

  // Check if there are no questions available
  if (!mockInterviewQuestions || mockInterviewQuestions.length === 0) {
    return <div>No questions available for this interview.</div>;
  }

  return (
    <div className='p-5 border rounded-lg'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {mockInterviewQuestions.map((question, index) => (
          <h2 
            key={index} 
            className={`p-2 rounded-full text-xs md:text-lg text-center cursor-pointer 
            ${index === activeQuestionIndex ? 'bg-primary text-white' : 'bg-secondary text-gray-800'}`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>

      {/* Display the active question text */}
      <h2 className='mt-4 text-lg font-semibold'>
        {mockInterviewQuestions[activeQuestionIndex]?.question}
      </h2>

      {/* Volume Icon for Text-to-Speech */}
      <Volume2 
        className='cursor-pointer mt-2' 
        onClick={() => textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.question)}
      />

      <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
        <h2 className='flex gap-2 items-center text-blue-700'>
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <div className='text-sm text-primary my-2'>
          <p>
            Click on <strong>Record Answer</strong> when you want to answer the question.
            At the end of the interview, we will provide feedback along with the correct answer 
            for each question, and your answer will be compared for review.
          </p>
        </div>
      </div>
    </div>
  );
}

export default QuestionSection;
