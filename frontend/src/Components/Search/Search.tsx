import React, { useState } from 'react'

type Props = {}

const Search : React.FC<Props> = (props: Props):JSX.Element => {
    const[search, setSearch] = useState<string>("");

    const onclick = (e: any) =>{
        setSearch(e.target.value);
        console.log(e);
    }
    return (
    <div>
        <input value={search} onChange={(e)=> onclick(e)}></input>
    </div>
  )
}

export default Search