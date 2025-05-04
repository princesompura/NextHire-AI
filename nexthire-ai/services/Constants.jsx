import { BriefcaseBusinessIcon, Calendar, Code2Icon, LayoutDashboard, List, Puzzle, Settings, User2Icon, Users, WalletCards } from "lucide-react";

export const SideBarOptions = [
    {
        name: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard'
    },
    {
        name: 'Scheduled Interview',
        icon: Calendar,
        path: '/Scheduled-interview'
    },
    {
        name: 'All Interview',
        icon: List,
        path: '/all-interview'
    },
    {
        name: 'Billing',
        icon: WalletCards,
        path: '/billing'
    },
    {
        name: 'Settings',
        icon: Settings,
        path: '/settings'
    },
]

export const InterviewType = [
    {
        title: 'Technical',
        icon: Code2Icon
    },
    {
        title: 'Behavioural',
        icon: User2Icon
    },
    {
        title: 'Experience',
        icon: BriefcaseBusinessIcon
    },
    {
        title: 'Problem Solving',
        icon: Puzzle
    },
    {
        title: 'Leadership',
        icon: Users
    }
]

export const QUESTIONS_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title: {{jobTitle}}

Job Description:{{jobDescription}}

Interview Duration: {{interviewDuration}}

Interview Type: {{type}}

📝 Your task:

Analyze the job description to identify key responsibilities, required skills, and expected experience.

Generate a list of interview questions depends on interview duration

Adjust the number and depth of questions to match the interview duration.

Ensure the questions match the tone and structure of a real-life {{type}} interview.

🧩 Format your response in JSON format with array list of questions.
format: interviewQuestions=[
{
 question:'',
 type:'Technical/Behavioral/Experince/Problem Solving/Leaseship'
},{
...
}]

🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`


export const FEEDBACK_PROMPT = `{{conversation}}

Based on this interview conversation between the assistant and the user, 
provide feedback for the user's interview. Include the following:

1. A rating out of 10 for:
   - Technical Skills
   - Communication
   - Problem Solving
   - Experience

2. A summary of the interview in 3 lines.

3. A recommendation on whether the user is suitable for hire, along with a message.

Provide the response in JSON format as shown below:

{
    "feedback": {
        "rating": {
            "technicalSkills": 5,
            "communication": 6,
            "problemSolving": 4,
            "experience": 7
        },
        "summary": [
            "The user demonstrated strong technical skills.",
            "Communication was clear and concise.",
            "Problem-solving skills need improvement."
        ],
        "recommendation": "RECOMMENDED",
        "recommendationMsg": "The candidate is a good fit for the role."
    }
}
`;