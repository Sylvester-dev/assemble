import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'

const Home = ()=>{
  const [data,setData] = useState([])
  const {state,dispatch} = useContext(UserContext)

  useEffect(()=>{
    fetch('./allpost',{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result =>{
      console.log(result)
      setData(result.posts)
    })
  },[])

  const likePost = (id)=>{
     fetch('/like',{
       method:"put",
       headers:{
         "Content-Type":"application/json",
         "Authorization":"Bearer "+localStorage.getItem("jwt")
       },
       body:JSON.stringify({
         postId:id
       })
     }).then(res=>res.json())
     .then(result=>{
      //  console.log(result);
      const newData = data.map(item=>{
        if(item._id==result._id){
          return result
        }else{
          return item
        }
      })
      setData(newData)
     }).catch(err=>{
       console.log(err);
     })
  }

  const unlikePost = (id)=>{
     fetch('/unlike',{
       method:"put",
       headers:{
         "Content-Type":"application/json",
         "Authorization":"Bearer "+localStorage.getItem("jwt")
       },
       body:JSON.stringify({
         postId:id
       })
     }).then(res=>res.json())
     .then(result=>{
      //  console.log(result);
      const newData = data.map(item=>{
        if(item._id===result._id){
          return result
        }else{
          return item
        }
      })
      setData(newData)
     }).catch(err=>{
      console.log(err);
    })
  }
  
  const makeComment = (text,postId)=>{
    fetch('/comment',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt"),
      },
      body:JSON.stringify({
        postId,
        text
      })
    }).then(res=>res.json())
    .then(result=>{
      console.log(result);
      const newData = data.map(item=>{
        if(item._id===result._id){
          return result
        }else{
          return item
        }
      })
      setData(newData)
    }).catch(err=>{
      console.log(err);
    })
  }

  const deletepost = (postid)=>{
    fetch(`/deletepost/${postid}`,{
      method:"delete",
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      console.log(result);
      const newData = data.filter(item=>{
        return (item._id != result._id)
      })
      setData(newData)
    })
  }
  return(
    <div className="home">
      {
        data.map(item=>{
          return(
            <div className="card home-card" key={item._id}>
                <h5 style={{padding:"5px 10px 0px 10px"}}><Link to={item.postedBy._id != state._id ?"/profile/"+item.postedBy._id : "/profile/"}><i class="material-icons">done_all</i> {item.postedBy.name}</Link> {item.postedBy._id === state._id && <i className="material-icons" style={{float:'right'}} onClick={()=>deletepost(item._id)}>delete</i>} </h5>
                <div className="card-image">
                  <img src={item.photo}/>
                </div>
                <div className="card-content">
            

              
                {item.likes.includes(state._id) 
                ?
                <i className="material-icons"  style={{color:"red"}} onClick={()=>{unlikePost(item._id)}}>favorite</i>
                :
                <i className="material-icons" onClick={()=>{likePost(item._id)}}>favorite</i>}
                
                  <h6>{item.likes.length} likes</h6>
                  <h5>{item.title}</h5>
                  <p>{item.body}</p>
                  <br/>
                  {
                    item.comments.map(record=>{
                      return(
                        <h6 key={record._id}><span style={{fontWeight:"bold",fontFamily:"sans-serif"}}>{record.postedBy.name}</span> <span style={{fontWeight:"200",fontFamily:"sans-serif"}}>{record.text}</span></h6>
                      )
                    })
                  }
                  <form onSubmit={(e)=>{
                    e.preventDefault()
                    makeComment(e.target[0].value,item._id)
                  }}>
                      <input type="text" placeholder="Comment..."></input>
                  </form>
                  
                </div>
            </div>
          )
        })
      }

    </div>
  )
}

export default Home