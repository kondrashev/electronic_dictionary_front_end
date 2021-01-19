export async function getNewContent(props) {
    const { url, setGetContent } = props;
    let response = await fetch(url);
    response = await response.json();
    setGetContent(response);
}
export async function getCountPages(props) {
    const { url, range, setCountCategories, setCountWords } = props;
    let response = await fetch(url);
    response = await response.json();
    range == 5 && setCountCategories(response % range > 0 ? Math.round(response / range) + 1 : Math.round(response / range));
    range == 24 && setCountWords(response % range > 0 ? Math.round(response / range) + 1 : Math.round(response / range));
}