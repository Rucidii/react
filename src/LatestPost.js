import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function LatestPost(props) {

  const [active, setActive] = useState(false);

  const [likeCount, setLikeCount] = useState(0);
  // const { postId } = useParams();


  const handleLikeClick = () => {
    setActive(!active);
    setLikeCount(likeCount + 1);
  };


  const [latest, setLatest] = useState([]);

  useEffect(() => {
    // if (postId) uri += _id.$oid;
    // if (name) uri += "author/" + name;
    
    fetch(props.apiUrl + "posts/latest")
      .then((response) => response.json())
      .then((response) => {
        setLatest(response);
        setLikeCount(response[0].view);
      });
  },[]);

  return (
    <section>
      <header className="major">
        <h2>Latest Posts...</h2>
      </header>
      <div className="posts">
        {latest.map((post) => (
          <article key={post._id.$oid}>
            <h3>{post.title}</h3>
            <p>{post.resume}</p>
           
            <ul className="actions">
              <li>
              <Link to={"posts/" + post._id.$oid}>Read more...</Link>
              <ul>
                <button id="thumbs-up" style={{ backgroundColor: active ? "#BFEAF5" : "white" }}>
                 <i class="fa fa-eye"> 
                   {post.view}
                 </i>
                </button>

                {/* <button
                  id="thumbs-up"
                  style={{ backgroundColor:"#BFEAF5"}}
                  onClick={handleLikeClick}
                >
                  <i
                    class="fa fa-eye"
                    style={{ color: "salmon" }}
                  >
                    <span class="count">{likeCount}</span>
                  </i>
                </button> */}

              </ul>
              </li>
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
