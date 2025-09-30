import { Link } from "react-router-dom";

import { ArrowLongRight } from "@/shared/ui/icons";

const DesktopNavigation = () => {
  return ( 
    <nav>
      <ul>
        <li>
          <Link to={"/"}>
            <ArrowLongRight />
          </Link>
        </li>

        <li>
          <Link to={"/"}>
            <ArrowLongRight />
          </Link>
        </li>
      </ul>
    </nav>
  )
};

export default DesktopNavigation;
