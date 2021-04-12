export const getAllCategories = async (props) => {
    const { values, setValues } = props;
    let response = await fetch(`${'https://cors-anywhere.herokuapp.com/'}${`https://specialdictionary.herokuapp.com/get/all/categories?userName=${sessionStorage.userName}`}`);
    response = await response.json();
    setValues({
        ...values,
        allCategories: response
    });
};