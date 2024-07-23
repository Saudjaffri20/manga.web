// components/Navbar.js
export default function Navbar() {
    return (
        <nav>
            <h1>My App</h1>
            <style jsx>{`
          nav {
            display: flex;
            justify-content: space-between;
            padding: 1rem;
            background-color: #0070f3;
            color: white;
          }
        `}</style>
        </nav>
    );
}
