import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({
  title,
  description,
  image,
  link,
  imageAlt = "Project preview",
}) => {
  return (
    <Link to={link}>
      <div className="group h-full overflow-hidden rounded-lg border border-slate-800 bg-slate-950 transition-all duration-300 hover:border-slate-600 hover:shadow-lg hover:shadow-slate-900/50">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-slate-900">
          <img
            src={image || "/placeholder.svg"}
            alt={imageAlt}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content Container */}
        <div className="flex flex-col gap-3 p-6">
          {/* Title */}
          <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-blue-400">
            {title}
          </h3>

          {/* Description */}
          <p className="flex-grow text-sm text-slate-400 line-clamp-2">
            {description}
          </p>

          {/* Link Button */}
          <div className="flex items-center gap-2 pt-2 text-sm font-medium text-blue-400 transition-all duration-300 group-hover:gap-3">
            <span>View Project</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
