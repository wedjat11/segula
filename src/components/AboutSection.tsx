import WhiteBullet from "./WhiteBullet";
import motorImage from "../assets/motor.webp";

export default function AboutSection() {
  return (
    <section className="w-full flex flex-col py-10 gap-5 md:w-10/12 mx-auto ">
      <WhiteBullet title="ABOUT US" alt="about us" />
      <div className="w-full flex flex-col md:flex-row gap-14">
        <img
          src={motorImage.src}
          alt="motor"
          className="w-full md:w-1/2 md:h-[370px]"
        />
        <section className="flex flex-col gap-5 w-full md:w-1/2 " id="about">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-4xl text-white uppercase">
              <span className="font-bold ">WE ARE THE HEART</span> <br /> OF
              Innovations
            </h2>
          </div>
          <div className="text-white text-xs md:text-base lg:text-xl flex flex-col gap-6">
            <p>
              We provide innovative solutions by precisely blending excellence
              in design with a commitment to exceptional customer service.
            </p>
            <p>
              What is particularly striking across all the projects considered
              for our success is the way in which research and innovation is
              driven by collaboration. Our team brings together a broad set of
              skills and experiences: they link foundational innovation with
              engineering practice.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}
