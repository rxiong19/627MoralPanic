import { Link } from "@remix-run/react";

export default function ResourcePage() {
    return (
    <div className="flex h-full min-h-screen flex-col bg-lightGreen">
        <header className="flex items-center justify-between bg-customGreen p-4 text-white">Resources<Link to="../"
                  className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8">
                    Home</Link></header>
        <main className="flex h-full justify-center items-center space-y-4 flex-col text-2xl">
            <div>
            <a href="https://en.wikipedia.org/wiki/Moral_panic">Moral Panics</a>
            </div><br/>
            <div>
            <a href="https://en.wikipedia.org/wiki/Moral_panic">Moral Panics 2: Electric Boogalo</a>
            </div>
        </main>
        </div>
    );
}