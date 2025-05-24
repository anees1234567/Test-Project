import React from 'react'
import Autocomplete from '../../AutoComplete/Autocomplete'
import { Button } from '@mui/material'

const Home = () => {
  const [show,setShow] = React.useState(false)

  return (
 <>
      <div>Home</div>
      <Autocomplete/>
      {show && <div>{data.age}</div>}
      <Button onClick={()=>{setShow(true)}}>click</Button>
 </>
  )
}

export default Home