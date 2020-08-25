// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License for license information.

import React from 'react';

export type Ref = SVGSVGElement;

interface Props {
    id?: string;
}

const IncidentIcon = React.forwardRef<Ref, Props>((props, forwardedRef) => (
    <svg
        id={props?.id}
        ref={forwardedRef}
        width='14'
        height='17'
        viewBox='0 0 14 17'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M13.75 7.81177C13.75 9.17114 13.457 10.4836 12.8711 11.7493C12.2852 13.0149 11.4766 14.093 10.4453 14.9836C9.41406 15.8743 8.26562 16.4836 7 16.8118C5.73438 16.4836 4.58594 15.8743 3.55469 14.9836C2.52344 14.093 1.71484 13.0149 1.12891 11.7493C0.542969 10.4836 0.25 9.17114 0.25 7.81177V3.31177L7 0.28833L13.75 3.31177V7.81177ZM7 15.3C7.91406 15.0422 8.76953 14.5383 9.56641 13.7883C10.3867 13.0383 11.0312 12.1477 11.5 11.1165C11.9922 10.0852 12.2383 9.03052 12.2383 7.95239V4.26099L7 1.94067L1.76172 4.26099V7.95239C1.76172 9.03052 1.99609 10.0852 2.46484 11.1165C2.95703 12.1477 3.60156 13.0383 4.39844 13.7883C5.21875 14.5383 6.08594 15.0422 7 15.3ZM6.26172 4.78833H7.73828V9.28833H6.26172V4.78833ZM6.26172 10.8H7.73828V12.3118H6.26172V10.8Z'
            fill='currentColor'
        />
    </svg>
));

export default IncidentIcon;
