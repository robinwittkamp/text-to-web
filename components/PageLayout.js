import PropTypes from 'prop-types';

import Header from './Header';

const PageLayout = ({ children }) => (
  <main className="flex h-screen w-full min-w-[20rem] flex-col">
    <Header />
    {children}
  </main>
);

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
