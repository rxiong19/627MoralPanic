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
    <div className="flex h-full min-h-screen flex-col bg-gray-200 relative overflow-hidden">
      <header className="flex items-center justify-between bg-gray-500 p-4 text-white z-10">
        <h1 className="text-2xl font-bold">Resources</h1>
        <Link
          to="../"
          className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
        >
          Home
        </Link>
      </header>
      <h1 className="text-2xl font-bold">Online Resources</h1>
      <main className="flex flex-col items-center justify-center space-y-4 text-lg z-10">
        <div className="h-full overflow-auto">
          <table className="min-w-full bg-white border-collapse shadow-md opacity-70 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-customRed text-white">
                <th className="px-4 py-2 font-semibold">Type</th>
                <th className="px-4 py-2 font-semibold">Info</th>
                <th className="px-4 py-2 font-semibold">Link</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="border-b border-gray-300 hover:bg-gray-100 transition-colors duration-200">
                <td className="px-4 py-2">General</td>
                <td className="px-4 py-2">
                  - Michael Hobbes breaks down, line by line, the NYT editorial
                  “America Has a Free Speech Problem,” arguing it is a
                  manifestation of the “cancel culture” moral panic. Available
                  in video or blog post format.
                </td>
                <td className="px-4 py-2">
                  <button
                    className="btn-link relative px-8 py-4 rounded-md border-2 transition-colors duration-300 hover:text-blue-800"
                    onClick={() =>
                      window.open(
                        "https://michaelhobbes.substack.com/p/panic-on-the-editorial-page",
                        "_blank",
                      )
                    }
                  >
                    <span className="animate-bounceIn text-blue-700 hover:underline">
                      Panic! On the Editorial Page
                    </span>
                  </button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="border-b border-gray-300 hover:bg-gray-100 transition-colors duration-200">
                <td className="px-4 py-2">General</td>
                <td className="px-4 py-2">
                  - Michael Hobbes breaks down, line by line, the NYT editorial
                  “America Has a Free Speech Problem,” arguing it is a
                  manifestation of the “cancel culture” moral panic. Available
                  in video or blog post format.
                </td>
                <td className="px-4 py-2">
                  <button
                    className="btn-link relative px-8 py-4 rounded-md border-2 transition-colors duration-300 hover:text-blue-800"
                    onClick={() =>
                      window.open(
                        "https://michaelhobbes.substack.com/p/students-self-censorship-lol",
                        "_blank",
                      )
                    }
                  >
                    <span className="animate-bounceIn text-blue-700 hover:underline">
                      Lies, Damn Lies, and Self-Censorship Statistics
                    </span>
                  </button>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="border-b border-gray-300 hover:bg-gray-100 transition-colors duration-200">
                <td className="px-4 py-2">General</td>
                <td className="px-4 py-2">
                  - Michael Hobbes addresses a survey that supports “cancel
                  culture” and “free speech” moral crises (and the broader
                  “wokeness” moral panic) with claims 62% of (sampled) college
                  students agreed that the climate on their campus prevented
                  students from saying this they believe.
                </td>
                <td className="px-4 py-2">
                  <button
                    className="btn-link relative px-8 py-4 rounded-md border-2 transition-colors duration-300 hover:text-blue-800"
                    onClick={() =>
                      window.open(
                        "https://daily.jstor.org/moral-panics-a-syllabus/",
                        "_blank",
                      )
                    }
                  >
                    <span className="animate-bounceIn text-blue-700 hover:underline">
                      Moral Panics: A Syllabus
                    </span>
                  </button>
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="border-b border-gray-300 hover:bg-gray-100 transition-colors duration-200">
                <td className="px-4 py-2">General</td>
                <td className="px-4 py-2">
                  - Scott A. Bonn in Psychology Today considers moral panics
                  from a psychological perspective, discussing it as public
                  framing of anxiety.
                </td>
                <td className="px-4 py-2">
                  <button
                    className="btn-link relative px-8 py-4 rounded-md border-2 transition-colors duration-300 hover:text-blue-800"
                    onClick={() =>
                      window.open(
                        "https://www.psychologytoday.com/us/blog/wicked-deeds/201507/moral-panic-who-benefits-public-fear",
                        "_blank",
                      )
                    }
                  >
                    <span className="animate-bounceIn text-blue-700 hover:underline">
                      Moral Panics: Who Benefits from Public Fear?
                    </span>
                  </button>
                </td>
              </tr>
              {/* Row 5 */}
              <tr className="border-b border-gray-300 hover:bg-gray-100 transition-colors duration-200">
                <td className="px-4 py-2">Historical</td>
                <td className="px-4 py-2">
                  - Jonathon Jarry discusses the historical moral panic that
                  bicycles had harmful effects on health, especially for women.
                </td>
                <td className="px-4 py-2">
                  <button
                    className="btn-link relative px-8 py-4 rounded-md border-2 transition-colors duration-300 hover:text-blue-800"
                    onClick={() =>
                      window.open(
                        "https://www.mcgill.ca/oss/article/history-did-you-know/moral-and-medical-panic-over-bicycles",
                        "_blank",
                      )
                    }
                  >
                    <span className="animate-bounceIn text-blue-700 hover:underline">
                      The Moral and Medical Panic Over Bicycles
                    </span>
                  </button>
                </td>
              </tr>
              {/* Row 6 */}
              <tr className="border-b border-gray-300 hover:bg-gray-100 transition-colors duration-200">
                <td className="px-4 py-2">Topical</td>
                <td className="px-4 py-2">
                  - Amelia Tait in The NewStatesman explores the moral panic
                  surrounding social media use by teens following the 2017
                  “forbidden snack” TikTok “challenge.”
                </td>
                <td className="px-4 py-2">
                  <button
                    className="btn-link relative px-8 py-4 rounded-md border-2 transition-colors duration-300 hover:text-blue-800"
                    onClick={() =>
                      window.open(
                        "https://www.newstatesman.com/science-tech/2018/01/only-86-teens-ate-tide-pods-so-why-did-world-erupt-moral-panic",
                        "_blank",
                      )
                    }
                  >
                    <span className="animate-bounceIn text-blue-700 hover:underline">
                      Only 86 teens ate Tide Pods, so why did the world erupt in
                      moral panic?
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="my-8"></div>

          <table className="min-w-full bg-white border-collapse shadow-md opacity-90 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-customGreen text-white">
                <th className="px-4 py-2 font-semibold">Type</th>
                <th className="px-4 py-2 font-semibold">Tags</th>
                <th className="px-4 py-2 font-semibold">Link</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300 hover:bg-gray-100 transition-colors duration-200">
                <td className="px-4 py-2">General</td>
                <td className="px-4 py-2">Academic, Non-fiction</td>
                <td className="px-4 py-2">
                  Folk Devils and Moral Panics (Stanley Cohen 1972, 2011)
                </td>
              </tr>
              <tr className="border-b border-gray-300 hover:bg-gray-100 transition-colors duration-200">
                <td className="px-4 py-2">General</td>
                <td className="px-4 py-2">Academic, Non-fiction</td>
                <td className="px-4 py-2">
                  Revisiting Moral Panics (Ed. Vivienne E. Cree, Gary Clapton &
                  Mark Smith 2015)
                </td>
              </tr>
              <tr className="border-b border-gray-300 hover:bg-gray-100 transition-colors duration-200">
                <td className="px-4 py-2">Topical</td>
                <td className="px-4 py-2">Non-fiction</td>
                <td className="px-4 py-2">
                  In Defense of Witches: The Legacy of Witch Hunts and Why Women
                  are Still on Trial (Mona Chollet 2022)
                </td>
              </tr>
              <tr className="border-b border-gray-300 hover:bg-gray-100 transition-colors duration-200">
                <td className="px-4 py-2">Topical</td>
                <td className="px-4 py-2">Non-fiction</td>
                <td className="px-4 py-2">
                  Demagogue: The Life and Long Shadow of Senator Joe McCarthy
                  (Larry Tye 2020)
                </td>
              </tr>
            </tbody>
          </table>
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
