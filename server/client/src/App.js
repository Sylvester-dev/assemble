import React,{useEffect,createContext,useReducer,useContext} from 'react'
import Navbar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route, Switch, useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/Signin'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPost from './components/screens/SubscribesUserPosts'
export const UserContext = createContext()

const Routing = ()=>{   //We can only use "history" if its rapped in <browserRouter> so we put all route here

 const history = useHistory()
 const {state,dispatch} = useContext(UserContext)
 useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
       dispatch({type:"USER",payload:user})  //if user exit app without logout then we update our state
    }else{
       history.push('/signin')
    }
 },[])


 return(                //Switch make sure at one time one route is only active
    <Switch>  
       <Route exact path="/">
          <Home/>
       </Route>
       <Route path="/signin">
          <Signin/>
       </Route>
       <Route path="/signup">
          <Signup/>
       </Route>
       <Route exact path="/profile">
          <Profile/>
       </Route>
       <Route path="/create">
          <CreatePost/>
       </Route>
       <Route path="/profile/:userid">
          <UserProfile />
       </Route>
       <Route path="/myfollowingpost">
          <SubscribedUserPost />
       </Route>
    </Switch>
 )
}


function App() {
   const [state,dispatch] = useReducer(reducer,initialState)
  return (                                          //now we have access to state and dispatch in all component
   <UserContext.Provider value ={{state,dispatch}}>  
    <BrowserRouter>
       <Navbar />
       <Routing />
    </BrowserRouter>
   </UserContext.Provider>

  
  );
}

export default App;
