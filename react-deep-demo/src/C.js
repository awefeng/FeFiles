import React, {useContext} from 'react'
import {XContext} from './App' 
function C(){
    const x = useContext(XContext)
    return <div>
        {x.name}
    </div>
}

export default C