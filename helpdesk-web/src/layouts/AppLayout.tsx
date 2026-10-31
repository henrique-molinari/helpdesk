import { Outlet } from 'react-router'

import { Navbar } from '../components/Navbar'

export function AppLayout(){

    return (
        <div className='min-h-screen bg-slate-100'>

            <Navbar />
            
            <main className='mx-auto max-w-6xl p-6'>

                <Outlet />

            </main>

        </div>
    )

}