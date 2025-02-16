import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState(null);
  const [urls, setUrls] = useState([]);

  // check if url is valid and contains http or https
  const isValidUrl = (url) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  // fetch list of URLs
  const fetchUrls = () => {
    fetch("http://127.0.0.1:3000/list")
      .then((res) => res.json())
      .then((data) => setUrls(data))
      .catch((err) => console.error("Error fetching URLs:", err));
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isValidUrl(originalUrl)) {
      setError("Invalid URL. Please enter a valid URL.");
      console.log(error);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:3000/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ original: originalUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.shortened);
        setError(null);
        setOriginalUrl("");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to shorten URL");
    }
    fetchUrls();
  };

  return (
    <div className="flex h-screen w-2xl">
      <div className="flex flex-col gap-2">
        <div className="">
          <h2 className="text-center text-2xl py-3">URL Shortener</h2>
          <form
            onSubmit={handleSubmit}
            className="flex  border-1 rounded-sm  border-black"
          >
            <input
              className="flex-1 px-4"
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter URL"
              required
            />
            <button type="submit" className="bg-black px-4 py-2">
              Shorten
            </button>
          </form>
          {shortUrl && (
            <p>
              Short URL: <a href={shortUrl}>{shortUrl}</a>
            </p>
          )}
          {console.log(error)}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

        <ul className="flex flex-col gap-5 px-5">
          {urls.map((link) => (
            <li key={link.id} className="flex flex-col border-b-white">
              <div>{link.original}</div>
              <div className="flex items-center gap-5">
                <div className="">
                  <a
                    href={link.shortened}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.shortened}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(link.shortened)}
                >
                  <img src="/assets/copy.png" alt="copy icon" className="h-5"/>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
