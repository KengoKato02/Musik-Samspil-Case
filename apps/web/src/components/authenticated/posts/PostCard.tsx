import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGlobe, faMusic } from "@fortawesome/free-solid-svg-icons";
import musicImage from "../../../assets/images-svg/music.svg";

interface PostCardProps {
  title: string;
  description: string;
  website: string;
  instruments: string[];
  location: string;
  className?: string;
}

export const PostCard = ({ website, instruments, className }: PostCardProps) => {
  return (
    <div className={`bg-white rounded-[10px] border border-soft-gray shadow ${className}`}>
      <div className="px-4 pt-4">
        <p className="text-base font-bold text-steel-blue">
          Violinist søger en klarinetspiller til et experimentelt duoprojekt
        </p>
        <div className="mt-2">
          <div className="flex items-start w-full">
            <div>
              <FontAwesomeIcon icon={faUser} className="text-medium-gray mr-3 text-sm" />
              <span className="text-medium-gray text-sm">Patrik Hoferica</span>
            </div>
          </div>
          <div>
            <FontAwesomeIcon icon={faMusic} className="text-medium-gray mr-3 text-sm" />
            {instruments.map((instrument) => (
              <span key={instrument} className="text-medium-gray text-sm">
                {instrument}
              </span>
            ))}
          </div>
          <div className="flex justify-between">
            <div>
              <FontAwesomeIcon icon={faGlobe} className="text-medium-gray mr-3 text-sm" />
              <a
                href={website}
                className="text-medium-gray text-sm hover:underline truncate"
                title={website}
              >
                www.website.com
              </a>
            </div>
            <div>
              <img src={musicImage} alt="music" className=" object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center bg-light-gray border-t rounded-b-[10px]">
        <div className="pl-4 py-2">
          <span className="text-medium-gray text-sm">Copenhagen</span>
        </div>
      </div>
    </div>
  );
};
