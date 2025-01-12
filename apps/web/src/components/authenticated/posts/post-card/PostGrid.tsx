import { PostDetails } from "../../../../services/PostService.ts";
import { PostCard } from "./PostCard.tsx";

interface PostGridProps {
  posts: PostDetails[];
  handlePostClick: (id: string) => void;
  isPostCardAdmin?: boolean;
  onDeleteButtonClick?: (id: string) => void;
}

export const PostGrid = ({
  posts,
  handlePostClick,
  onDeleteButtonClick,
  isPostCardAdmin,
}: PostGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:mt-10">
      {posts.map((post) => (
        <div
          key={post._id}
          onClick={() => handlePostClick(post._id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handlePostClick(post._id);
            }
          }}
        >
          <PostCard
            key={post._id || "No id"}
            title={post.title || "No title"}
            firstName={post.author_id?.first_name || "No first name"}
            lastName={post.author_id?.last_name || "No last name"}
            description={post.description || "No description"}
            type={post.type || "No type"}
            website={post.website_url || "No website"}
            createdAt={post.created_at || "No created at"}
            instruments={post.ensemble_id.open_positions || "No instruments"}
            location={`${post.ensemble_id.location.city || "No city"}, ${post.ensemble_id.location.country || "No country"}`}
            isPostCardAdmin={isPostCardAdmin}
            onDeleteButtonClick={() => onDeleteButtonClick?.(post._id)}
          />
        </div>
      ))}
    </div>
  );
};
