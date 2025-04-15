import { type SVGProps } from "react";
import { twMerge } from "tailwind-merge";

export default function SearchIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      className={twMerge("text-txt-primary", className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M24.6714 23.0942L20.8949 19.3287C22.1134 17.7764 22.7745 15.8595 22.7721 13.886C22.7721 12.1285 22.2509 10.4105 21.2745 8.94922C20.2981 7.48792 18.9103 6.34897 17.2866 5.67641C15.6629 5.00385 13.8762 4.82788 12.1525 5.17075C10.4287 5.51362 8.84539 6.35993 7.60266 7.60266C6.35993 8.84539 5.51362 10.4287 5.17075 12.1525C4.82788 13.8762 5.00385 15.6629 5.67641 17.2866C6.34897 18.9103 7.48792 20.2981 8.94922 21.2745C10.4105 22.2509 12.1285 22.7721 13.886 22.7721C15.8595 22.7745 17.7764 22.1134 19.3287 20.8949L23.0942 24.6714C23.1974 24.7755 23.3203 24.8582 23.4556 24.9146C23.591 24.971 23.7362 25 23.8828 25C24.0294 25 24.1746 24.971 24.31 24.9146C24.4453 24.8582 24.5682 24.7755 24.6714 24.6714C24.7755 24.5682 24.8582 24.4453 24.9146 24.31C24.971 24.1746 25 24.0294 25 23.8828C25 23.7362 24.971 23.591 24.9146 23.4556C24.8582 23.3203 24.7755 23.1974 24.6714 23.0942ZM7.22151 13.886C7.22151 12.5679 7.61238 11.2794 8.34468 10.1834C9.07699 9.08745 10.1178 8.23324 11.3356 7.72882C12.5534 7.22439 13.8934 7.09241 15.1862 7.34957C16.479 7.60672 17.6665 8.24145 18.5986 9.1735C19.5306 10.1056 20.1653 11.2931 20.4225 12.5858C20.6796 13.8786 20.5477 15.2186 20.0432 16.4364C19.5388 17.6542 18.6846 18.6951 17.5886 19.4274C16.4927 20.1597 15.2041 20.5505 13.886 20.5505C12.1185 20.5505 10.4233 19.8484 9.1735 18.5986C7.92366 17.3487 7.22151 15.6536 7.22151 13.886Z"
        fill="currentColor"
      />
    </svg>
  );
}
