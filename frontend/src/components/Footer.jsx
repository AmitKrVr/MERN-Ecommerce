import { assets } from "../assets/assets";

const Footer = () => {
    return (
        <footer>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div>
                    <img src={assets.logo} alt="" className="mb-5 w-32" />
                    <p className="w-full md:w-1/2 text-gray-600">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nisi qui, mollitia animi distinctio rem vel reiciendis,
                        ipsum quod quam id, repellat quasi quis quibusdam
                        asperiores eos voluptatibus sunt eius ipsam.
                    </p>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>+1-212-456-7890</li>
                        <li>devamit342@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className="py-5 text-sm text-center">
                    Copyright 2024@ Forever.com - All right reserve
                </p>
            </div>
        </footer>
    );
};
export default Footer;
