import { Link, useLocation } from "react-router";

/**
 * GNB 네비게이션 목록
 */
const NAV = [
  {
    label: "도서 검색",
    to: "/",
  },
  {
    label: "내가 찜한 책",
    to: "/wishlist",
  },
];

export default function GNB() {
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 h-20 flex bg-[#fffff] w-full items-center px-40 bg-white z-[10]">
      <span className="title1">
        <Link to="/">CERTICOS BOOKS</Link>
      </span>
      <nav className="mx-auto">
        <ul className="flex gap-14">
          {NAV.map((el) => (
            <li
              className={`body1 ${
                el.to === pathname ? "border-primary border-b-1" : ""
              }`}
              key={el.to}
            >
              <Link to={el.to}>{el.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
