

function App(){
  return <div>
    <LinkedInPost name={"Abhisek"} content ={"Hi , I'm Abhisek . This is my first LinkedIn post."} />
     <LinkedInPost name={"Raman"} content ={"shalalallll"} />

  </div>
}

//components
// functions => arguments as input
//components => props as a input
function LinkedInPost(props):any{
 return <div style={{margin: 10 , padding: 20  , border: "1px solid black", backgroundColor: "green" , borderRadius: 6 }}>
  <div>
   { props.name}
  </div>
  <div>
    {props.content}
  </div>
</div>
}

export default App