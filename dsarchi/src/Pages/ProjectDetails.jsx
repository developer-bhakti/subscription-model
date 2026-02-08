import { ArrowLeft, Users, Zap } from "lucide-react";

import React from "react";
import { projectsData } from "../data/projectsData";
import { Link, useParams } from "react-router-dom";
import ImageSlider from "../Components/ImageSlider";

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Project Not Found
          </h1>
          <p className="text-slate-400 mb-8">
            The project you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  const statusColor =
    project.status === "Completed" ? "bg-emerald-600" : "bg-amber-600";

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header Section */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            <span>Back to Projects</span>
          </Link>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl mb-2">
                {project.title}
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl">
                {project.description}
              </p>
            </div>
            <span
              className={`${statusColor} rounded-full px-4 py-2 text-sm font-semibold text-white flex-shrink-0 mt-1`}
            >
              {project.status}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Image Slider */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-lg">
          <ImageSlider images={project.images} title={project.title} />
        </div>

        {/* Content Grid */}
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content - Left */}
          <div className="lg:col-span-2 space-y-12">
            {/* Full Description */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Project Overview
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {project.fullDescription}
              </p>
            </section>

            {/* Technologies */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Zap size={20} className="text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Technologies Used
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Right */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <section className="rounded-xl bg-white p-8 shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-6">
                Project Stats
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-2">
                    Team Size
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {project.team.length}
                  </p>
                </div>
                <div className="border-t border-slate-200 pt-6">
                  <p className="text-sm font-medium text-slate-500 mb-2">
                    Technologies
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {project.technologies.length}
                  </p>
                </div>
              </div>
            </section>

            {/* Team Members */}
            <section className="rounded-xl bg-white p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-6">
                <Users size={20} className="text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  Team Members
                </h3>
              </div>
              <ul className="space-y-4">
                {project.team.map((member) => (
                  <li key={member} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                      {member.charAt(0)}
                    </div>
                    <span className="text-slate-700 font-medium text-sm">
                      {member}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Call to Action */}
            <button className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetails;
