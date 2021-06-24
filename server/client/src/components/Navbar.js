import React,{useContext} from 'react'
import {Link,useHistory} from "react-router-dom"  //link instead of a tag it prevent reload
import {UserContext} from '../App'

const Navbar = ()=>{
 const {state,dispatch} = useContext(UserContext)
 const history = useHistory()

 const renderList = ()=>{
   if(state){               //if user state is there then return array of profile/post else if not then only of signin/up of nav will show
     return [
      <li><Link to="/profile" className="white-text" data-toggle="tooltip" data-placement="bottom" title="Profile"><i class="material-icons">account_circle</i></Link></li>,
      <li><Link to="/create" className="white-text" data-toggle="tooltip" data-placement="bottom" title="Create New Post"><i className="material-icons">post_add</i></Link></li>,
      <li><Link to="/myfollowingpost" className="white-text" data-toggle="tooltip" data-placement="bottom" title="Followers Post"><i className="material-icons">whatshot</i></Link></li>,
      <li><Link to="https://www.worldometers.info/coronavirus/" className="white-text" data-toggle="tooltip" data-placement="bottom" title="Covid Update"><i className="material-icons">coronavirus</i></Link></li>,
      <button className="btn-floating btn-large waves-effect waves-light black" data-toggle="tooltip" data-placement="bottom" title="LogOut"
      onClick={()=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        history.push('/signin')
        }}
      ><i class="material-icons">power_settings_new</i></button>
     ]
   }else{
     return [
      <li><Link to="/signin" className="white-text" data-toggle="tooltip" data-placement="bottom" title="SignIn">Signin</Link></li>,
      <li><Link to="/signup" className="white-text" data-toggle="tooltip" data-placement="bottom" title="SignUp">SignUp</Link></li>
     ]
   }
 }

  return(
    <div className="navbar-fixed">
    <nav>
 
    <div className="nav-wrapper black nav_bar">
      <Link to={state?"/":"/signin"} className="brand-logo left grey-text"><i class="material-icons">flutter_dash</i>Assemble</Link>
      <ul id="nav-mobile" className="right">
         {renderList()}
      </ul>
    </div>

  </nav>
  </div>
  )
}

export default Navbar