export async function getNewContent(props) {
    const { url, setGetContent } = props;
    let response = await fetch(url);
    response = await response.json();
    setGetContent(response);
}
export async function getCountPages(props) {
    const { showListCategories, showListWords, url, setCountCategories, setCountWords } = props;
    let response = await fetch(url);
    response = await response.json();
    if (showListCategories === true) {
        setCountCategories(
            response % 5 > 0 ? Math.round(response / 5) + 1 : Math.round(response / 5)
        );
    } else if (showListWords === true) {
        setCountWords(
            response % 24 > 0 ? Math.round(response / 24) + 1 : Math.round(response / 24)
        );
    }
}