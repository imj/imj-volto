/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';
import { Image } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { settings } from '~/config';

import LogoImage from '@package/components/Logo/LogoIMJ2020.png';

const messages = defineMessages({
  site: {
    id: 'Home',
    defaultMessage: 'Home',
  },
});

/**
 * Logo component class.
 * @function Logo
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component.
 */
const Logo = () => {
  const lang = useSelector((state) => state.intl.locale);
  const intl = useIntl();

  return (
    <Link
      to={settings.isMultilingual ? `/${lang}` : '/'}
      title={intl.formatMessage(messages.site)}
    >
      <Image
        src={LogoImage}
        alt="Italian Magic Judges"
        title="Italian Magic Judges"
        height={64}
      />
    </Link>
  );
};

export default Logo;
