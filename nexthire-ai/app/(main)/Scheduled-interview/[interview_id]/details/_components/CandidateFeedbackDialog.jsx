import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'


function CandidateFeedbackDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className='text-primary bg-blue-200 hover:bg-blue-300'>View Report</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Feedback</DialogTitle>
                    <DialogDescription>
                        <div>
                            
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default CandidateFeedbackDialog