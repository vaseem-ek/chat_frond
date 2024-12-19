import React from 'react'
import Avatar from '../helpers/Avatar'
import { Link } from 'react-router-dom'

function UserSearchCard({ user,onclose }) {
    return (
        <Link to={'/'+user._id} onClick={onclose} className='flex items-center gap-3  p-2 border border-transparent border-b-slate-300 hover:border hover:border-primary rounded cursor-pointer'>
            <div>
                <Avatar width={50}
                    height={50}
                    name={user?.name}
                    userId={user?._id}
                    imageUrl={user?.profile}
                />
            </div>
            <div>
                <div className='font-semibold text-ellipsis line-clamp-1'>
                    {user?.name}
                </div>
                <p className='text-sm text-ellipsis line-clamp-1'>{user?.email}</p>
            </div>
        </Link>
    )
}

export default UserSearchCard
