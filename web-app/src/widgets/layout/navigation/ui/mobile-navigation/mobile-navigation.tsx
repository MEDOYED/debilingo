import { Link } from "react-router-dom";

import { DictionaryAdd } from "@/shared/ui/icons";

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
            <DictionaryAdd />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavigation;
