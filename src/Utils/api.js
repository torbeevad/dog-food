const url = "https://api.react-learning.ru"
export const getProducts = () => {
    return fetch(`${url}/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDc0YmUzNWUwYmYyYzUxOWJjM2EwNDEiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjg1MzcyNjM3LCJleHAiOjE3MTY5MDg2Mzd9.oLZ9-C_BxpZfHGFZME63UoVi76OJQgwosZpjEhIiJnI"
        }
    }).then(res => res.json().then(res => res.products))
}

export const searchProducts = (path) => {
    return fetch(`${url}/products/search?query=${path}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDc0YmUzNWUwYmYyYzUxOWJjM2EwNDEiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjg1MzcyNjM3LCJleHAiOjE3MTY5MDg2Mzd9.oLZ9-C_BxpZfHGFZME63UoVi76OJQgwosZpjEhIiJnI"
        }
    }).then(res => res.json())
}