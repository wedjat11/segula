import ChangeLanguage from "./ChangeLanguage";

export default function MainHeader() {
  return (
    <section className="flex w-full lg:w-11/12 mx-auto pt-5 justify-between">
      <a
        href="https://github.com/jesusalfonso/segula"
        className="bg-primary text-white px-4 py-2 rounded-md hidden lg:flex items-center justify-cener"
      >
        <p>Group Site</p>
      </a>
      <div className="w-1/2 lg:max-w-sm ">
        <a href="/">
          <img src="/src/assets/logoSegula.png" alt="logo" />
        </a>
      </div>
      <div>
        <ChangeLanguage />
      </div>
    </section>
  );
}
