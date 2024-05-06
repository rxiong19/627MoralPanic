import { Link } from "@remix-run/react";
import { useEffect, useRef } from "react";

export default function ResourcePage() {
  const catRef = useRef(null);

  useEffect(() => {
    const catElement = catRef.current;

    const moveAnimation = () => {
      const pageWidth = window.innerWidth;
      const pageHeight = window.innerHeight;
      const maxX = pageWidth - catElement.offsetWidth;
      const maxY = pageHeight - catElement.offsetHeight;
      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;

      catElement.style.left = `${newX}px`;
      catElement.style.top = `${newY}px`;

      requestAnimationFrame(moveAnimation);
    };

    moveAnimation();
  }, []);

  return (
    <div className="flex h-full min-h-screen flex-col bg-lightGreen relative overflow-hidden">
      <header className="flex items-center justify-between bg-customGreen p-4 text-white z-10">
        <h1 className="text-2xl font-bold">Resources</h1>
        <Link
          to="../"
          className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
        >
          Home
        </Link>
      </header>
      <main className="flex h-full justify-center items-center space-y-4 flex-col text-2xl z-10">
        <div>
          <button
            className="btn-link relative px-8 py-4 rounded-md border-2 transition-colors duration-300 hover:text-blue-800"
            style={{
              borderImage:
                "linear-gradient(to right, #3b82f6, #9333ea, #ec4899) 1",
            }}
            onClick={() =>
              window.open("https://michaelhobbes.substack.com/p/moral-panic-journalism", "_blank")
            }
          >
            <span className="animate-bounceIn text-blue-700 hover:underline">
            Moral Panic Journalism
            </span>
          </button>
        </div>
        <div>
          <button
            className="btn-link relative px-8 py-4 rounded-md border-2 transition-colors duration-300 hover:text-blue-800"
            style={{
              borderImage:
                "linear-gradient(to right, #3b82f6, #9333ea, #ec4899) 1",
            }}
            onClick={() =>
              window.open("https://michaelhobbes.substack.com/p/panic-on-the-editorial-page", "_blank")
            }
            
          >
            <span className="animate-bounceIn text-blue-700 hover:underline">
             Panic! On the Editorial Page 
            </span>
          </button>
        </div>
        <div>
          <button
            className="btn-link relative px-8 py-4 rounded-md border-2 transition-colors duration-300 hover:text-blue-800"
            style={{
              borderImage:
                "linear-gradient(to right, #3b82f6, #9333ea, #ec4899) 1",
            }}
            onClick={() =>
              window.open("https://michaelhobbes.substack.com/p/students-self-censorship-lol", "_blank")
            }
            
          >
            <span className="animate-bounceIn text-blue-700 hover:underline">
            Lies, Damn Lies, and ‘Self-Censorship’ Statistics
            </span>
          </button>
        </div>
        <div>
          <button
            className="btn-link relative px-8 py-4 rounded-md border-2 transition-colors duration-300 hover:text-blue-800"
            style={{
              borderImage:
                "linear-gradient(to right, #3b82f6, #9333ea, #ec4899) 1",
            }}
            onClick={() =>
              window.open("https://daily.jstor.org/moral-panics-a-syllabus/", "_blank")
            }
            
          >
            <span className="animate-bounceIn text-blue-700 hover:underline">
            Moral Panics: A Syllabus
            </span>
          </button>
        </div>
        <div>
          <button
            className="btn-link relative px-8 py-4 rounded-md border-2 transition-colors duration-300 hover:text-blue-800"
            style={{
              borderImage:
                "linear-gradient(to right, #3b82f6, #9333ea, #ec4899) 1",
            }}
            onClick={() =>
              window.open("https://www.psychologytoday.com/us/blog/wicked-deeds/201507/moral-panic-who-benefits-public-fear", "_blank")
            }
            
          >
            <span className="animate-bounceIn text-blue-700 hover:underline">
            Moral Panics: Who Benefits from Public Fear?
            </span>
          </button>
        </div>
        <div>
          <button
            className="btn-link relative px-8 py-4 rounded-md border-2 transition-colors duration-300 hover:text-blue-800"
            style={{
              borderImage:
                "linear-gradient(to right, #3b82f6, #9333ea, #ec4899) 1",
            }}
            onClick={() =>
              window.open("https://www.mcgill.ca/oss/article/history-did-you-know/moral-and-medical-panic-over-bicycles", "_blank")
            }
            
          >
            <span className="animate-bounceIn text-blue-700 hover:underline">
            The Moral and Medical Panic Over Bicycles 
            </span>
          </button>
        </div>
        <div>
          <button
            className="btn-link relative px-8 py-4 rounded-md border-2 transition-colors duration-300 hover:text-blue-800"
            style={{
              borderImage:
                "linear-gradient(to right, #3b82f6, #9333ea, #ec4899) 1",
            }}
            onClick={() =>
              window.open("https://www.newstatesman.com/science-tech/2018/01/only-86-teens-ate-tide-pods-so-why-did-world-erupt-moral-panic", "_blank")
            }
            
          >
            <span className="animate-bounceIn text-blue-700 hover:underline">
            Only 86 teens ate Tide Pods, so why did the world erupt in moral panic? 
            </span>
          </button>
        </div>
      </main>
      <div
        ref={catRef}
        className="absolute z-0 w-48 h-48 transition-all duration-500"
      >
        <img
          src="https://media1.tenor.com/m/5BYK-WS0__gAAAAd/cool-fun.gif"
          alt="Dancing Cat"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
