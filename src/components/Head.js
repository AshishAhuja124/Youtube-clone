import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../store/appSlice';
import { Link } from 'react-router-dom';
import { YOUTUBE_SEARCH_SUGGESTIONS_API } from '../utils/constants';
import { CiSearch } from "react-icons/ci";
import { IoSearchSharp } from "react-icons/io5";
import { cacheResults } from '../store/searchSlice';
const Head = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchCache = useSelector(store => store.search);

    const dispatch = useDispatch();

    useEffect(() => {

        //make an api call
        //make an api call after every key press
        //but if the difference between 2api calls is <200ms
        //decline the API call
        const timer = setTimeout(() => {

            if (searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
            } else {
                getSearchSuggestions()
            }
        }, 200);
        return () => { //this function will called every time comoinent is rerendered
            clearTimeout(timer);
        };
    }, [searchQuery]);

    const getSearchSuggestions = async () => {
        const data = await fetch(YOUTUBE_SEARCH_SUGGESTIONS_API + searchQuery);
        const json = await data.json();
        setSuggestions(json[1]);
        //update cache
        dispatch(cacheResults({
            [searchQuery]: json[1],
        }));
    }

    
    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    }

    return (
        <div className='grid grid-flow-col p-4 mx-2 shadow-lg'>
            <div className='flex col-span-1 '>
                <img onClick={() => toggleMenuHandler()}
                    className='h-8 cursor-pointer'
                    alt="menu"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII="
                />
                <Link to="/">
                    <img className='h-7 mx-2'
                        alt='youtube-logo'
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
                    >
                    </img>
                </Link>
            </div>

            <div className='col-span-10 px-10 py-2'>
                <div>
                    <input
                        className='w-1/2 rounded-l-full border border-gray-400 p-2'
                        type='text'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setShowSuggestions(false)}
                    />
                    <button className=' border border-gray-400  bg-gray-100 pt-[11px] pb-[14px] px-5 items-center rounded-r-full'>
                    <IoSearchSharp className='2xl'/>
                    </button>
                </div>
                {showSuggestions && <div className='absolute py-2 px-2 bg-white w-[25.5rem] shadow-lg rounded-lg border border-gray-100'>
                    <ul>
                        {suggestions.map((s) => (
                            <li key={s} className='flex py-2 px-3 shadow-sm hover:bg-gray-100'>
                                <CiSearch className="text-xl mt-1" />
                                <p className="px-2  ">{s}</p>
                            </li>
                        ))}
                        
                        
                    </ul>
                </div>}
            </div>

            <div className='col-span-1'>
                <img className='h-8'
                    alt='user'
                    src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                />
            </div>
        </div>
    )
}

export default Head