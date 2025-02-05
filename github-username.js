const setTheme = theme => document.documentElement.className = theme
let isError = false

const searchButton = document.getElementById("search-button")
const searchInput = document.getElementById("searchBar")
const errorMessage = document.getElementById("error-message")
const lightButton = document.getElementById("light-button")
const darkButton = document.getElementById("dark-button")
const profileImageElement = document.getElementById("profile-image")
const usernameElement = document.getElementById("username")
const tagElement = document.getElementById("tag")
const bioElement = document.getElementById("bio")
const joinDateElement = document.getElementById("join-date")
const reposElement = document.getElementById("repos")
const followersElement = document.getElementById("followers")
const followingElement = document.getElementById("following")
const twitterElement = document.getElementById("twitter")
const locationElement = document.getElementById("location")
const blogElement = document.getElementById("blog")
const companyElement = document.getElementById("company")
const searchForm = document.getElementById("search-form")

const fetchUserDetails = async () => {
    const username = searchInput.value || "octocat"

    try {
        const res = await fetch(`https://api.github.com/users/${username}`)
        const data = await res.json()

        if (data.status === '404') {
            isError = true
            errorMessage.style.display = "block"

            return;
        } 

        // Using isError flag to prevent unnecessary DOM manipulations
        if (isError && data.status !== '404') {
            errorMessage.style.display = "none"
            isError = false
        }

        profileImageElement.src = data.avatar_url
        usernameElement.innerText = data.name
        tagElement.textContent = `@${data.login}`
        bioElement.textContent = data.bio || "No bio available."
        joinDateElement.textContent = new Date(data.created_at).toLocaleDateString()
        reposElement.textContent = data.public_repos
        followersElement.textContent = data.followers
        followingElement.textContent = data.following

        twitterElement.textContent = data.twitter_username || "Not available"
        locationElement.textContent = data.location || "Not available"
        blogElement.textContent = data.blog || "Not available"
        companyElement.textContent = data.company || "Not available"

        console.log("data: ", data)
    } catch (err) {
        console.log("error: ", err)
    }
}

fetchUserDetails()

darkButton.addEventListener("click", () => {
    setTheme('dark')
    lightButton.style.display = "flex"
    darkButton.style.display = "none"
})

lightButton.addEventListener("click", () => {
    setTheme('light')
    darkButton.style.display = "flex"
    lightButton.style.display = "none"
})

searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    fetchUserDetails()
})
