import { PopoverArrow } from "@radix-ui/react-popover";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface Props {
  className?: string;
  ismobile?: boolean;
}

const links = [
  { name: "About Us", url: "/about" },
  { name: "Engineering services", url: "/engineering" },
  { name: "Analysis and simulation", url: "/analysis" },
  { name: "News", url: "/news" },
  { name: "Innovation", url: "/innovation" },
];

function MobileMenu() {
  return (
    <div className="w-full bg-primary text-white rounded-full ">
      <div className="container mx-auto px-4 py-3 text-white">
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-white px-6 py-3 rounded-md flex items-center w-full font-semibold justify-between">
              <span>About Us</span>
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-screen bg-primary text-white  mx-auto mt-2 p-0 border-0 px-4">
            <div className="rounded-lg  overflow-hidden">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="block px-6 py-4  hover:bg-primary hover:text-white transition-colors "
                >
                  {link.name.toUpperCase()}
                </a>
              ))}
            </div>
            <PopoverArrow className="fill-white" />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

function DesktopMenu() {
  return (
    <div className="w-full bg-primary text-white">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-center">
          <div className="flex gap-8 flex-wrap justify-center">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="px-6 py-3 rounded-md hover:hover:text-primary transition-all duration-300 font-medium text-center whitespace-nowrap"
              >
                {link.name.toUpperCase()}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default function MainMenu({ className = "", ismobile }: Props) {
  return (
    <div className={className}>
      {/* Mobile Menu - visible only on mobile */}
      <div className="block md:hidden px-4">
        <MobileMenu />
      </div>

      {/* Desktop Menu - visible only on desktop */}
      <div className="hidden md:block">
        <DesktopMenu />
      </div>
    </div>
  );
}
