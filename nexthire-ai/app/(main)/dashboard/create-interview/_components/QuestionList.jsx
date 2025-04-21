import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import QuestionListContainer from './QuestionListContainer';

function QuestionList({ formData }) {
    const [loading, setLoading] = useState(true);
    const [questionList, setQuestionList] = useState();

    useEffect(() => {
        if (formData) {
            //GeneratQuestionList();
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

    const onFinish = () => {

    }


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
                <div>
                    <QuestionListContainer questionList={questionList} />
                </div>
            }

            <div className='flex justify-end mt-10'>
                <Button onClick={() => onFinish()}>Finish</Button>
            </div>
        </div>
    );
}

export default QuestionList;
