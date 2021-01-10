const filterXss = (str) => {
    if (typeof str !== 'string') {
        return str
    }
    str = str.replace(/\</g, '&gt;').replace(/\>/, '&lt;').replace(/\"/, '&quot;')
    return str
}
