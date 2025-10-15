import axios from "axios";
import "./Story.scss";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";

export default function Story() {
  const [storyPath, setStoryPath] = useState("");
  const [storyType, setStoryType] = useState("");
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  //Cookie
  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");

  const id = window.location.pathname.split("/").slice(-1)[0];

  useEffect(() => {
    const getStory = async () => {
        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/getStoryById/${id}`, {
                headers: {
                    Authorization: "Bearer " + getToken,
                },
            });
            setStoryPath(response.data[0].file_path);
            setStoryType(response.data[0].file_type);
        } catch (err){
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    getStory();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="view-story">
      {storyType === "image" ? (
        <img src={`http://127.0.0.1:8000/storage/${storyPath}`} alt="" className="story-in-view" />
      ) : (
        <video src={`http://127.0.0.1:8000/storage/${storyPath}`} controls className="story-in-view" />
      )}
    </div>
  );
}
