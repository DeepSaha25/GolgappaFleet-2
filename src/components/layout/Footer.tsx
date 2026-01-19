import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export function Footer() {
    return (
        <footer className="py-12 bg-foreground text-card">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <img src={logo} alt="GolgappaFleet Logo" className="w-8 h-8 object-contain" />
                            <span className="font-display font-bold text-xl">GolgappaFleet</span>
                        </div>
                        <p className="text-sm text-card/70">
                            India's first hygienic Golgappa delivery platform.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3 text-primary">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-card/70">
                            <li>
                                <Link to="/menu" className="hover:text-card transition-colors">
                                    Menu
                                </Link>
                            </li>
                            <li>
                                <Link to="/orders" className="hover:text-card transition-colors">
                                    Track Order
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-card transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3 text-primary">Support</h4>
                        <ul className="space-y-2 text-sm text-card/70">
                            <li>
                                <Link to="/faq" className="hover:text-card transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-card transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="hover:text-card transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3 text-primary">Contact</h4>
                        <ul className="space-y-2 text-sm text-card/70">
                            <li>hello@golgappafleet.com</li>
                            <li>+91 98765 43210</li>
                            <li>Mumbai, India</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-card/20 mt-8 pt-8 text-center text-sm text-card/50">
                    © 2024 GolgappaFleet. Made with ❤️ in India.
                </div>
            </div>
        </footer>
    );
}
