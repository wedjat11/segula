import { ArrowDown } from "lucide-react";

export default function ScrollButton() {
  return (
    <div className="flex cursor-pointer self-center items-center justify-center size-7 md:size-9 lg:size-14 bg-primary text-white rounded-full hover:bg-primary/60 transition-all duration-300">
      <a href="#about">
        <ArrowDown className="w-4 md:w-6 lg:w-10" />
      </a>
    </div>
  );
}
