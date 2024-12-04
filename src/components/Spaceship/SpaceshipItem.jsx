import { Button, Chip, Divider, Link } from "@mui/material";
import moment from "moment";
import { useState } from "react";

export const SpaceshipItem = ({ spaceship }) => {
  const [open, setOpen] = useState(false);
  const {
    mission_name,
    upcoming,
    launch_success,
    launch_date_local,
    links,
    details,
  } = spaceship;

  const status = upcoming
    ? { label: "Upcoming", color: "primary" }
    : launch_success
    ? { label: "Success", color: "success" }
    : { label: "Failed", color: "error" };

  const formattedDate = launch_date_local
    ? moment(launch_date_local).fromNow()
    : null;

  const missionPatch = links?.mission_patch_small ? (
    <img src={links.mission_patch_small} alt={mission_name} className="w-20" />
  ) : (
    "No image available ..."
  );

  const articleLink = links?.article_link && (
    <Link
      target="_blank"
      underline="none"
      href={links.article_link}
      className="cursor-pointer"
    >
      Article
    </Link>
  );

  const videoLink = links?.video_link && (
    <Link
      target="_blank"
      underline="none"
      href={links.video_link}
      className="cursor-pointer"
    >
      Video
    </Link>
  );

  return (
    <div className="w-full mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <div className="flex items-center">
          <h2 className="text-lg font-bold">{mission_name}</h2>
          <Chip
            size="small"
            label={status.label}
            color={status.color}
            className="ml-4"
          />
        </div>

        <div className={`${open ? "flex" : "hidden"} flex-col`}>
          <div className="flex w-full space-x-2 text-sm pt-1">
            <span className="text-gray-500">{formattedDate}</span>
            {articleLink}
            {articleLink && videoLink && (
              <span className="text-gray-500"> | </span>
            )}
            {videoLink}
          </div>
          <div className="flex items-center p-3">
            {missionPatch}
            <div className="text-gray-700 px-7 text-left max-h-[250px] overflow-hidden line-clamp-4">
              {details || "No details provided..."}
            </div>
          </div>
        </div>

        {open && <Divider className="mt-5" />}
        <div className="flex justify-start mt-4">
          <Button
            onClick={() => setOpen((prevState) => !prevState)}
            variant="contained"
            color="primary"
          >
            {open ? "Hide" : "View"}
          </Button>
        </div>
      </div>
    </div>
  );
};
