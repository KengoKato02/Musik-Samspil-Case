import { postService } from "../../../../services/PostService.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  applicationService,
  ApplicationRequest,
} from "../../../../services/ApplicationService.ts";
import { PostDetails } from "../../../../services/PostService.ts";
import { Button } from "../../../Button.tsx";
import { PostDetailsInfo } from "./PostDetailsInfo.tsx";
import { EnsembleDetails } from "./EnsembleDetails.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store.ts";
import { ApplicationModal } from "../../applications/modals/ApplicationModal.tsx";

export const DetailsComponent = () => {
  const { id } = useParams();
  const [selectedPost, setSelectedPost] = useState<PostDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  console.log("Posts from PostDetailsInfo.tsx", selectedPost);

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  const fetchPost = async (postId: string) => {
    try {
      const data = await postService.getPostById(postId);
      setSelectedPost(data);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleApplyForPost = async (data: ApplicationRequest) => {
  //   if (!selectedPost) return;
  //   await applicationService.applyForPost(selectedPost._id, data);
  // };

  const handleApplicationSubmit = async (data: ApplicationRequest) => {
    if (!selectedPost) return;
    try {
      await applicationService.applyForPost(selectedPost._id, data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to submit application:", error);
    }
  };

  if (!selectedPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-steel-blue" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pt-10">
      <Button
        title="Go back"
        type="button"
        className="text-steel-blue border border-soft-gray bg-white"
        onClick={() => navigate("/")}
      />
      <div className="flex flex-col md:flex-row mt-8 justify-between w-full gap-x-3 items-stretch">
        <div className="md:w-1/2 w-full flex flex-col">
          <PostDetailsInfo
            title={selectedPost.title}
            description={selectedPost.description}
            firstName={selectedPost.author_id.first_name}
            lastName={selectedPost.author_id.last_name}
            website={selectedPost.website_url}
            location={selectedPost.ensemble_id.location}
            type={selectedPost.type}
            createdAt={selectedPost.created_at}
            instruments={selectedPost.ensemble_id.open_positions}
          />
        </div>
        <div className="md:w-1/2 w-full flex flex-col">
          <EnsembleDetails
            name={selectedPost.ensemble_id.name}
            creator={`${selectedPost.author_id.first_name} ${selectedPost.author_id.last_name}`}
            creatorPhone={selectedPost.author_id.phone_number}
            creatorEmail={selectedPost.author_id.email}
            description={selectedPost.ensemble_id.description}
            isActive={selectedPost.ensemble_id.is_active}
            updatedAt={selectedPost.ensemble_id.updatedAt}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          title={isAuthenticated ? "Apply" : "Login to apply"}
          type="button"
          className="text-white bg-steel-blue my-4"
          onClick={() =>
            isAuthenticated ? setIsModalOpen(true) : navigate("/login")
          }
        />
      </div>
      {selectedPost && (
        <ApplicationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          onConfirm={handleApplicationSubmit}
          open_positions={selectedPost.ensemble_id.open_positions || []}
        />
      )}
    </div>
  );
};

// return (
//   <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//     <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex justify-between items-start mb-4">
//           <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
//           <button
//             type="button"
//             className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-steel-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-steel-blue"
//             onClick={() => setIsModalOpen(true)}
//           >
//             Apply Now
//           </button>
//         </div>
//         <p className="text-lg text-gray-600 mb-4">{post.description}</p>
//         {post.website_url && (
//           <a
//             href={post.website_url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-steel-blue hover:underline"
//           >
//             Visit Website
//           </a>
//         )}
//         <div className="mt-4 flex items-center justify-between">
//           <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-steel-blue text-white">
//             {post.type}
//           </span>
//           <span className="text-sm text-gray-500">
//             Posted on {new Date(post.created_at).toLocaleDateString()}
//           </span>
//         </div>
//       </div>
//
//       {post.author_id && (
//         <div className="p-6 border-b border-gray-200 bg-gray-50">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <p className="text-sm text-gray-600">Name</p>
//               <p className="font-medium text-gray-900">
//                 {post.author_id.first_name} {post.author_id.last_name}
//               </p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Email</p>
//               <p className="font-medium text-gray-900">{post.author_id.email}</p>
//             </div>
//             {post.author_id.phone_number && (
//               <div>
//                 <p className="text-sm text-gray-600">Phone</p>
//                 <p className="font-medium text-gray-900">{post.author_id.phone_number}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//
//       {post.ensemble_id && (
//         <div className="p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Ensemble Details</h2>
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">{post.ensemble_id.name}</h3>
//               <p className="text-gray-600">{post.ensemble_id.description}</p>
//             </div>
//
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <h4 className="text-sm font-medium text-gray-900 mb-2">Location</h4>
//                 <p className="text-gray-600">{post.ensemble_id.location.address}</p>
//                 <p className="text-gray-600">
//                   {post.ensemble_id.location.city}, {post.ensemble_id.location.country}
//                 </p>
//               </div>
//
//               <div>
//                 <h4 className="text-sm font-medium text-gray-900 mb-2">Open Positions</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {post.ensemble_id.open_positions.map((position) => (
//                     <span
//                       key={position}
//                       className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-steel-blue bg-opacity-10 text-steel-blue"
//                     >
//                       {position}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//
//             <div className="flex items-center justify-between mt-6">
//               <span
//                 className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//                   post.ensemble_id.is_active
//                     ? "bg-green-100 text-green-800"
//                     : "bg-red-100 text-red-800"
//                 }`}
//               >
//                 {post.ensemble_id.is_active ? "Active" : "Inactive"}
//               </span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//
//     <ApplicationModal
//       isOpen={isModalOpen}
//       onClose={() => setIsModalOpen(false)}
//       onConfirm={handleApplyForPost}
//       open_positions={post.ensemble_id?.open_positions || []}
//     />
//   </div>
