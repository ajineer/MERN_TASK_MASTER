export const loginRoute = async (email, password) => {
    const response = await fetch('http://localhost:5555/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    return response
}

export const signupRoute = async (email, password) => {
    const response = await fetch('http://localhost:5555/api/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    return response
}