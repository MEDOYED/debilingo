import { Link } from "react-router-dom";

import { ArrowLongRight, DictionaryAdd } from "@/shared/ui/icons";

const MobileNavigation = () => {
  return (
    <nav aria-label="Головна навігація">
      <ul>
        <li>
          <Link to="/">
            <DictionaryAdd />
          </Link>
        </li>

        <li>
          <Link to="/profile">
            <ArrowLongRight />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavigation;
