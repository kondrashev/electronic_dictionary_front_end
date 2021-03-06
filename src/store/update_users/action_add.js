export const addUserFetchData = (data) => {
    const { url, user, values, setValues } = data;
    const { date } = data.user;
    return async () => {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (response.status === 200) {
            response = await response.json();
            if (response.login) {
                let user = {
                    login: response.login,
                    password: response.password,
                    date: date,
                    role: 'user',
                    categories: []
                }
                localStorage.setItem(response.login, JSON.stringify(user));
                window.location.href = '/?1'
            } else {
                window.location.href = '/?2'
            }
        } else {
            setValues({
                ...values,
                number: 5,
                typeMistake: `Error from server-${response.statusText} №${response.status}!!!`,
                alertMistakes: true
            });
        }
    }
}