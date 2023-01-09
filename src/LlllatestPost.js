import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function LatestPost(props) {
  const [active, setActive] = useState(false);

  const [likeCount, setLikeCount] = useState(0);

  const handleLikeClick = () => {
    setActive(!active);
    setLikeCount(likeCount + 1);
  };
  
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    fetch(props.apiUrl + "posts/latest")
      .then((response) => response.json())
      .then((response) => {
        setLatest(response);
        setLikeCount(response[0].likes);
      });
  }, []);

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
            <h3>{this.getCounter()}</h3>
            
            <ul className="actions">
              <li>
              <button onClick={this.increment}><Link to={"posts/" + post._id.$oid}>Read more...</Link> </button> 
                <h3><i class="fa fa-eye"> {post.view} </i></h3>
              
              </li>
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
