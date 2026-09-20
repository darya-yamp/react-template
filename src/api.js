class Api {
    constructor(token) {
        this.path = 'http://localhost:3001';
        this.token = token;
    }
    getProduct(id) {
        return fetch(`${this.path}/products/${id}`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
        .then(response => response.json())
        .then(data => data);
    }

    getProducts() {
        return fetch(`${this.path}/products`, {
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        })
        .then(response => response.json())
        .then(data => data);
    }

    addProduct(product) {
        return fetch(`${this.path}/products/add`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${this.token}`,
                "Content-type": 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(response => response.json())
        .then(data => data);
    }

    updateProduct(id, product) {
        return fetch(`${this.path}/products/update/${id}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${this.token}`,
                "Content-type": 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(response => response.json())
        .then(data => data);
    }

    deleteProduct(id) {
        return fetch(`${this.path}/products/delete/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${this.token}`,
            }
        })
        .then(response => response.json())
        .then(data => data);
    }

    signup(user) { // Регистрация
        return fetch(`${this.path}/signup`, {
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => data);
    }

    signin(user) { // Вход
        return fetch(`${this.path}/signin`, {
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => data);
    }

    showProfile() { // Отображение данных о пользователе 
        return fetch (`${this.path}/users/me`, {
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        })
        .then(response => response.json())
        .then(data => data);
    }
}

export default Api;