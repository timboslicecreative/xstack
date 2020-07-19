import Thumbor from "thumbor";

const THUMBOR_KEY = process.env.THUMBOR_KEY;
const THUMBOR_URL = process.env.THUMBOR_URL;

const generator = new Thumbor(THUMBOR_KEY, THUMBOR_URL);

export const thumborUrl = (image = {}, adjustments = {}) => {
    const {hash = null, ext = null} = image;
    const {width = 0, height = 0, filters = {}} = adjustments;

    let filtersArray = [];
    let filtersString = '';
    for (let filter in filters) filtersArray.push(`${filter}(${filters[filter].join(',')})`);
    if (filtersArray.length) filtersString = `/filters:${filtersArray.join(':')}`;

    return `${THUMBOR_URL}/unsafe/${width}x${height}${filtersString}/${hash}${ext}`;
};

export const thurl = (imageUri, {width = 0, height = 0, filters = {}} = {}) => (
    generator.setImagePath(imageUri).resize(width, height).buildUrl()
);

