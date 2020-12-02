import React, {useEffect, useState} from 'react'
import AuthorThumbnail from './components/authorThumbnail'

function PopularAuthors(props){
    
    const [authorList, setAuthorList] = useState([]) 

    useEffect(()=>{
        if(props.authors !== '.....loading')
        {
            let authlist = props.authors.authors
            setAuthorList(authlist.map((au, index) => <AuthorThumbnail data={au} key={index}/>))
        }
    }, [props.authors])

    return(
        <div className='popularAuthors'>
            <div className='popularAuthorsHeading'>
                Celibrity Authors <span role='img' aria-label='bookey'>🎉🎉</span>
            </div>
            <div className="popularAuthorContent">
                {authorList}
            </div>
        </div>
    )
}

export default PopularAuthors