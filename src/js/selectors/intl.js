import { createDeepEqualSelector } from './common';
import locales from 'utils/locales';

export const intlSelector = state => state.status.intl;

export const intlPropsSelector = createDeepEqualSelector(
    [intlSelector],
    intl => ({
        ...intl,
        messages: locales[intl.locale]
    })
);
