import App from "./App"

const Memory = (() => {
    const save = () => {
        localStorage.setItem("appState", JSON.stringify(App.stringify()))
    }
    const load = () => {
        return localStorage.getItem("appState")
    }

    return { save, load }
})()

export default Memory