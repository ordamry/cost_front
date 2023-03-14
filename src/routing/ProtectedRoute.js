/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/

import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const { userInfo } = useSelector((state) => state.user)
    if (!userInfo) {
        return (
            <div></div>
        )
    }

    return <Outlet />
}

export default ProtectedRoute
