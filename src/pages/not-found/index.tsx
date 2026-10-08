// import ExtendedButton from "@/components/extended-components/extended-button";
// import { PATH } from "@/constant/path";
// import { useNavigate } from "react-router-dom";

export default function NotFound() {
//   const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-130px)]">
      <div className="flex flex-col items-center">
        <h1 className="text-[8rem] font-extrabold text-primary-500">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 ">
          Oops! Page not found
        </h2>
        <p className="mt-2 text-gray-500">
          The page you are looking for does not exist or has been moved.
        </p>
        {/* <ExtendedButton
          text="Go Back Home"
          className="mt-5"
          onClick={() => navigate(PATH.dashboard.dashboard)}
        /> */}
      </div>
    </div>
  );
}
