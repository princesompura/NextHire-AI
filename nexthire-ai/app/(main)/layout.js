import React from 'react'
import DashboardProvider from './Provider'

function DashboardLayout({ children }) {
    return (
        <div>
            <DashboardProvider>
                {children}
            </DashboardProvider>
        </div>
    )
}

export default DashboardLayout
