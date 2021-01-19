export async function getNewContent(props) {
    const { url, setGetContent } = props;
    let response = await fetch(url);
    response = await response.json();
    setGetContent(response);
}
export async function getCountPages(props) {
    const { url, range, setCountItems } = props;
    let response = await fetch(url);
    response = await response.json();
    setCountItems(
        response % range > 0 ? Math.round(response / range) + 1 : Math.round(response / range)
    )
}