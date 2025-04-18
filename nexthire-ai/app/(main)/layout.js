import React from 'react'
import DashboardProvider from './Provider'

function DashboardLayout({ children }) {
    return (
        <div>
            <DashboardProvider>
                <div className='p-10'>
                {children}
                </div>
            </DashboardProvider>
        </div>
    )
}

export default DashboardLayout
