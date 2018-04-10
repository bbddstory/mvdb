interface regexInterface {
    [key: string]: RegExp
}

const regex: regexInterface = {
    director: /^[a-zA-Z\s,\']+$/,
    engTitle: /^[a-zA-Z0-9,.:\'\-\s]+$/,
    imdb_id: /^[t]{2}[0-9]{7}$/,
    index: /^[0-9]+$/,
    origTitle: /^[^`~!@#$%^&*()_=+\[\]\{\}\\|;"<>/?]+$/,
    plot: /^[a-zA-Z0-9,."'()!\\-\s]+$/,
    poster: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
    rating: /^[0-9]{1}.[0-9]{1}$/,
    runtime: /^([0-9]{1,2}min|[1-9]{1}h|[1-9]{1}h[\s]{1}[0-9]{1,2}min)$/,
    status: /^[0-9]{1}$/,
    year: /^[0-9]{4}$/
}

export default regex;