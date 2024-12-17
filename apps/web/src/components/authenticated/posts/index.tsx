import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostDetails, postService, SearchCriteria } from "../../../services/PostService.ts";
import { Container } from "../../Container.tsx";
import { Headline } from "../../Headline.tsx";
import { PostGrid } from "./post-card/PostGrid.tsx";
import SearchPosts from "./SearchPosts.tsx";

export const UserPosts = () => {
  const [posts, setPosts] = useState<PostDetails[]>([]);
  const [showingPosts, setShowingPosts] = useState<PostDetails[]>([]);
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(null);
  const [searchObj, setSearchObj] = useState<object | null>({
    location: "",
    instrument: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);
  useEffect(() => {
    setShowingPosts(posts);
  }, [posts]);

  const fetchPosts = async () => {
    const posts = await postService.getPosts();
    setPosts(posts);
  };

  const searchPost = async (searchCriteria: SearchCriteria) => {
    console.log(searchCriteria);
    try {
      const data = await postService.searchPost(searchCriteria);
      setShowingPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const handlePostClick = (id: string) => {
    navigate(`/post-details/${id}`);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedInstrument(event.target.value);
    searchPost({ instrument: event.target.value });

    setSearchObj({ ...searchObj, [event.target.name]: event.target.value });
  };

  return (
    <div className="h-full">
      <Container className="my-10">
        <Headline title="Posts" textColor="text-steel-blue" />
        <SearchPosts
          selectedInstrument={selectedInstrument}
          handleSelectChange={handleSelectChange}
          setSelectedInstrument={setSelectedInstrument}
          searchPost={searchPost}
        />
      </Container>

      <div className="bg-[#F5F5F5] pt-3">
        <Container className="my-10">
          <PostGrid posts={showingPosts} handlePostClick={handlePostClick} />
        </Container>
      </div>
    </div>
  );
};
