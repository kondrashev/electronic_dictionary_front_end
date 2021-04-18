export const deleteUsersFetchData = (data) => {
    const { url, userListId, setSelected, values, setValues } = data;
    return async () => {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userListId)
        });
        response = await response.json();
        setSelected([]);
        setValues({
            ...values,
            listUsers: response
        });
        response.map((login) => {
            for (let i = 0; i < localStorage.length; i++) {
                if (login === localStorage.key(i)) {
                    localStorage.removeItem(localStorage.key(i));
                }
            }
        })
    }
}