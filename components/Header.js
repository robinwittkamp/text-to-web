import { faPager } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => (
  <header className="z-50 flex h-12 w-full min-w-[20rem] flex-none items-center border-b border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800 md:h-[4rem]">
    <div className="px-4 sm:px-8">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <FontAwesomeIcon
          icon={faPager}
          className="text-xl text-neutral-700 dark:text-neutral-200"
        />
        <span className="text-xl font-bold text-neutral-700 dark:text-neutral-200">TextToWeb</span>
      </div>
    </div>
  </header>
);

export default Header;
