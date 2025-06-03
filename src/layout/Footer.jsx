export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white p-8">
            <div className="container mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Bandage</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h4 className="font-bold mb-4">Company Info</h4>
                        <ul className="space-y-2">
                            {['About Us', 'Carrier', 'We are hiring', 'Blog'].map((item) => (
                                <li key={item}><a href="#" className="text-gray-400 hover:text-white">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            {['About Us', 'Carrier', 'We are hiring', 'Blog'].map((item) => (
                                <li key={item}><a href="#" className="text-gray-400 hover:text-white">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Features */}
                    <div>
                        <h4 className="font-bold mb-4">Features</h4>
                        <ul className="space-y-2">
                            {['Business Marketing', 'User Analytic', 'Live Chat', 'Unlimited Support'].map((item) => (
                                <li key={item}><a href="#" className="text-gray-400 hover:text-white">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-bold mb-4">Resources</h4>
                        <ul className="space-y-2">
                            {['IOS & Android', 'Watch a Demo', 'Customers', 'API'].map((item) => (
                                <li key={item}><a href="#" className="text-gray-400 hover:text-white">{item}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Get In Touch */}
                <div className="mt-8 pt-8 border-t border-gray-800">
                    <h4 className="font-bold mb-4">Get In Touch</h4>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="flex-1 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-l focus:outline-none"
                        />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
                            Subscribe
                        </button>
                    </div>
                    <p className="text-gray-400 mt-2">Lore imp sum dolor Amit</p>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                    <p>Made With Love By Russia All Right Reserved</p>
                </div>
            </div>
        </footer>
    );
}