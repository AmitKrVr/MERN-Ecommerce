import { assets } from "../assets/assets";
import Title from "../components/Title";
import NewLatterBox from "../components/NewLatterBox";

const About = () => {
    return (
        <div>
            <div className="text-2xl text-center pt-8 border-t">
                <Title text1={"About"} text2={"Us"} />
            </div>

            <div className="my-10 flex flex-col md:flex-row gap-16">
                <img
                    src={assets.about_img}
                    alt=""
                    className="w-full md:max-w-[450px]"
                />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Quidem impedit aperiam commodi alias amet
                        excepturi doloremque atque deleniti esse ipsa voluptate
                        vel quam repellendus, beatae quos cupiditate accusantium
                        autem ad.
                    </p>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Consequatur, earum necessitatibus. Est maiores
                        reiciendis aspernatur numquam laudantium dolores, dicta
                        eum animi qui? Maiores, voluptatum dolorem illo
                        accusantium officia blanditiis voluptatibus.
                    </p>

                    <b className="text-gray-800">Our Mission</b>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Cum recusandae sed, distinctio quasi dolorum
                        possimus culpa repudiandae perferendis harum laudantium
                        vero deleniti earum illum explicabo fugit assumenda, ea
                        a adipisci.
                    </p>
                </div>
            </div>

            <div className="text-xl py-4">
                <Title text1={"WHY"} text2={"CHOOSE US"} />
            </div>
            <div className="flex flex-col md:flex-row text-sm mb-20">
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Quality Assurance:</b>
                    <p className="text-gray-600">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Ipsa, adipisci laborum tempore nobis fugit dolorem
                        sunt repellendus accusantium at est autem aliquam hic
                        quis nemo illum voluptate praesentium libero ullam.
                    </p>
                </div>
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Convenience:</b>
                    <p className="text-gray-600">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Ipsa, adipisci laborum tempore nobis fugit dolorem
                        sunt repellendus accusantium at est autem aliquam hic
                        quis nemo illum voluptate praesentium libero ullam.
                    </p>
                </div>
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Exceptional Customer Service:</b>
                    <p className="text-gray-600">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Ipsa, adipisci laborum tempore nobis fugit dolorem
                        sunt repellendus accusantium at est autem aliquam hic
                        quis nemo illum voluptate praesentium libero ullam.
                    </p>
                </div>
            </div>
            <NewLatterBox />
        </div>
    );
};
export default About;
