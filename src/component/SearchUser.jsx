import React, { useEffect, useState } from 'react'
import { IoClose, IoSearchOutline } from 'react-icons/io5'
import Loading from './Loading'
import UserSearchCard from './UserSearchCard'
import toast from 'react-hot-toast'
import axios from 'axios'

function SearchUser({ onclose }) {
    const [searchUser, setSearchUser] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")

    const handleSearchUser = async () => {
        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/search-user`
        try {
            setLoading(true)
            const response = await axios.post(URL, { search: search })
            setLoading(false)
            setSearchUser(response.data.data)
        } catch (error) {
            toast.error(error?.res?.data?.message)
        }
    }
    useEffect(() => {
        handleSearchUser()
    }, [search])
    console.log("searchuser", searchUser);

    return (
        <div className='fixed top-0 bottom-0 left-0  right-0 bg-slate-700 bg-opacity-40 p-2'>
            <div className='w-full max-w-md mx-auto mt-10 '>
                {/* input search user */}
                <div className='bg-white rounded h-14 overflow-hidden flex'>
                    <input type="text" placeholder='search user name' onChange={(e) => setSearch(e.target.value)} value={search} className='outline-none w-full p-1 h-full px-4' />
                    <div className='h-14 w-14 flex justify-center items-center'>
                        <IoSearchOutline size={25} />
                    </div>
                </div>
                {/* display search user */}
                <div className='bg-white mt-2 w-full p-4 rounded'>
                    {/* no user found */}
                    {
                        searchUser.length === 0 && !loading && (
                            <p className='text-center text-slate-500'>No user found !</p>
                        )
                    }

                    {
                        loading && (
                            <Loading />
                        )
                    }
                    {
                        searchUser.length !== 0 && !loading && (
                            searchUser.map((user, index) => {
                                return (
                                    <UserSearchCard key={user._id} user={user} onclose={onclose} />
                                )
                            })
                        )
                    }
                </div>
            </div>
            <div className='absolute top-0 right-0 text-2xl lg:text-4xl p-2 hover:text-white' onClick={onclose}>
                <button>
                    <IoClose />
                </button>
            </div>
        </div>
    )
}

export default SearchUser
