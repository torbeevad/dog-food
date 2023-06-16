

export const isError = (action) => {
    return action.type.endsWith("rejected")
}

export const isLoading = (action) => {
    return action.type.endsWith("pending")
}