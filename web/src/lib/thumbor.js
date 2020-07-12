const HOST = process.env.THUMBOR_URL;

export const thumborUrl = (image={}, adjustments={}) => {
    const {hash=null, ext=null} = image;
    const {width=0, height=0, filters={}} = adjustments;

    let filtersArray = [];
    let filtersString = '';
    for (let filter in filters) filtersArray.push(`${filter}(${filters[filter].join(',')})`);
    if (filtersArray.length) filtersString = `/filters:${filtersArray.join(':')}`;

    return `${HOST}/unsafe/${width}x${height}${filtersString}/${hash}${ext}`;
};

