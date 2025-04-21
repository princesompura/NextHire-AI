import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

function QuestionList({ formData }) {
    const [loading, setLoading] = useState(true);
    const [questionList, setQuestionList] = useState();

    useEffect(() => {
        if (formData) {
            GeneratQuestionList();
        }
    }, [formData]);

    const GeneratQuestionList = async () => {
        
        setLoading(true);
        try {
            const { data } = await axios.post('/api/ai-model', { ...formData });
            const match = data.content.match(/interviewQuestions\s*=\s*(\[[\s\S]*?\])/);
    
            if (!match) {
                toast('Could not find valid questions in response.');
                setLoading(false);
                return;
            }
    
            setQuestionList(JSON.parse(match[1])); // Directly parse and set
            setLoading(false);
        } catch (e) {
            toast('Server Error or Invalid JSON format');
            setLoading(false);
        }
    };
    
    
    return (
        <div>
            {loading &&
                <div className="p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center">
                    <Loader2Icon className="animate-spin" />
                    <div>
                        <h2 className='font-medium'>Generating Interview Questions</h2>
                        <p className='text-primary'>Our AI is crafting personalized questions based on your job details.</p>
                    </div>
                </div>
            }
            {questionList?.length > 0 &&
                <div className='p-5 border border-gray-300 rounded-xl'>
                    {questionList.map((item, index) => (
                        <div key={index} className='p-3 border border-gray-200 rounded-xl'>
                            <h2 className='font-medium'>{item.question}</h2>
                            <h2>Type: {item?.type}</h2>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default QuestionList;
