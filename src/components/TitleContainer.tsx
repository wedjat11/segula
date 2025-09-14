interface Props {
  className?: string;
  lang?: "es" | "en" | "fr";
  title?: string;
  subtitle?: string;
  normal?: string;
}

export default function TitleContainer({
  className,
  lang = "es",
  title,
  subtitle,
  normal,
}: Props) {
  return (
    <section className="w-full block items-center justify-center bg-primary md:w-11/12 mx-auto">
      <div className="flex flex-col gap-6 py-5 md:flex-row items-center md:justify-evenly">
        <div>
          <h1 className="text-center text-white text-2xl font-bold  pb-4 md:py-8 md:text-3xl lg:text-4xl  border-b-3 w-fit mx-auto ">
            BUSINESS SECTORS
          </h1>
        </div>

        <div className="text-center text-white md:text-end md:text-xl lg:text-2xl">
          <p className="font-semibold">A SINGLE PASSION, MULTIPLE SECTORS</p>
          <p className="font-light">Engineering for evolving industries</p>
        </div>
      </div>
    </section>
  );
}
