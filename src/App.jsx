import { useState } from "react"

const API_URL = "https://api.github.com"

async function fetchResults(query) {
  try {
    const response = await fetch(`${API_URL}/search/users?q=${query}`)
    const result = await response.json()

    return result.items || []
  } catch (e) {
    throw new Error(e)
  }
}

const App = () => {
  const [results, setResults] = useState([])
  const [query, setQuery] = useState("")

  function onChange(e) {
    setQuery(e.target.value)
  }

  async function onSubmit(e) {
    e.preventDefault()

    const results = await fetchResults(query)
    setResults(results)
  }

  return (
    <div className=" m-0 p-[10px]">
      <main className="h-auto mx-0 my-auto w-full text-center mt-12">
        <h2 className="text-5xl font-medium">GitHub User Search</h2>
        <Form onChange={onChange} onSubmit={onSubmit} query={query} />

        <h3 className="mt-20 text-2xl underline underline-offset-4">Results</h3>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-3 mt-10 ">
            {results.map(user => (
              <User
                key={user.id}
                avatar={user.avatar_url}
                url={user.html_url}
                username={user.login}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

const Form = ({ onChange, onSubmit, query }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-10 flex justify-center items-center gap-3"
    >
      <input
        type="text"
        placeholder="Enter a GitHub username"
        autoFocus
        value={query}
        onChange={onChange}
        className=" rounded-3xl h-12 w-[350px] pl-4 text-black border-2 border-black"
      />
      <button
        type="submit"
        className="h-12 w-[100px] rounded-3xl border-2 bg-green-400 text-slate-900 border-slate-900 text-md"
      >
        Search
      </button>
    </form>
  )
}
const User = ({ avatar, url, username }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 m-10">
      <img
        src={avatar}
        alt="profile-img"
        width={100}
        height={100}
        className="rounded-full border-[4px] border-green-400"
      />
      <a
        href={url}
        target="_blank"
        className="no-underline hover:underline hover:underline-offset-4 hover:text-red-600"
      >
        {username}
      </a>
    </div>
  )
}

export default App
