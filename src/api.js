class Api {
    constructor(token) {
        this.path = 'http://localhost:3001';
        this.token = token;
    }
    getProduct() {

    }
    getProducts() {
        return fetch(`${this.path}/products`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
        .then(response => response.json())
        .then(data => data);
    }
    addProduct() {

    }
    updateProduct() {

    }
    deleteProduct() {
        
    }
    signup() { // Ргистрация

    }
    signin() { // Вход

    }
}

export default Api;