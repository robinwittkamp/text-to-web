import NextHead from 'next/head';
import PropTypes from 'prop-types';

const Head = ({ title, og, description }) => (
  <NextHead>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="robots" content="noindex, nofollow" />
    {/* <link rel="icon" href="/favicon.ico" /> */}
  </NextHead>
);

Head.propTypes = {
  title: PropTypes.string,
  og: PropTypes.string,
  description: PropTypes.string,
};

Head.defaultProps = {
  title: 'Text to Web',
  og: 'og.png',
  description: 'A web app that uses language model APIs to generate web content from text input.',
};

export default Head;
